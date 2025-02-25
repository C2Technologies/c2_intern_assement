from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session 
from typing import List
from schemas.task_schema import Task, TaskCreate, TaskUpdate
from database.database import get_db
from database.models.task_model import Task as DBTask

router = APIRouter()

def get_task_or_404(task_id: int, db: Session) -> DBTask:
    task = db.query(DBTask).filter(DBTask.id == task_id).first()
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return task 

@router.get("/tasks", response_model=List[Task])
async def get_all_tasks(db: Session = Depends(get_db)):
    tasks = db.query(DBTask).all()
    return tasks

@router.get("/tasks/{task_id}", response_model=Task)
async def get_task_by_id(task_id: int, db: Session = Depends(get_db)):
    return get_task_or_404(task_id, db)

@router.post("/tasks", response_model=Task, status_code=status.HTTP_201_CREATED)
async def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    try:
        new_task = DBTask(**task.model_dump())
        db.add(new_task)
        db.commit()
        db.refresh(new_task)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Error creating task")
    return new_task

@router.put("/tasks/{task_id}", response_model=Task)
async def update_task(task_id: int, task: TaskUpdate, db: Session = Depends(get_db)):
    task_to_update = get_task_or_404(task_id, db)
    update_task = task.model_dump(exclude_unset=True)
    
    try:    
        for key, value in update_task.items():
            setattr(task_to_update, key, value)
            
        db.commit()
        db.refresh(task_to_update)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Error updating task")
    return task_to_update

@router.delete("/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(task_id: int, db: Session = Depends(get_db)):
    task_to_delete = get_task_or_404(task_id, db)
    try: 
        db.delete(task_to_delete)
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Error deleting task")
        
    return None