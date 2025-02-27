from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TaskBase(BaseModel):
    """
    Base schema for task-related data
    """
    title: str
    description: str
    completed: Optional[bool] = False
    
class TaskCreate(TaskBase):
    """
    Schema for creating a new task
    """
    pass

class TaskUpdate(TaskBase):
    """
    Schema for updating an existing task
    """
    title: Optional[str] = None
    description: Optional[str] = None


class TaskCompletionUpdate(BaseModel):
    """
    Schema for updating only a task's completion status
    """
    completed: bool

class Task(TaskBase):
    """
    Schema for representing a task with db-attributes
    """
    id: int
    created_at: datetime
    updated_at: Optional[datetime]
    
    class Config:
        from_attributes = True