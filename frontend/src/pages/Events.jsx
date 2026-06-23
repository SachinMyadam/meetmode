import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { get, post } from "../api/client";

export default function Events() {
  const [params] = useSearchParams();
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState("");

  const load = async () => {
    const res = await get("/events");
    setEvents(res.events || []);
  };

  const joinCode = async (code) => {
    const res = await post("/qr/join", { code });
    setStatus(res.message || "Joined");
    await load();
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    const code = params.get("code");
    if (code) joinCode(code).catch(() => setStatus("Invalid QR code"));
  }, [params]);

  return (
    <div>
      <h1 className="page-title">Events</h1>
      <p className="page-subtitle">Join with a QR code, then enable Meet Mode</p>

      {status ? <div className="empty-state" style={{ marginBottom: 14 }}>{status}</div> : null}

      <div className="form-grid" style={{ marginBottom: 18 }}>
        <input id="joinCode" className="input" placeholder="Enter event code like EVT-HYD-2026" />
        <button className="btn" onClick={() => joinCode(document.getElementById("joinCode").value.trim())}>Join by Code</button>
      </div>

      <div className="event-list">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <div className="event-head">{event.title}</div>
            <div className="meta">📍 {event.city} · 🗓 {event.date}</div>
            <div className="meta">Venue: {event.venue}</div>
            <div className="meta">Code: <span className="badge">{event.code}</span></div>
            <div className="meta">Attendees: {event.attendees}</div>
            <button className="btn" style={{ marginTop: 12 }} onClick={() => joinCode(event.code)}>
              Join Event
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
