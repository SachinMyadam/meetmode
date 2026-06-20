from fastapi import FastAPI

from app.routers.user import router as user_router
from app.routers.auth import router as auth_router

app = FastAPI(
    title="MeetMode API",
    version="1.0.0",
    description="Backend API for MeetMode",
)

app.include_router(auth_router)
app.include_router(user_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to MeetMode API"
    }