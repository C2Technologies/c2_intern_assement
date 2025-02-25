from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session 
from typing import List
from schemas.task import Task, TaskCreate
from database.database import get_db
from database.models.task import Task as DBTask


router = APIRouter()

@router.get("/tasks", response_model=List[Task])
async def get_all_tasks(db: Session = Depends(get_db)):
    tasks = db.query(DBTask).all()
    return tasks

@router.get("/tasks/{task_id}", response_model=Task)
async def get_task_by_id(task_id: int, db: Session = Depends(get_db)):
    task = db.query(DBTask).filter(DBTask.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.post("/tasks", response_model=Task)
async def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    new_task = DBTask(**task.model_dump())
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task