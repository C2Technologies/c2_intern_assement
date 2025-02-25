from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session 
from typing import List
from schemas.task import Task, TaskCreate, TaskUpdate
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

@router.put("/tasks/{task_id}", response_model=Task)
async def update_task(task_id: int, task: TaskUpdate, db: Session = Depends(get_db)):
    task_to_update = db.query(DBTask).filter(DBTask.id == task_id).first()
    if task_to_update is None:
        raise HTTPException(status_code=404, detail="Task not found")
    
    update_task = task.model_dump(exclude_unset=True)
    
    for key, value in update_task.items():
        setattr(task_to_update, key, value)
        
    db.commit()
    db.refresh(task_to_update)
    return task_to_update