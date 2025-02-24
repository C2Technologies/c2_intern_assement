from pydantic import BaseModel
from typing import Optional

class Task(BaseModel):
    title: str
    description: str
    completed: Optional[bool] = None
