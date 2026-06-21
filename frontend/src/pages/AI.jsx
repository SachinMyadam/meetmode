import { useState } from "react";
import { getAiReply } from "../lib/meetmodeAi";

export default function AIPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! I'm your MeetMode AI assistant." },
    { role: "assistant", text: "I can help with matching, events, and app guidance." },
  ]);

  function ask() {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", text },
      { role: "assistant", text: getAiReply(text) },
    ]);
    setInput("");
  }

  return (
    <div>
      <h1 style={{ fontSize: "30px", marginBottom: "14px" }}>🤖 AI Assistant</h1>

      <div
        style={{
          background: "var(--card)",
          borderRadius: "16px",
          padding: "16px",
          minHeight: "500px",
          display: "flex",
          flexDirection: "column",
          border: "1px solid var(--border)",
        }}
      >
        <div style={{ flex: 1, display: "grid", gap: "10px", alignContent: "start" }}>
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                maxWidth: m.role === "user" ? "70%" : "78%",
                justifySelf: m.role === "user" ? "end" : "start",
                padding: "10px 12px",
                borderRadius: "12px",
                background: m.role === "user" ? "#2563eb" : "#2b3a73",
                fontSize: "14px",
                lineHeight: 1.35,
              }}
            >
              {m.text}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "14px" }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && ask()}
            placeholder="Ask MeetMode AI..."
            style={{
              flex: 1,
              padding: "12px 14px",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,.12)",
              background: "var(--card-2)",
              color: "white",
              fontSize: "14px",
            }}
          />
          <button
            onClick={ask}
            style={{
              border: "none",
              background: "#2563eb",
              color: "white",
              padding: "12px 18px",
              borderRadius: "10px",
              fontWeight: 700,
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Ask AI
          </button>
        </div>
      </div>
    </div>
  );
}
