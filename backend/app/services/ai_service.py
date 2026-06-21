from app.repositories.ai_repository import ai_repository
from app.services.event_service import fetch_all_events


class AIService:

    async def remember(self, content: str):
        result = await ai_repository.remember(content)
        return result.model_dump()

    async def search(self, query: str):
        result = await ai_repository.search(query)
        return result.model_dump()

    async def groups(self):
        result = await ai_repository.groups()
        return result.model_dump()

    async def recommend_events(self):
        memory = await ai_repository.search(
            "What does the user like?"
        )

        memory = memory.model_dump()

        interests = []

        for edge in memory.get("edges", []):
            fact = edge.get("fact", "").lower()

            fact = fact.replace("likes", "")
            fact = fact.replace("like", "")
            fact = fact.replace("sachin", "")
            fact = fact.replace("hackathons", "hackathon")
            fact = fact.replace("meetups", "meetup")

            for word in fact.split():

                word = word.strip(",. ")

                # Keep AI even though it's only 2 characters
                if len(word) >= 2:
                    interests.append(word)

        events = fetch_all_events()

        recommendations = []

        for event in events:

            searchable = (
                event["title"]
                + " "
                + event["description"]
                + " "
                + " ".join(event["tags"])
            ).lower()

            score = 0
            matched = []

            for word in interests:

                if (
                    word in searchable
                    or word.rstrip("s") in searchable
                ):

                    score += 1

                    if word not in matched:
                        matched.append(word)

            if score > 0:
                recommendations.append(
                    {
                        "score": score,
                        "matched_keywords": matched,
                        "event": event,
                    }
                )

        recommendations.sort(
            key=lambda x: x["score"],
            reverse=True,
        )

        return recommendations


ai_service = AIService()
