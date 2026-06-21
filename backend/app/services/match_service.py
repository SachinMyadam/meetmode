users = [
    {
        "name": "Rahul Sharma",
        "skills": ["Python", "FastAPI", "AI", "Docker"],
        "city": "Hyderabad",
    },
    {
        "name": "Priya Reddy",
        "skills": ["Java", "Spring", "Oracle"],
        "city": "Hyderabad",
    },
    {
        "name": "Arjun Kumar",
        "skills": ["Python", "Valkey", "AI", "React"],
        "city": "Bangalore",
    },
    {
        "name": "Neha Gupta",
        "skills": ["Python", "Oracle", "AI", "Machine Learning"],
        "city": "Hyderabad",
    },
]


def calculate_matches(user_interests):
    matches = []

    interests = [x.lower() for x in user_interests]

    for user in users:

        score = 0
        matched = []

        for skill in user["skills"]:

            if skill.lower() in interests:

                score += 25
                matched.append(skill)

        if score > 100:
            score = 100

        matches.append(
            {
                "name": user["name"],
                "city": user["city"],
                "score": score,
                "matched": matched,
            }
        )

    matches.sort(
        key=lambda x: x["score"],
        reverse=True,
    )

    return matches
