import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import AIChatButton from "./AIChatButton";

export default function Layout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#020617" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />

        <div style={{ padding: "40px", color: "white" }}>
          {children}
        </div>
      </div>

      <AIChatButton />
    </div>
  );
}
