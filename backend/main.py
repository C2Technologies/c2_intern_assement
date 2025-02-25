from fastapi import FastAPI
from routes.task_routes import router
from fastapi.middleware.cors import CORSMiddleware

from database.database import engine
from database.models import task_model

task_model.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(router)