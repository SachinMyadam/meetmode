from pydantic import BaseModel
from typing import List


class UserCreate(BaseModel):
    name: str
    profession: str
    bio: str
    skills: List[str]
    interests: List[str]
    status: str