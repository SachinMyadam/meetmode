import { useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useAuth } from "../context/AuthContext";

export default function QRNetwork() {
  const { user } = useAuth();
  const [copied, setCopied] = useState("");

  const value = useMemo(() => {
    const ref = user?.id || "meetmode";
    return `${window.location.origin}/signup?ref=${ref}`;
  }, [user]);

  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied("Copied!");
    setTimeout(() => setCopied(""), 1200);
  };

  return (
    <div>
      <h1 className="page-title">📱 QR Networking</h1>
      <p className="page-subtitle">Scan to join and connect</p>

      <div className="card" style={{ maxWidth: 900 }}>
        <div style={{ display: "grid", placeItems: "center", gap: 18 }}>

          {/* FIXED QR WRAPPER */}
          <div
            style={{
              width: 280,
              height: 280,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#fff",
              borderRadius: 18,
              padding: 16,
              overflow: "hidden",
            }}
          >
            <QRCodeSVG
              value={value}
              size={240}
            />
          </div>

          <div className="empty-state" style={{ padding: 0 }}>
            Your MeetMode QR
          </div>

          <button className="btn" onClick={copy}>
            Copy Share Link
          </button>

          {copied ? <div className="empty-state">{copied}</div> : null}
        </div>
      </div>
    </div>
  );
}
