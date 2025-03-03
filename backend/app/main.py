from fastapi import FastAPI
import schema
import database
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import asyncio

app =  FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], 
)


@app.get("/")
async def home():
    await database.initialize()
    await database.create_table()

@app.post("/tasks")
async def create_task(task:schema.TaskCreate):
    response = await database.create_task(task)
    return response


@app.get("/tasks")
async def get_tasks():
    response = await database.get_all_tasks()
    return response


@app.get("/tasks/{task_id}")
async def get_a_task(task_id:int):
    response = await database.get_task_by_id(task_id)
    return response


@app.put("/tasks/{task_id}")
async def update_task(task_id:int, task:schema.TaskCreate):
    response = await database.update_task(task_id, task)
    return response


@app.delete("/tasks/{task_id}")
async def delete_task(task_id: int):
    response = await database.delete_task(task_id)
    return response


async def main():
    await database.initialize()
    await database.create_table()
    
    
if __name__ == "__main__":
    asyncio.run(main())
    uvicorn.run(app, host="127.0.0.1", port=8000)
    