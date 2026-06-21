function RecommendationCard({ user }) {

  if (!user) {
    return null;
  }

  return (
    <div
      style={{
        background: "#1e2b5c",
        borderRadius: "18px",
        padding: "22px",
        marginBottom: "20px",
        color: "white",
        boxShadow: "0 8px 24px rgba(0,0,0,.25)",
      }}
    >
      <h2>{user.name || "Unknown User"}</h2>

      <h3 style={{ color: "#60a5fa" }}>
        {user.score ?? 0}% Match
      </h3>

      <p>📍 {user.city || "Unknown"}</p>

      <p>
        <b>Skills:</b>{" "}
        {Array.isArray(user.matched)
          ? user.matched.join(", ")
          : "None"}
      </p>
    </div>
  );
}

export default RecommendationCard;
