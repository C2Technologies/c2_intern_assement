# To-Do Task Manager

## Overview 

This is the backend for the To-Do App built using FastAPI and PostgreSQL. It provides a RESTful API to manage tasks, including creating, updating, deleting, and retrieving tasks

## Features

- Create a task with a title and description.
- Retrieve all tasks.
- Retrieve a single task.
- Update a task (title, description).
- Update the `complete` status of a task.
- Delete a single task.

## Tech Stack

- **Backend**: FastAPI(Python)
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **Environment Management**: Python Virtual Environment

## API Endpoints

| Methods    | Endpoint         | Description
|------------|------------------|--------------------------
| POST       | /tasks           | Create a new task
| GET        | /tasks           | Retrieve all tasks
| GET        | /tasks/{task_id} | Retrieve a single task
| PUT        | /tasks/{task_id} | Update a single task (title, description)
| PATCH      | /tasks/{task_id} | Update a single task (completed status)
| DELETE     | /tasks/{task_id} | Delete a single task

## Setup and Prerequisites

### Prerequisites

- Python 3.8+
- Pip 
- PostgreSQL installed and running
- Virtual environment (recommended)

### Running the server

1. Clone the project and `cd` into the project

```bash
https://github.com/C2Technologies/c2_intern_assement
cd c2_intern_assement
```

2. Switch to the following branch `todo-app-atlegang-sethono`
```bash
git checkout todo-app-atlegang-sethono
```

3. Create and activate a Virtual Environment
For Unix/macOS
```bash
python3 -m venv .venv
source .venv/bin/activate
```

For Windows
```bash
py -m venv .venv
.venv\Scripts\activate
```

To confirm the virtual environment is activated, check the location of your Python interpreter

For Unix/macOS
```bash
which python
```

For Windows
```bash
where python
```

4. Install Dependencies

```bash
pip install -r requirements.txt
```

5. Create a `.env` file in the root directory and add
```
SQLALCHEMY_DATABASE_URL=postgresql://username:password@localhost:5432/todo_db
```
Replace `username`, `password` and `todo_db` with your actual PostgreSQL credentials

5. Apply Database Migrations 

```bash
alembic upgrade head
```

6. Run the FastAPI Server
```bash
uvicorn main:app --reload
```

The API will be available at `http://127.0.0.1:8000/`

7. Testing the API

You can use `Postman` to test API endpoints. Alternatively, you can open `http://127.0.0.1:8000/docs` in the browser to use the Swagger UI.

8. To deactivate the virtual environment, simply run
```bash
deactivate
```