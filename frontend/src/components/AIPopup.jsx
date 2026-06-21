import { useState } from "react";

export default function AIPopup() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! I'm your MeetMode AI assistant." },
  ]);
  const [input, setInput] = useState("");

  const reply = (text) => {
    const t = text.toLowerCase();
    if (t.includes("event")) return "Next event is React Hyderabad Meetup.";
    if (t.includes("friend")) return "Open Friends page to find matches.";
    if (t.includes("chat")) return "Open Chat page to message people.";
    if (t.includes("profile")) return "Open Profile page to update your details.";
    return "I can help with events, friends, chat, QR, profile, and settings.";
  };

  const send = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", text: input },
      { role: "bot", text: reply(input) },
    ]);
    setInput("");
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          position: "fixed",
          right: 20,
          bottom: 20,
          width: 62,
          height: 62,
          borderRadius: "50%",
          border: "none",
          background: "#2f6df6",
          color: "white",
          fontSize: 26,
          cursor: "pointer",
          zIndex: 9999,
          boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
        }}
      >
        🤖
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            right: 20,
            bottom: 92,
            width: 340,
            height: 460,
            background: "#10192f",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 18,
            display: "flex",
            flexDirection: "column",
            zIndex: 9999,
            overflow: "hidden",
            boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
          }}
        >
          <div
            style={{
              padding: "14px 16px",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              color: "white",
              fontWeight: 800,
            }}
          >
            MeetMode AI
          </div>

          <div style={{ flex: 1, padding: 12, overflowY: "auto" }}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    maxWidth: "80%",
                    padding: "10px 12px",
                    borderRadius: 14,
                    background: m.role === "user" ? "#2f6df6" : "rgba(255,255,255,0.08)",
                    color: "white",
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 8, padding: 12, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask..."
              style={{
                flex: 1,
                padding: "10px 12px",
                borderRadius: 12,
                border: "none",
                outline: "none",
                background: "white",
              }}
            />
            <button
              onClick={send}
              style={{
                padding: "10px 14px",
                borderRadius: 12,
                border: "none",
                background: "#2f6df6",
                color: "white",
                cursor: "pointer",
                fontWeight: 700,
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
