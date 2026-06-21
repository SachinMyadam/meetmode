from fastapi import APIRouter

router = APIRouter(prefix="/event", tags=["Event Registration"])


@router.post("/register/{event_id}")
async def register(event_id: int):
    return {
        "success": True,
        "message": f"Successfully registered for event {event_id}"
    }
