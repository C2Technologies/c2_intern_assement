from fastapi import FastAPI
from controller import todo_controller

app = FastAPI()
app.include_router(todo_controller.router)
