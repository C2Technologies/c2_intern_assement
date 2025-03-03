import asyncpg
from fastapi import HTTPException
from schema import Task, TaskCreate
import json


with open("config.json", "r") as file:
    config = json.load(file)

DATABASE_NAME = "taskdb"

db_config = {
    'database': config["POSTGRES_DB"],
    'user': config["POSTGRES_USER"],
    'password': config["POSTGRES_PASSWORD"],
    'host': config["POSTGRES_HOST"],
    'port': config["POSTGRES_PORT"],
}

async def get_connection():
    return await asyncpg.connect(**db_config)

async def initialize():
    connection = await get_connection()
    
    db_exists = await connection.fetchval(
        f"SELECT 1 FROM pg_database WHERE datname = '{DATABASE_NAME}';"
    )

    try:
        # await connection.execute("DROP TABLE tasks;")
        if not db_exists:
            await connection.execute(f'CREATE DATABASE "{DATABASE_NAME}";')
            print(f"Database '{DATABASE_NAME}' created successfully.")
            return True
        else:
            print(f"Database '{DATABASE_NAME}' already exists.")
            return True
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error creating table.\n{e}")
    finally:
        await connection.close()
        

async def create_table():
    connection = await get_connection()
    
    query = """
    CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT FALSE,
        date TEXT NOT NULL,
        dateString TEXT NOT NULL
    );
    """ 
    
    try:
        result = await connection.execute(query)
        print("Created 'tasks' table!")
        return True
    except Exception as e:
        print("Couldn't created 'tasks' table!")
        raise HTTPException(status_code=400, detail=f"Error creating table.\n{e}")
    finally:
        await connection.close()


async def create_task(task:TaskCreate):
    connection = await get_connection()
    
    query = """
        INSERT INTO tasks (title, description, completed, date, dateString)
        VALUES ($1, $2, $3, $4, $5);
    """
        
    try:
        data = (task.title, task.description, task.completed, task.date, task.dateString)
        await connection.execute(query, *data)
        new_row_id = await connection.fetch("SELECT * FROM tasks;")
        print("created a new task")
        return new_row_id[-1]
    except HTTPException as e:
        print("couldn't create a new task")
        raise HTTPException(status_code=400, detail="Error inserting task.")
    finally:
        await connection.close()


async def get_all_tasks():
    connection = await get_connection()
    
    query = """
        SELECT * FROM tasks;
    """
    
    try:
        rows = await connection.fetch(query)
        tasks = [row for row in rows]
        print("Successfully fetched all tasks")
        return tasks
    except HTTPException as e:
        print("Couldn't fetch tasks")
        raise HTTPException(status_code=400, detail="Error fetching tasks.")
    finally:
        await connection.close()
    
    
async def get_task_by_id(task_id: int):
    connection = await get_connection()
    
    query = """
        SELECT * FROM tasks
        WHERE id = $1;
    """
    
    try:
        rows = await connection.fetch(query, task_id)
        tasks = [row for row in rows]
        print("Successfully fetched a task")
        return tasks
    except HTTPException as e:
        print("Couldn't fetch task")
        raise HTTPException(status_code=400, detail="Error fetching task.")
    finally:
        await connection.close()
    
        
async def update_task(task_id: int, task:TaskCreate):
    connection = await get_connection()
    
    query = """
        UPDATE tasks
        SET title = $1, description = $2, completed = $3, date = $4, dateString = $5
        WHERE id = $6;
    """
    
    try:
        response = await connection.execute(query, task.title, task.description, task.completed, task.date, task.dateString, task_id)
        print("Successfully updated a task")
        return response
    except HTTPException as e:
        print("Couldn't update task")
        raise HTTPException(status_code=400, detail="Error updating task.")
    finally:
        await connection.close()
    

async def delete_task(task_id: int):
    connection = await get_connection()
    
    query = """
        DELETE FROM tasks
        WHERE id = $1;
    """

    try:
        await connection.execute(query, task_id)
        print("Successfully delete a task")
        return True
    except HTTPException as e:
        print("Couldn't delete task")
        raise HTTPException(status_code=400, detail="Error deleting task.")
    finally:
        await connection.close()
