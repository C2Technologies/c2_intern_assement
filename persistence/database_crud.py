from persistence import database
from model.todo import Todo


def add_task(task):
    database.dummy_data.append(task)
    return True


def remove_take_by_id(task_id):
    for task in database.dummy_data:
        if task['id'] == task_id:
            database.dummy_data.remove(task)
            return True
    return False


def update_take_by_id(task_id, task_: Todo):
    for task in database.dummy_data:
        if task['id'] == task_id:
            task.task_ = task_
            return True
    return False


def delete_take_by_id(task_id):
    for task in database.dummy_data:
        if task['id'] == task_id:
            database.dummy_data.remove(task)
            return True
    return False


def get_take_by_id(task_id):
    for task in database.dummy_data:
        if task['id'] == task_id:
            return task
    return None


def get_all_takes():
    return database.dummy_data
