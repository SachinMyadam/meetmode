import { useState } from "react";
import { getAiReply } from "../lib/meetmodeAi";

export default function AIPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! I’m your MeetMode AI assistant." },
    { role: "assistant", text: "I can help with matching, events, QR, and networking." },
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
      <h1 className="page-title">AI Assistant</h1>
      <p className="page-subtitle">Ask about events, matches, QR, or Meet Mode</p>

      <div className="card" style={{ minHeight: 500, display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1, display: "grid", gap: 10, alignContent: "start" }}>
          {messages.map((m, i) => (
            <div key={i} className={`bubble ${m.role === "user" ? "me" : ""}`}>
              <div style={{ fontWeight: 800, marginBottom: 6 }}>{m.role === "user" ? "You" : "MeetMode AI"}</div>
              <div>{m.text}</div>
            </div>
          ))}
        </div>

        <div className="chat-input-row">
          <input className="input" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && ask()} placeholder="Ask MeetMode AI..." />
          <button className="btn" onClick={ask}>Ask AI</button>
        </div>
      </div>
    </div>
  );
}
