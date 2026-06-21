import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header
      style={{
        height: "72px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 40px",
        background: "rgba(2,6,23,.85)",
        backdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(255,255,255,.08)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <h2 style={{ color: "white", fontWeight: 700 }}>
        🚀 MeetMode
      </h2>

      <nav style={{ display: "flex", gap: "28px" }}>
        <Link to="/" style={{ color: "#e2e8f0", textDecoration: "none" }}>Dashboard</Link>
        <Link to="/events" style={{ color: "#e2e8f0", textDecoration: "none" }}>Events</Link>
        <Link to="/friends" style={{ color: "#e2e8f0", textDecoration: "none" }}>Friends</Link>
        <Link to="/ai" style={{ color: "#e2e8f0", textDecoration: "none" }}>AI</Link>
        <Link to="/profile" style={{ color: "#e2e8f0", textDecoration: "none" }}>Profile</Link>
      </nav>
    </header>
  );
}

export default Navbar;
