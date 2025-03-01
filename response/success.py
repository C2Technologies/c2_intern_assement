from model.todo import Task


def json_added_response(task: Task):
    return {
        "statusCode": 204,
        "data": task
    }


def json_remove_response(task: Task):
    return {
        "statusCode": 200,
        "data": task
    }


def json_update_response(task: Task):
    return {
        "statusCode": 204,
        "data": task
    }


def json_get_response(task: Task):
    return {
        "statusCode": 200,
        "data": task
    }


def jsons_get_response(tasks: [Task]):
    return {
        "statusCode": 200,
        "data": tasks
    }
