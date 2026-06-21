import { useState } from "react";
import { FaRobot } from "react-icons/fa";
import AIChat from "./AIChat";

function FloatingAI() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <AIChat
          onClose={() => setOpen(false)}
        />
      )}

      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          width: "70px",
          height: "70px",
          borderRadius: "50%",
          border: "none",
          background: "linear-gradient(90deg,#2563eb,#4f46e5)",
fontWeight: "600",
letterSpacing: ".3px",
          color: "white",
          fontSize: "28px",
          cursor: "pointer",
          boxShadow: "0 10px 30px rgba(37,99,235,.5)",
          zIndex: 9999,
        }}
      >
        <FaRobot />
      </button>
    </>
  );
}

export default FloatingAI;
