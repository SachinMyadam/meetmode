import { useState } from "react";

function replyFor(text) {
  const t = text.toLowerCase();
  if (t.includes("event")) return "Next event is React Hyderabad Meetup on 28 June.";
  if (t.includes("friend")) return "Open Friends page to search by city and skill.";
  if (t.includes("qr")) return "Use QR Network page to share your MeetMode link.";
  if (t.includes("settings")) return "Use Settings to switch theme and logout.";
  return "I can help with matching, events, QR, profile, settings, and app guidance.";
}

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { id: 1, user: "MeetMode AI", text: "Hi! I'm your MeetMode AI assistant." },
    { id: 2, user: "MeetMode AI", text: "I can help with matching, events, and app guidance." },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const next = [
      ...messages,
      { id: Date.now(), user: "You", text: input },
      { id: Date.now() + 1, user: "MeetMode AI", text: replyFor(input) },
    ];
    setMessages(next);
    setInput("");
  };

  return (
    <div>
      <h1 className="page-title">🤖 AI Assistant</h1>
      <p className="page-subtitle">Separate assistant page</p>

      <div className="card">
        <div className="chat-board" style={{ minHeight: 520 }}>
          {messages.map((message) => (
            <div key={message.id} className={`bubble ${message.user === "You" ? "me" : ""}`}>
              <div style={{ fontWeight: 800, marginBottom: 6 }}>{message.user}</div>
              <div>{message.text}</div>
            </div>
          ))}
        </div>

        <div className="chat-input-row">
          <input
            className="input"
            placeholder="Ask..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
          />
          <button className="btn" onClick={send}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
