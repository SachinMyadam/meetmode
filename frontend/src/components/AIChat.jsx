import { useState } from "react";

function AIChat({ onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: "AI",
      text: "👋 Hi Sachin! I'm your MeetMode AI assistant.",
    },
  ]);

  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input.trim()) return;

    const question = input;

    setMessages((prev) => [
      ...prev,
      {
        sender: "You",
        text: question,
      },
    ]);

    setInput("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/ai/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: question,
          }),
        }
      );

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "AI",
          text: data.reply,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "AI",
          text: "❌ Backend connection failed.",
        },
      ]);
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        right: "30px",
        bottom: "110px",
        width: "420px",
        background: "#172554",
        color: "white",
        borderRadius: "18px",
        padding: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,.35)",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <h2 style={{ margin: 0 }}>🤖 MeetMode AI</h2>

        <button
          onClick={onClose}
          style={{
            background: "transparent",
            color: "white",
            border: "none",
            fontSize: "28px",
            cursor: "pointer",
          }}
        >
          ✕
        </button>
      </div>

      <div
        style={{
          height: "280px",
          overflowY: "auto",
          marginBottom: "15px",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              background:
                msg.sender === "AI" ? "#1e3a8a" : "#2563eb",
              padding: "10px",
              borderRadius: "10px",
              marginBottom: "10px",
              whiteSpace: "pre-wrap",
            }}
          >
            <b>{msg.sender}</b>
            <br />
            {msg.text}
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          placeholder="Ask AI..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "10px",
            border: "none",
          }}
        />

        <button
          onClick={sendMessage}
          style={{
            background: "linear-gradient(90deg,#2563eb,#4f46e5)",
fontWeight: "600",
letterSpacing: ".3px",
            color: "white",
            border: "none",
            borderRadius: "10px",
            padding: "10px 18px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default AIChat;
