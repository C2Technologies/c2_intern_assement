from pydantic.v1 import BaseModel


class Todo(BaseModel):
    id: int
    title: str
    description: str
    # might change to enum later
    completed: bool
