from typing import List

from pydantic import BaseModel


class RememberUserRequest(BaseModel):
    user_id: str
    name: str
    profession: str
    bio: str
    skills: List[str]
    interests: List[str]


class RecommendationRequest(BaseModel):
    user_id: str


class ChatRequest(BaseModel):
    user_id: str
    message: str


class AIResponse(BaseModel):
    response: str
