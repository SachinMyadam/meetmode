from typing import List

from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    profession: str
    bio: str
    skills: List[str]
    interests: List[str]
    status: str


class UserUpdate(BaseModel):
    name: str
    email: EmailStr
    password: str
    profession: str
    bio: str
    skills: List[str]
    interests: List[str]
    status: str


class UserResponse(BaseModel):
    id: str
    name: str
    email: EmailStr
    profession: str
    bio: str
    skills: List[str]
    interests: List[str]
    status: str