from pydantic import BaseModel


class FriendRequestCreate(BaseModel):
    receiver_id: str


class FriendRequestResponse(BaseModel):
    id: str
    sender_id: str
    receiver_id: str
    status: str
