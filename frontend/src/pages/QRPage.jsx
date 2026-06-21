import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";


function QRPage() {
  const [qr, setQr] = useState("");

  useEffect(() => {
    fetch(
      "http://127.0.0.1:8000/qr/generate",
      {
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setQr(data.qr_code || "");
      });
  }, []);

  async function scanQR() {
    const code = prompt("Paste QR Code");

    if (!code) return;

    const res = await fetch(
      "http://127.0.0.1:8000/qr/scan",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          qr_code: code,
        }),
      }
    );

    const data = await res.json();

    alert(data.message || "Connected Successfully");
  }

  return (
    <div style={{ background:"#020617", minHeight:"100vh", color:"white" }}>

      <div style={{ display:"flex" }}>

        <div style={{ flex:1, padding:"40px" }}>
          <h1>📱 QR Networking</h1>

          <div
            style={{
              background:"#1e293b",
              padding:"40px",
              borderRadius:"18px",
              maxWidth:"600px",
              margin:"40px auto",
              textAlign:"center"
            }}
          >
            <div
              style={{
                background:"white",
                display:"inline-block",
                padding:"20px",
                borderRadius:"12px"
              }}
            >
              {qr && (
                <QRCodeCanvas
                  value={qr}
                  size={220}
                />
              )}
            </div>

            <button
              onClick={scanQR}
              style={{
                display:"block",
                width:"100%",
                marginTop:"30px",
                padding:"14px",
                background:"#2563eb",
                color:"white",
                border:"none",
                borderRadius:"10px",
                cursor:"pointer"
              }}
            >
              Scan QR
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default QRPage;
