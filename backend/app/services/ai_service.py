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
        memory = await ai_repository.search("likes OR loves OR interested")

        memory = memory.model_dump()

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

            for word in fact.split():

                word = word.strip(",. ")

                if len(word) >= 2:
                    interests.append(word)

        recommendations = []
        seen = set()

        for event in fetch_all_events():

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

                if word in searchable:

                    score += 1

                    if word not in matched:
                        matched.append(word)

            if score:

                key = event["title"]

                if key not in seen:

                    seen.add(key)

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

    async def chat(self, message: str):

        msg = message.lower()

        if "remember" in msg:

            text = (
                message.replace("remember", "")
                .replace("Remember", "")
                .strip()
            )

            await ai_repository.remember(text)

            return {
                "reply": f"✅ I'll remember: {text}"
            }

        if (
            "recommend" in msg
            and "event" in msg
        ):

            recs = await self.recommend_events()

            if not recs:
                return {
                    "reply": "No matching events found."
                }

            text = "🎯 Recommended Events\n\n"

            for item in recs[:3]:

                e = item["event"]

                text += (
                    f"• {e['title']}\n"
                    f"📍 {e['location']}\n"
                    f"📅 {e['date']}\n\n"
                )

            return {"reply": text}

        result = await ai_repository.search(message)

        result = result.model_dump()

        edges = result.get("edges", [])

        if not edges:
            return {
                "reply": "I couldn't find anything."
            }

        text = "\n".join(
            edge["fact"]
            for edge in edges[:5]
        )

        return {"reply": text}


ai_service = AIService()
