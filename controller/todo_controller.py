from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.responses import RedirectResponse
from sqlmodel import Session

from model.todo import Task
from persistence import database_crud
from persistence.database import get_session
from response import success

router = APIRouter()


# Root Redirect
@router.get("/")
def main():
    return RedirectResponse(url="/tasks", status_code=302)


# Get all tasks
@router.get("/tasks")
def get_tasks(session: Session = Depends(get_session)):
    tasks = database_crud.get_all_takes(session)
    return success.jsons_get_response(tasks)


# Get a task by ID
@router.get("/task/{task_id}")
def get_task(task_id: int, session: Session = Depends(get_session)):
    task = database_crud.get_take_by_id(task_id, session)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return success.jsons_get_response(task)


# Add a new task
@router.post("/task/")
def add_task(task: Task = Body(...), session: Session = Depends(get_session)):
    task_created = database_crud.add_task(task, session)
    return success.json_added_response(task_created)


# Update an existing task
@router.put("/task/{task_id}")
def update_task(task_id: int, task: Task = Body(...), session: Session = Depends(get_session)):
    updated_task = database_crud.update_take_by_id(task_id, session, task)
    return success.json_update_response(updated_task)


# Delete a task
@router.delete("/task/{task_id}")
def delete_task(task_id: int, session: Session = Depends(get_session)):
    task = database_crud.get_take_by_id(task_id, session)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    database_crud.delete_take_by_id(task_id, session)
    return success.json_remove_response(task)
