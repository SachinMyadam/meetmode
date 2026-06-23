import { useNavigate } from "react-router-dom";
import { FaBell, FaUserCircle } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

export default function MainLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="content">
        <header className="topbar">
          <div>
            <div className="top-title">Welcome Back{user?.name ? `, ${user.name}` : ""}</div>
            <div className="top-subtitle">Privacy-first AI networking</div>
          </div>

          <div className="top-actions">
            <button className="chip" onClick={() => navigate("/notifications")}><FaBell /></button>
            <button className="chip" onClick={() => navigate("/profile")}><FaUserCircle /> <span>{user?.name || "Profile"}</span></button>
            <button className="logout-btn" onClick={logout}>Logout</button>
          </div>
        </header>

        <main className="page">{children}</main>
      </div>
    </div>
  );
}
