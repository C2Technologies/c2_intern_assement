from model.todo import Todo


def json_added_response(task: Todo):
    return {
        "statusCode": 204,
        "data": task
    }


def json_remove_response(task: Todo):
    return {
        "statusCode": 200,
        "data": task
    }


def json_update_response(task: Todo):
    return {
        "statusCode": 204,
        "data": task
    }


def json_get_response(task: Todo):
    return {
        "statusCode": 200,
        "data": task
    }


def jsons_get_response(task: [Todo]):
    return {
        "statusCode": 200,
        "data": task
    }
