function StatsCard({ title, value, icon, color }) {
  return (
    <div
      style={{
        background: "rgba(30,41,59,.75)",
backdropFilter: "blur(14px)",
border: "1px solid rgba(255,255,255,.08)",
boxShadow: "0 15px 40px rgba(0,0,0,.25)",
        padding: "25px",
        borderRadius: "18px",
        color: "white",
        borderLeft: `6px solid ${color}`,
        boxShadow: "0 8px 20px rgba(0,0,0,.25)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <p
            style={{
              color: "#94a3b8",
              margin: 0,
            }}
          >
            {title}
          </p>

          <h2
            style={{
              marginTop: "10px",
              fontSize: "34px",
            }}
          >
            {value}
          </h2>
        </div>

        <div
          style={{
            fontSize: "34px",
            color: color,
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
