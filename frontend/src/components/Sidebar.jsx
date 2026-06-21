import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUserFriends,
  FaCalendarAlt,
  FaComments,
  FaQrcode,
  FaBell,
  FaRobot,
  FaCog,
} from "react-icons/fa";

const items = [
  { to: "/", label: "Dashboard", icon: <FaHome /> },
  { to: "/friends", label: "Friends", icon: <FaUserFriends /> },
  { to: "/events", label: "Events", icon: <FaCalendarAlt /> },
  { to: "/chat", label: "Chats", icon: <FaComments /> },
  { to: "/qr", label: "QR Network", icon: <FaQrcode /> },
  { to: "/notifications", label: "Notifications", icon: <FaBell /> },
  { to: "/ai", label: "AI Assistant", icon: <FaRobot /> },
  { to: "/settings", label: "Settings", icon: <FaCog /> },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">🚀 MeetMode</div>

      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === "/"}
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          <span style={{ width: 18, display: "inline-flex", justifyContent: "center" }}>
            {item.icon}
          </span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </aside>
  );
}
