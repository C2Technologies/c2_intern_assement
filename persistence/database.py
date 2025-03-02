from sqlmodel import Session, SQLModel, create_engine

URL_DATABASE = "postgresql://postgres:retro@localhost:8787/todo"

engine = create_engine(URL_DATABASE)


def create_table():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session
