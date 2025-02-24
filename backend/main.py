from typing import Optional, List
from fastapi import FastAPI, Path
from data import tasks
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class Task(BaseModel):
    title: str
    description: str
    completed: Optional[bool] = None


@app.get("/tasks", response_model=List[Task])
async def get_all_tasks():
    return tasks

@app.get("/tasks/{task_id}", response_model=Task)
async def get_task_by_id(task_id: int):
    return tasks[task_id]

@app.post("/tasks", response_model=Task)
async def get_task_by_id(task: Task):
    tasks.append(task)
    return tasks

