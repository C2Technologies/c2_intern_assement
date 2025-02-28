from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from config import settings

engine = create_engine(str(settings.SQLALCHEMY_DATABASE_URL.unicode_string()), connect_args={}, future=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine, future=True)
Base = declarative_base()

def get_db():
    """
    This function creates a new database session using SessionLocal from SQLAlchemy
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()