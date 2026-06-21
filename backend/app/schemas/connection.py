from pydantic import BaseModel


class ConnectionResponse(BaseModel):
    user_id: str
    connected_user_id: str
