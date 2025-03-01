from pydantic import BaseModel
from sqlmodel import SQLModel, Field


# task model for our database
class Task(SQLModel, table=True):
    id: int = Field(primary_key=True)
    title: str
    description: str
    completed: bool = Field(default=False)


# a copy of task model to avoid hardcoded ID
class ClientTask(BaseModel):
    title: str
    description: str
    completed: bool = False
