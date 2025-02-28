from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from controller import todo_controller

app = FastAPI()
app.include_router(todo_controller.router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*']
)
