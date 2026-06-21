import { useEffect, useState } from "react";
import { get, post } from "../api/client";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const load = async () => {
    const res = await get("/chat/global");
    setMessages(res.messages || []);
  };

  useEffect(() => {
    load();
  }, []);

  const send = async () => {
    if (!text.trim()) return;
    await post("/chat/send", {
      room: "global",
      message: { text },
    });
    setText("");
    load();
  };

  return (
    <div>
      <h1 className="page-title">💬 Chat Page</h1>
      <p className="page-subtitle">People-to-people conversation</p>

      <div className="message-shell">
        <div className="card message-list">
          <h2 className="section-title" style={{ marginTop: 0 }}>
            Chats
          </h2>
          <div className="card soft">
            <div style={{ fontWeight: 800 }}>Global Room</div>
            <div className="empty-state" style={{ padding: "8px 0 0" }}>
              MeetMode group conversation
            </div>
          </div>
        </div>

        <div className="message-panel">
          <div className="chat-board">
            {messages.map((message) => (
              <div key={message.id || `${message.user}-${message.time}`} className={`bubble ${message.mine ? "me" : ""}`}>
                <div style={{ fontWeight: 800, marginBottom: 6 }}>{message.user}</div>
                <div>{message.text}</div>
              </div>
            ))}
          </div>

          <div className="chat-input-row">
            <input
              className="input"
              placeholder="Type message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <button className="btn" onClick={send}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
