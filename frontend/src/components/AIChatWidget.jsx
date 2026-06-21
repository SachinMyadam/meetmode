import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAiReply } from "../lib/meetmodeAi";

export default function AIChatWidget() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! I'm your MeetMode AI assistant." },
  ]);

  const canSend = useMemo(() => input.trim().length > 0, [input]);

  function send() {
    const text = input.trim();
    if (!text) return;

    const reply = getAiReply(text);

    setMessages((prev) => [
      ...prev,
      { role: "user", text },
      { role: "assistant", text: reply },
    ]);
    setInput("");
  }

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          position: "fixed",
          right: "18px",
          bottom: "18px",
          width: "54px",
          height: "54px",
          borderRadius: "50%",
          border: "none",
          background: "#2563eb",
          color: "white",
          fontSize: "22px",
          cursor: "pointer",
          boxShadow: "0 14px 36px rgba(0,0,0,.35)",
          zIndex: 9999,
        }}
        title="Open AI chat"
      >
        🤖
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            right: "18px",
            bottom: "84px",
            width: "320px",
            height: "420px",
            background: "var(--card-2)",
            border: "1px solid rgba(255,255,255,.12)",
            borderRadius: "16px",
            boxShadow: "0 20px 60px rgba(0,0,0,.45)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "12px 14px",
              borderBottom: "1px solid rgba(255,255,255,.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ fontWeight: 800, fontSize: "14px" }}>MeetMode AI</div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => navigate("/ai")}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#93c5fd",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                Open
              </button>
              <button
                onClick={() => setOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>
          </div>

          <div
            style={{
              flex: 1,
              padding: "12px",
              overflowY: "auto",
              display: "grid",
              gap: "8px",
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === "user" ? "end" : "start",
                  maxWidth: "86%",
                  padding: "9px 11px",
                  borderRadius: "12px",
                  background: m.role === "user" ? "#2563eb" : "#1e293b",
                  fontSize: "13px",
                  lineHeight: 1.35,
                }}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div
            style={{
              padding: "10px",
              borderTop: "1px solid rgba(255,255,255,.08)",
              display: "flex",
              gap: "8px",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask..."
              style={{
                flex: 1,
                padding: "10px 12px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,.12)",
                background: "#020617",
                color: "white",
                fontSize: "13px",
              }}
            />
            <button
              onClick={send}
              disabled={!canSend}
              style={{
                padding: "10px 12px",
                borderRadius: "10px",
                border: "none",
                background: canSend ? "#2563eb" : "#334155",
                color: "white",
                cursor: canSend ? "pointer" : "not-allowed",
                fontSize: "13px",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
