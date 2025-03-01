import os
from sqlalchemy import create_engine, event, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import OperationalError, DisconnectionError
import time
from config import settings

# Configure the engine with connection pooling parameters
engine = create_engine(
    str(settings.SQLALCHEMY_DATABASE_URL.unicode_string()),
    connect_args={
        "sslmode": "require",  
        "connect_timeout": 10,  
    },
    pool_pre_ping=True,  
    pool_recycle=300,  
    pool_size=5,
    max_overflow=10,  
    future=True
)

@event.listens_for(engine, "connect")
def connect(dbapi_connection, connection_record):
    """
    Event listener that fires whenever a new connection is made
    Stores the process ID with the connection to detect process changes

    Args:
        dbapi_connection: The raw DBAPI connection
        connection_record: Connection record containing connection metadata
    """
    connection_record.info['pid'] = os.getpid()

@event.listens_for(engine, "checkout")
def checkout(dbapi_connection, connection_record, connection_proxy):
    """
    Event listener that fires whenever a connection is checkout out from the pool
    Ensures connections aren't shred between different processes,
    
    Args:
        dbapi_connection: The raw DBAPI connection
        connection_record: Connection record containing connection metadata
        connection_proxy: Proxy object that provides access to the DBAPI connection

    Raises:
        DisconnectionError: _description_
    """
    pid = os.getpid()
    if connection_record.info['pid'] != pid:
        connection_record.connection = connection_proxy.connection = None
        raise DisconnectionError(
            "Connection record belongs to pid %s, "
            "attempting to check out in pid %s" %
            (connection_record.info['pid'], pid)
        )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine, future=True)
Base = declarative_base()

def get_db():
    """
    Creates and manages a database session with automatic retry logic
    
    This function is designed as a FastAPI dependency that yields a SQLAlchemy
    session. It implements retry logic to handle transient connection issues that 
    commonly occur with serverless databases. The session is automatically closed
    when the request is complete.
    
    The function will:
    1. Attempt to create a new database session
    2. Verify the connection is working with a simple query
    3. Retry up to 3 times with a 1-second delay between attempts
    4. Close the session regardless of success or failure
    
    Yields:
        SQLAlchemy Session: A SQLAlchemy session for database operations
        
    Raises:
        OperationalError: If database connection fails after all retry attempts
        ArgumentError: If there's an issue with query syntax or execution
    """
    max_retries = 3
    retry_delay = 1 
    
    retries = 0
    last_error = None
    
    while retries < max_retries:
        try:
            db = SessionLocal()
            db.execute(text("SELECT 1"))
            yield db
            break
        except OperationalError as e:
            retries += 1
            last_error = e
            time.sleep(retry_delay)
            if retries >= max_retries:
                raise last_error
        finally:
            if 'db' in locals():
                db.close()