from fastapi import APIRouter, Body

from persistence import database_crud
from response import error, success
from fastapi.responses import RedirectResponse

root_path = "/task"
from model.todo import Todo

router = APIRouter()


@router.get("/")
def main():
    return RedirectResponse(url="/tasks", status_code=302)


@router.get("/tasks")
def get_tasks():
    tasks = database_crud.get_all_takes()
    return success.jsons_get_response(tasks)


@router.get("/task/{task_id}")
def get_tasks(task_id: int):
    tasks = database_crud.get_take_by_id(task_id)
    if tasks:
        return success.jsons_get_response(tasks)
    return {"message": "type shii"}


@router.post('/task/')
def add_task(task: Todo = Body(...)):
    print(task)
    is_success = database_crud.add_task(task)
    if is_success:
        return success.json_added_response(task)
    return {"message": "type shii"}


@router.put('/task/{task_id}')
def update_task(task_id, task: Todo = Body(...)):
    is_success = database_crud.update_take_by_id(task_id, task)
    if is_success:
        return success.json_update_response(task)
    return {"message": "type shii"}


@router.delete('/task/{task_id}')
def delete_task(task_id):
    task_exists = database_crud.get_take_by_id(task_id)
    if task_exists:
        is_success = database_crud.delete_take_by_id(task_id)
        if is_success:
            return success.json_remove_response(task_exists)
    return {"message": "type shii"}
