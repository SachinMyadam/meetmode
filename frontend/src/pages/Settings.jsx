import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Settings() {
  const { theme, setTheme, logout, user, toggleMode } = useAuth();
  const [meetMode, setMeetMode] = useState(user?.mode === "meet");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.toggle("light", theme === "light");
  }, [theme]);

  useEffect(() => {
    setMeetMode(user?.mode === "meet");
  }, [user]);

  const onLogout = async () => {
    await logout();
    navigate("/login");
  };

  const switchMode = async (checked) => {
    setMeetMode(checked);
    await toggleMode(checked ? "meet" : "focus");
  };

  return (
    <div>
      <h1 className="page-title">Settings</h1>
      <p className="page-subtitle">Theme, Meet Mode, and logout</p>

      <div className="card" style={{ maxWidth: 820 }}>
        <div className="toggle-row">
          <label className="switch">
            <input type="checkbox" checked={theme === "light"} onChange={(e) => setTheme(e.target.checked ? "light" : "dark")} />
            <span className="slider" />
          </label>
          <div>Light Mode</div>
        </div>

        <div className="toggle-row">
          <label className="switch">
            <input type="checkbox" checked={meetMode} onChange={(e) => switchMode(e.target.checked)} />
            <span className="slider" />
          </label>
          <div>{meetMode ? "🟢 Meet Mode" : "🔴 Focus Mode"}</div>
        </div>

        <button className="logout-btn" onClick={onLogout} style={{ marginTop: 14 }}>
          Logout
        </button>
      </div>
    </div>
  );
}
