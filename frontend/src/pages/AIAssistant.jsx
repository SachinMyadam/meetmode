import { useEffect, useState } from "react";
import { get } from "../api/client";

export default function AIAssistant() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    get("/recommendations").then((res) => setMatches(res.matches || []));
  }, []);

  return (
    <div>
      <h1 className="page-title">AI Recommendations</h1>
      <p className="page-subtitle">People who match your interests and networking goal</p>

      <div className="event-list">
        {matches.length === 0 ? (
          <div className="empty-state">Join an event and enable Meet Mode to unlock recommendations.</div>
        ) : matches.map((m) => (
          <div className="event-card" key={m.id}>
            <div className="event-head">{m.name}</div>
            <div className="badge">{m.match}% Match</div>
            <div className="meta">{m.profession || ""} · 📍 {m.city || "Event"}</div>
            <div className="meta"><b>Skills:</b> {m.skills?.join(", ") || "-"}</div>
            <div className="meta"><b>Interests:</b> {m.interests?.join(", ") || "-"}</div>
            <div className="meta"><b>Icebreaker:</b> {m.starter}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
