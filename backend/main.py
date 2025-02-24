from typing import Optional, Union
from data import tasks 
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class Task(BaseModel):
    title: str
    description: str
    completed: Optional[bool] = None


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/tasks", response_model=list[Task])
async def get_all_tasks():
    return tasks

