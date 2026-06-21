import { NavLink, useNavigate } from "react-router-dom";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";

export default function MainLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <Sidebar />

      <div className="content">
        <header className="topbar">
          <div className="brand">🚀 MeetMode</div>

          <div className="top-actions">
            <button className="chip" onClick={() => navigate("/notifications")}>
              <FaBell />
            </button>

            <button className="chip" onClick={() => navigate("/profile")}>
              <FaUserCircle />
              <span style={{ marginLeft: 8 }}>{user?.name}</span>
            </button>

            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
        </header>

        <main className="page">{children}</main>
      </div>
    </div>
  );
}
