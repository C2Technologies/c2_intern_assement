from fastapi import APIRouter

root_path = "/task"
from model.todo import Todo

router = APIRouter()


@router.get(root_path)
def get_tasks():
    return {"message": "type shii"}


@router.post(f'{root_path}/{task_id}')
def add_task(task: Todo):
    return {"message": "type shii"}


@router.put(f'{root_path}/{task_id}')
def update_task(task: Todo):
    return {"message": "type shii"}


@router.delete(f'{root_path}/{task_id}')
def delete_task(task_id):
    return {"message": "type shii"}
