from typing import Optional, Union
from data import tasks 
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Task(BaseModel):
    title: str
    description: str
    is_completed: Optional[bool] = None


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/api/tasks", response_model=list[Task])
async def get_all_tasks():
    return tasks

