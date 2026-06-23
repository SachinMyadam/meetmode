import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    get("/events").then((res) => setEvents(res.events || [])).catch(() => setEvents([]));
    get("/recommendations").then((res) => setMatches(res.matches || [])).catch(() => setMatches([]));
  }, []);

  const stats = useMemo(() => ([
    { label: "Users", value: matches.length ? String(matches.length + 1200) : "1248" },
    { label: "Friends", value: String(user?.mode === "meet" ? Math.max(1, Math.min(9, matches.length)) : 0) },
    { label: "Events", value: String(events.length || 3) },
    { label: "AI Score", value: "98%" },
  ]), [events.length, matches.length, user?.mode]);

  return (
    <div className="page">
      <div className="card">
        <div className="top-title">Welcome Back{user?.name ? `, ${user.name}` : ""}</div>
        <div className="top-subtitle">Here is your activity overview</div>
      </div>

      <div className="stats-grid">
        {stats.map((s) => (
          <div key={s.label} className="card stat-card">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="section-title">Upcoming Events</div>
          <div className="event-list">
            {events.length === 0 ? (
              <div className="empty-state">Join an event to unlock nearby people and AI matching.</div>
            ) : events.map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-head">{event.title}</div>
                <div className="meta">📍 {event.city} · 🗓 {event.date}</div>
                <div className="meta">Venue: {event.venue}</div>
                <div style={{ marginTop: 10 }}><span className="badge">{event.code}</span></div>
                <button className="btn" style={{ marginTop: 12 }} onClick={() => navigate(`/events?code=${encodeURIComponent(event.code)}`)}>
                  Open Event
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="section-title">AI Matches</div>
          <div className="match-list">
            {matches.length === 0 ? (
              <div className="empty-state">No matches yet. Join an event and enable Meet Mode.</div>
            ) : matches.map((m) => (
              <div key={m.id} className="match-card">
                <div className="match-name">{m.name}</div>
                <div className="badge">{m.match}% Match</div>
                <div className="meta">📍 {m.city || "Event participant"}</div>
                <div className="meta"><b>Skills:</b> {m.skills?.join(", ") || "-"}</div>
                <div className="meta"><b>Goal:</b> {m.networkingGoal || "-"}</div>
                <div className="meta" style={{ marginTop: 6 }}><b>Icebreaker:</b> {m.starter}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
