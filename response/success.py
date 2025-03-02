from typing import Any

from model.todo import Task

"""
custom data success module to incapsulate response states to allow us to easily change response data in the future if
needed.
"""


def json_added_response(task: Task):
    return task


def json_remove_response(task: Task):
    return task


def json_update_response(task: Task):
    return task


def json_get_response(task: Task):
    return task


def jsons_get_response(tasks: [Task]) -> Any:
    return tasks
