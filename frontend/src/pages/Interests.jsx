import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Interests() {
  const { user, updateProfile } = useAuth();
  const [selected, setSelected] = useState(user?.interests || []);
  const options = ["React", "AI", "Python", "JavaScript", "Fitness", "Travel", "Coffee", "Open Source", "Startups"];

  const toggle = (item) => {
    if (selected.includes(item)) setSelected(selected.filter((i) => i !== item));
    else setSelected([...selected, item]);
  };

  const save = async () => {
    await updateProfile({ interests: selected });
    alert("Interests saved!");
  };

  return (
    <div>
      <h1 className="page-title">Interests</h1>
      <p className="page-subtitle">Pick the topics Breeth AI should remember</p>

      <div className="card">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => toggle(opt)}
              className="chip"
              style={{
                background: selected.includes(opt) ? "linear-gradient(135deg, rgba(91,140,255,.30), rgba(124,92,255,.24))" : "var(--panel)",
                borderColor: selected.includes(opt) ? "rgba(91,140,255,.45)" : "var(--border)",
              }}
            >
              {opt}
            </button>
          ))}
        </div>

        <button className="btn" onClick={save} style={{ marginTop: 16 }}>Save Interests</button>
      </div>
    </div>
  );
}
