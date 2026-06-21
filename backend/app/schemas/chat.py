from pydantic import BaseModel


class MessageCreate(BaseModel):
    receiver_id: str
    message: str


class MessageResponse(BaseModel):
    id: str
    sender_id: str
    receiver_id: str
    message: str
    timestamp: str
