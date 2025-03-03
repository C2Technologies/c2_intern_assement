from pydantic import BaseModel

class TaskBase(BaseModel):
    title: str
    description: str | None = ""
    completed: bool
    date: str
    dateString: str

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: int