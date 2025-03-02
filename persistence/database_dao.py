from fastapi import HTTPException
from sqlmodel import Session, select

from model.todo import Task

"""
methods for manipulating database data

"""

"""
:param task 
takes a task json to add to the database
"""


def add_task(task: Task, session: Session):
    session.add(task)
    session.commit()
    session.refresh(task)


"""
query database by task id and removes it 

"""


def delete_take_by_id(task_id, session: Session):
    task = session.get(Task, task_id)
    # check if task exist for error handling
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    session.delete(task)
    session.commit()


"""
query database by task id and update it 

"""


def update_take_by_id(task_id: int, session: Session, task: Task):
    _task = session.get(Task, task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    _task.completed = task.completed
    _task.title = task.title
    _task.description = task.description
    # use the add function to re add the modified version of the last
    return add_task(_task, session)


"""
search a task by task id and return task

"""


def get_take_by_id(task_id: int, session: Session):
    task = session.get(Task, task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


"""
:return all tasks
"""


def get_all_takes(session: Session):
    return session.query(Task).all()
