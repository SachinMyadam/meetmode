import { useEffect, useState } from "react";
import { get } from "../api/client";

export default function Friends() {
  const [query, setQuery] = useState("");
  const [friends, setFriends] = useState([]);

  const load = async (q = "") => {
    const res = await get(`/user/friends?q=${encodeURIComponent(q)}`);
    setFriends(res.friends || []);
  };

  useEffect(() => { load(); }, []);
  useEffect(() => {
    const id = setTimeout(() => load(query), 250);
    return () => clearTimeout(id);
  }, [query]);

  return (
    <div>
      <h1 className="page-title">Nearby People</h1>
      <p className="page-subtitle">Only people in the same event and Meet Mode are visible</p>

      <input
        className="input"
        style={{ maxWidth: 560, marginBottom: 18 }}
        placeholder="Search by name, city, skill, or interest..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="empty-state" style={{ paddingTop: 0 }}>
        Total Matches: {friends.length}
      </div>

      <div className="event-list" style={{ marginTop: 14 }}>
        {friends.length === 0 ? (
          <div className="empty-state">No visible people yet. Join an event and switch to Meet Mode.</div>
        ) : friends.map((friend) => (
          <div className="event-card" key={friend.id}>
            <div className="event-head">{friend.name}</div>
            <div className="badge">{friend.match}% Match</div>
            <div className="meta">{friend.profession || "Professional"} · 📍 {friend.city || "Event"}</div>
            <div className="meta"><b>Skills:</b> {friend.skills?.join(", ") || "-"}</div>
            <div className="meta"><b>Interests:</b> {friend.interests?.join(", ") || "-"}</div>
            <div className="meta"><b>Goal:</b> {friend.networkingGoal || "-"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
