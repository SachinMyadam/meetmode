import { useEffect, useState } from "react";
import { get, post } from "../api/client";

export default function Events() {
  const [events, setEvents] = useState([]);

  const load = async () => {
    const res = await get("/events");
    setEvents(res.events || []);
  };

  useEffect(() => {
    load();
  }, []);

  const register = async (eventId) => {
    await post("/events/register", { eventId });
    setEvents((prev) =>
      prev.map((event) => (event.id === eventId ? { ...event, registered: true } : event))
    );
  };

  return (
    <div>
      <h1 className="page-title">📅 Events</h1>
      <p className="page-subtitle">Register and manage event participation</p>

      {events.map((event) => (
        <div className="card event-card" key={event.id}>
          <div className="event-head">{event.title}</div>
          <div className="meta">📍 {event.location}</div>
          <div className="meta">📅 {event.date}</div>
          <div className="empty-state" style={{ padding: "10px 0 14px" }}>
            {event.description}
          </div>
          <button
            className={`btn ${event.registered ? "success" : ""}`}
            onClick={() => register(event.id)}
            disabled={event.registered}
          >
            {event.registered ? "Registered" : "Register"}
          </button>
        </div>
      ))}
    </div>
  );
}
