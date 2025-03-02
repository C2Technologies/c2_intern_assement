from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.responses import RedirectResponse
from sqlmodel import Session

from model.todo import Task
from persistence import database_dao
from persistence.database import get_session
from response import success, error

router = APIRouter()


# Root Redirect
@router.get("/")
def main():
    return RedirectResponse(url="/tasks", status_code=302)


# Get all tasks
@router.get("/tasks")
def get_tasks(session: Session = Depends(get_session)):
    try:
        tasks = database_dao.get_all_takes(session)
        return success.jsons_get_response(tasks)
    except HTTPException as e:
        return error.error_response("unexpected error")


# Get a task by ID
@router.get("/task/{task_id}")
def get_task(task_id: int, session: Session = Depends(get_session)):
    try:
        task = database_dao.get_take_by_id(task_id, session)
        return success.jsons_get_response(task)
    except HTTPException as e:
        return error.error_response("unexpected error")


# Add a new task
@router.post("/task/")
def add_task(task: Task = Body(...), session: Session = Depends(get_session)):
    try:
        task_created = database_dao.add_task(task, session)
        return success.json_added_response(task_created)
    except HTTPException as e:
        return error.error_response("unexpected error")


# Update an existing task
@router.put("/task/{task_id}")
def update_task(task_id: int, task: Task = Body(...), session: Session = Depends(get_session)):
    try:
        updated_task = database_dao.update_take_by_id(task_id, session, task)
        return success.json_update_response(updated_task)
    except HTTPException as e:
        return error.error_response("unexpected error")


# Delete a task
@router.delete("/task/{task_id}")
def delete_task(task_id: int, session: Session = Depends(get_session)):
    try:
        task = database_dao.get_take_by_id(task_id, session)
        database_dao.delete_take_by_id(task_id, session)
        return success.json_remove_response(task)
    except HTTPException as e:
        return error.error_response("unexpected error")
