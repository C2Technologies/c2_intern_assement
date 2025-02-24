import fastapi
from typing import List
from data import tasks
from schema import Task


router = fastapi.APIRouter()

@router.get("/tasks", response_model=List[Task])
async def get_all_tasks():
    return tasks

@router.get("/tasks/{task_id}", response_model=Task)
async def get_task_by_id(task_id: int):
    return tasks[task_id]

@router.post("/tasks", response_model=Task)
async def create_task(task: Task):
    tasks.append(task)
    return tasks

