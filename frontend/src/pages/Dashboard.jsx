import { useEffect, useState } from "react";
import { get, post } from "../api/client";
import AIPopup from "../components/AIPopup";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [friends, setFriends] = useState([]);

  const load = async () => {
    const [eventsRes, friendsRes] = await Promise.all([
      get("/events"),
      get("/user/friends"),
    ]);
    setEvents(eventsRes.events || []);
    setFriends(friendsRes.friends || []);
  };

  useEffect(() => {
    load();
  }, []);

  const register = async (eventId) => {
    await post("/events/register", { eventId });
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId ? { ...e, registered: true } : e
      )
    );
  };

  return (
    <div>
      <h1 className="page-title">👋 Welcome Back</h1>
      <p className="page-subtitle">Your dashboard overview</p>

      <div className="grid-4">
        <div className="card stat blue">
          Users: 1248
        </div>
        <div className="card stat green">
          Friends: {friends.length}
        </div>
        <div className="card stat orange">
          Events: {events.length}
        </div>
        <div className="card stat purple">
          AI Score: 98%
        </div>
      </div>

      <h2 className="section-title">Events</h2>

      {events.map((e) => (
        <div className="card" key={e.id}>
          <h3>{e.title}</h3>
          <p>{e.location}</p>
          <button className="btn" onClick={() => register(e.id)}>
            {e.registered ? "Registered" : "Register"}
          </button>
        </div>
      ))}

      {/* 🔥 AI POPUP ADDED HERE */}
      <AIPopup />
    </div>
  );
}
