import { useEffect, useState } from "react";
import { get, post } from "../api/client";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const load = async () => {
    const res = await get("/chat/global");
    setMessages(res.messages || []);
  };

  useEffect(() => { load(); }, []);

  const send = async () => {
    if (!text.trim()) return;
    await post("/chat/send", { room: "global", message: { text } });
    setText("");
    load();
  };

  return (
    <div>
      <h1 className="page-title">Chat</h1>
      <p className="page-subtitle">Global networking room for your event</p>

      <div className="message-shell">
        <div className="card message-list">
          <div className="section-title">Chats</div>
          <div className="soft">
            <div style={{ fontWeight: 800 }}>Global Room</div>
            <div className="muted">One shared conversation for the event</div>
          </div>
        </div>

        <div className="message-panel">
          <div className="card chat-board">
            {messages.map((m) => (
              <div key={m.id || `${m.user}-${m.time}`} className={`bubble ${m.mine ? "me" : ""}`}>
                <div style={{ fontWeight: 800, marginBottom: 6 }}>{m.user}</div>
                <div>{m.text}</div>
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
            <button className="btn" onClick={send}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
