from fastapi import HTTPException
from sqlmodel import Session

from model.todo import Task


def add_task(task: Task, session: Session):
    session.add(task)
    session.commit()
    session.refresh(task)
    return True


def delete_take_by_id(task_id, session: Session):
    task = session.get(Task, task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    session.delete(task)
    session.commit()
    return True


def update_take_by_id(task_id: int, session: Session, task: Task):
    _task = session.get(Task, task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    _task = task
    return add_task(task, session)


def get_take_by_id(task_id: int, session: Session):
    task = session.get(Task, task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


def get_all_takes(session: Session):
    return session.query(Task).all()
