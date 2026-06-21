import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QRPage() {
  const [qr] = useState("https://meetmode.app/user/sachin");

  function scanQR() {
    alert("QR scan action connected");
  }

  return (
    <div>
      <h1 style={{ fontSize: "36px", marginBottom: "18px" }}>📱 QR Networking</h1>

      <div
        style={{
          background: "var(--card)",
          borderRadius: "16px",
          padding: "24px",
          maxWidth: "700px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "22px", marginBottom: "18px" }}>Your MeetMode QR</h2>

        <div style={{ background: "white", display: "inline-block", padding: "14px", borderRadius: "14px" }}>
          <QRCodeCanvas value={qr} size={200} />
        </div>

        <button
          onClick={scanQR}
          style={{
            display: "block",
            width: "100%",
            marginTop: "20px",
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "12px",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Scan QR
        </button>
      </div>
    </div>
  );
}
