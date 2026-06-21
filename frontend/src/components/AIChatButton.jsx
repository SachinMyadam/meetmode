import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AIChatButton() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div
        onClick={() => navigate("/ai")}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "#2563eb",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "22px",
          cursor: "pointer",
          boxShadow: "0 10px 25px rgba(0,0,0,0.4)"
        }}
      >
        🤖
      </div>
    </>
  );
}
