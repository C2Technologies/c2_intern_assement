import uvicorn
from fastapi import FastAPI

from starlette.middleware.cors import CORSMiddleware
from persistence import database

from controller import todo_controller

app = FastAPI()


@app.on_event("startup")
def on_startup():
    database.create_table()


app.include_router(todo_controller.router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
