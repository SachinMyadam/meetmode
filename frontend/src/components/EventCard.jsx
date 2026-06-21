function EventCard({
  id,
  title,
  location,
  date,
}) {
  async function register() {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/event/register/${id ?? 1}`,
        {
          method: "POST",
        }
      );

      const data = await res.json();

      alert(data.message || "Registered!");
    } catch {
      alert("Unable to register.");
    }
  }

  return (
    <div
      style={{
        background: "rgba(30,41,59,.75)",
backdropFilter: "blur(14px)",
border: "1px solid rgba(255,255,255,.08)",
boxShadow: "0 15px 40px rgba(0,0,0,.25)",
        padding: "22px",
        borderRadius: "18px",
        marginBottom: "20px",
      }}
    >
      <h2>{title}</h2>

      <p>📍 {location}</p>

      <p>📅 {date}</p>

      <button
        onClick={register}
        style={{
          marginTop: "15px",
          background: "linear-gradient(90deg,#2563eb,#4f46e5)",
fontWeight: "600",
letterSpacing: ".3px",
          color: "white",
          border: "none",
          padding: "12px 20px",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Register
      </button>
    </div>
  );
}

export default EventCard;
