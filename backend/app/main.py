from fastapi import FastAPI

from app.routers.auth import router as auth_router
from app.routers.user import router as user_router
from app.routers.friend import router as friend_router
from app.routers.discovery import router as discovery_router
from app.routers.event import router as event_router
from app.routers.chat import router as chat_router
from app.routers.notification import router as notification_router
from app.routers.qr import router as qr_router
from app.routers.ai import router as ai_router

app = FastAPI(
    title="MeetMode API",
    version="1.0.0",
    description="Backend API for MeetMode",
)

app.include_router(auth_router)
app.include_router(user_router)
app.include_router(friend_router)
app.include_router(discovery_router)
app.include_router(event_router)
app.include_router(chat_router)
app.include_router(notification_router)
app.include_router(qr_router)
app.include_router(ai_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to MeetMode API"
    }
