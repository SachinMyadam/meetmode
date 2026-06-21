from fastapi import APIRouter
from pydantic import BaseModel

from app.services.ai_service import ai_service

router = APIRouter(
    prefix="/ai",
    tags=["AI"],
)


class RememberRequest(BaseModel):
    content: str
    group_id: str = "default"


class SearchRequest(BaseModel):
    query: str
    group_id: str = "default"


@router.post("/remember")
async def remember(request: RememberRequest):
    return await ai_service.remember(
        content=request.content,
    )


@router.post("/search")
async def search(request: SearchRequest):
    return await ai_service.search(
        query=request.query,
    )


@router.get("/groups")
async def groups():
    return await ai_service.groups()


@router.get("/recommend/events")
async def recommend_events():
    return await ai_service.recommend_events()
