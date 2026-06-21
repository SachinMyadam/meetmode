from typing import List

from pydantic import BaseModel


class EventCreate(BaseModel):
    title: str
    description: str
    location: str
    date: str
    tags: List[str]


class EventUpdate(BaseModel):
    title: str
    description: str
    location: str
    date: str
    tags: List[str]


class EventResponse(BaseModel):
    id: str
    title: str
    description: str
    location: str
    date: str
    tags: List[str]
    created_by: str
    participants: List[str]
