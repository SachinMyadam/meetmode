from fastapi import FastAPI

from app.routers.user import router

app = FastAPI(
    title="MeetMode API",
    description="Backend API for MeetMode",
    version="1.0.0"
)

app.include_router(router)


@app.get("/")
def home():
    return {
        "message": "Welcome to MeetMode 🚀"
    }