import { useEffect, useState } from "react";
import { get } from "../api/client";

export default function Notifications() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    get("/notifications").then((res) => setItems(res.notifications || []));
  }, []);

  return (
    <div>
      <h1 className="page-title">🔔 Notifications</h1>
      <p className="page-subtitle">Activity and alerts</p>

      {items.map((item) => (
        <div className="card event-card" key={item.id}>
          <div className="notification-title">{item.title}</div>
          <div className="notification-body">{item.body}</div>
        </div>
      ))}
    </div>
  );
}
