import { useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useAuth } from "../context/AuthContext";

export default function QRNetwork() {
  const { user } = useAuth();
  const [copied, setCopied] = useState("");

  const value = useMemo(() => {
    const code = user?.eventCode || "EVT-HYD-2026";
    return `${window.location.origin}/events?code=${encodeURIComponent(code)}`;
  }, [user]);

  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied("Copied!");
    setTimeout(() => setCopied(""), 1200);
  };

  return (
    <div>
      <h1 className="page-title">QR Networking</h1>
      <p className="page-subtitle">Scan to join the event instantly</p>

      <div className="card" style={{ maxWidth: 760 }}>
        <div style={{ display: "grid", placeItems: "center", gap: 18 }}>
          <div style={{ width: 280, height: 280, display: "grid", placeItems: "center", background: "#fff", borderRadius: 18, padding: 16 }}>
            <QRCodeSVG value={value} size={240} />
          </div>
          <div className="empty-state" style={{ padding: 0 }}>Your MeetMode QR</div>
          <button className="btn" onClick={copy}>Copy Share Link</button>
          {copied ? <div className="empty-state">{copied}</div> : null}
        </div>
      </div>
    </div>
  );
}
