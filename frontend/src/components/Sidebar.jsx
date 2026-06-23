import { NavLink } from "react-router-dom";
import {
  FaHouse,
  FaUsers,
  FaCalendarDays,
  FaComments,
  FaBell,
  FaQrcode,
  FaRobot,
  FaGear,
  FaUser,
  FaSliders,
} from "react-icons/fa6";

const linkStyle = ({ isActive }) => `nav-link${isActive ? " active" : ""}`;

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand-wrap">
        <div className="brand-mark">🚀</div>
        <div>
          <div className="brand-name">MeetMode</div>
          <div className="brand-sub">AI networking</div>
        </div>
      </div>

      <nav className="nav-stack">
        <NavLink to="/" className={linkStyle}><FaHouse /> Dashboard</NavLink>
        <NavLink to="/friends" className={linkStyle}><FaUsers /> Nearby People</NavLink>
        <NavLink to="/events" className={linkStyle}><FaCalendarDays /> Events</NavLink>
        <NavLink to="/chat" className={linkStyle}><FaComments /> Chat</NavLink>
        <NavLink to="/notifications" className={linkStyle}><FaBell /> Notifications</NavLink>
        <NavLink to="/qr-network" className={linkStyle}><FaQrcode /> QR Network</NavLink>
        <NavLink to="/ai" className={linkStyle}><FaRobot /> AI Assistant</NavLink>
        <NavLink to="/profile" className={linkStyle}><FaUser /> Profile</NavLink>
        <NavLink to="/settings" className={linkStyle}><FaGear /> Settings</NavLink>
        <NavLink to="/interests" className={linkStyle}><FaSliders /> Interests</NavLink>
      </nav>
    </aside>
  );
}
