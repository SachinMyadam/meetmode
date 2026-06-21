from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/ai", tags=["AI"])

MATCHES = [
    {
        "name": "Neha Gupta",
        "city": "Hyderabad",
        "score": 75,
        "matched": ["Python", "Oracle", "AI"],
    },
    {
        "name": "Rahul Sharma",
        "city": "Hyderabad",
        "score": 50,
        "matched": ["Python", "AI"],
    },
    {
        "name": "Arjun Kumar",
        "city": "Bangalore",
        "score": 50,
        "matched": ["Python", "AI"],
    },
    {
        "name": "Priya Reddy",
        "city": "Hyderabad",
        "score": 25,
        "matched": ["Oracle"],
    },
]


class ChatRequest(BaseModel):
    message: str


@router.post("/chat")
async def chat(request: ChatRequest):
    question = request.message.lower()

    if "python" in question:
        users = [
            u["name"]
            for u in MATCHES
            if "Python" in u["matched"]
        ]

        return {
            "reply": f"🐍 Python developers: {', '.join(users)}"
        }

    if "oracle" in question:
        users = [
            u["name"]
            for u in MATCHES
            if "Oracle" in u["matched"]
        ]

        return {
            "reply": f"🗄️ Oracle experts: {', '.join(users)}"
        }

    if "hyderabad" in question:
        users = [
            u["name"]
            for u in MATCHES
            if u["city"] == "Hyderabad"
        ]

        return {
            "reply": f"📍 Hyderabad members: {', '.join(users)}"
        }

    if "best" in question or "match" in question:
        best = max(MATCHES, key=lambda x: x["score"])

        return {
            "reply": f"🏆 Best match: {best['name']} ({best['score']}%)"
        }

    if "friends" in question:
        return {
            "reply": f"🤝 I found {len(MATCHES)} networking recommendations."
        }

    return {
        "reply": "👋 Ask me about Python, Oracle, Hyderabad, friends or your best match."
    }
