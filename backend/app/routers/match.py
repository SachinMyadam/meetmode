from fastapi import APIRouter

from app.services.ai_service import ai_service
from app.services.match_service import calculate_matches

router = APIRouter(
    prefix="/match",
    tags=["Match"],
)


@router.get("/users")
async def match_users():

    memory = await ai_service.search("likes OR love OR interested OR skills")

    interests = []

    for edge in memory.get("edges", []):

        fact = edge.get("fact", "").lower()

        for word in [
            "sachin",
            "likes",
            "like",
            "love",
            "loves",
            "interested",
            "is",
            "in",
            "the",
        ]:
            fact = fact.replace(word, "")

        for token in fact.split():

            token = token.strip(",. ")

            if token and token not in interests:
                interests.append(token)

    matches = calculate_matches(interests)

    return {
        "interests": interests,
        "matches": matches,
    }
