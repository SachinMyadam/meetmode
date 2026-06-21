import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Settings() {
  const { theme, setTheme, logout } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.toggle("light", theme === "light");
  }, [theme]);

  const onLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div>
      <h1 className="page-title">⚙️ Settings</h1>
      <p className="page-subtitle">Theme, notifications, and logout</p>

      <div className="card" style={{ maxWidth: 820 }}>
        <div className="toggle-row">
          <label className="switch">
            <input
              type="checkbox"
              checked={theme === "light"}
              onChange={(e) => setTheme(e.target.checked ? "light" : "dark")}
            />
            <span className="slider" />
          </label>
          <div>Dark Mode</div>
        </div>

        <div className="toggle-row">
          <label className="switch">
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />
            <span className="slider" />
          </label>
          <div>Notifications</div>
        </div>

        <button className="logout-btn" onClick={onLogout} style={{ marginTop: 8 }}>
          Logout
        </button>
      </div>
    </div>
  );
}
