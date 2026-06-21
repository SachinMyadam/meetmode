import { useEffect, useState } from "react";
import { get } from "../api/client";

export default function Friends() {
  const [query, setQuery] = useState("");
  const [friends, setFriends] = useState([]);

  const load = async (q = "") => {
    const res = await get(`/user/friends?q=${encodeURIComponent(q)}`);
    setFriends(res.friends || []);
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    const id = setTimeout(() => load(query), 250);
    return () => clearTimeout(id);
  }, [query]);

  return (
    <div>
      <h1 className="page-title">🤝 Friends</h1>
      <p className="page-subtitle">Find people by name, city, skill, or interest</p>

      <input
        className="input"
        style={{ maxWidth: 560, marginBottom: 18 }}
        placeholder="Search by name, city, or skill..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="empty-state" style={{ paddingTop: 0 }}>
        Total Matches: {friends.length}
      </div>

      {friends.length === 0 ? (
        <div className="empty-state">No matches yet.</div>
      ) : (
        friends.map((friend) => (
          <div className="card event-card" key={friend.id}>
            <div className="event-head">{friend.name}</div>
            <div className="badge">{friend.match}% Match</div>
            <div className="meta">📍 {friend.city}</div>
            <div className="empty-state" style={{ padding: "10px 0 0" }}>
              <b>Skills:</b> {friend.skills.join(", ")}
            </div>
            <div className="empty-state" style={{ padding: "8px 0 0" }}>
              <b>Interests:</b> {friend.interests.join(", ")}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
