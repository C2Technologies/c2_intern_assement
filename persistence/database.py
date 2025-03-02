from sqlmodel import Session, SQLModel, create_engine  # importing os module for environment variables
import os
# importing necessary functions from dotenv library
from dotenv import load_dotenv, dotenv_values

# loading variables from .env file
load_dotenv()

URL_DATABASE = os.getenv("POSTGRESQL")

engine = create_engine(URL_DATABASE)


def create_table():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session
