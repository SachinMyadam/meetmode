import { useEffect, useState } from "react";
import { get } from "../api/client";

export default function Notifications() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    get("/notifications").then((res) => setItems(res.notifications || []));
  }, []);

  return (
    <div>
      <h1 className="page-title">Notifications</h1>
      <p className="page-subtitle">Activity, invites, and Meet Mode updates</p>

      <div className="notification-list">
        {items.length === 0 ? (
          <div className="empty-state">No notifications yet.</div>
        ) : items.map((item) => (
          <div className="event-card" key={item.id}>
            <div className="notification-title">{item.title}</div>
            <div className="notification-body">{item.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
