import { useState } from "react";
import { setUserInterests, getUserProfile } from "../lib/userProfile";

export default function Interests() {
  const profile = getUserProfile();

  const [selected, setSelected] = useState(profile.interests || []);

  const options = ["React", "AI", "Python", "JavaScript", "Fitness", "Travel", "Coffee"];

  const toggle = (item) => {
    if (selected.includes(item)) {
      setSelected(selected.filter(i => i !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  const save = () => {
    setUserInterests(selected);
    alert("Interests saved!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🎯 Select Your Interests</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => toggle(opt)}
            style={{
              padding: "10px",
              background: selected.includes(opt) ? "#2563eb" : "#1e293b",
              color: "white",
              border: "none",
              borderRadius: "8px"
            }}
          >
            {opt}
          </button>
        ))}
      </div>

      <button
        onClick={save}
        style={{
          marginTop: "20px",
          padding: "10px 15px",
          background: "green",
          border: "none",
          color: "white",
          borderRadius: "8px"
        }}
      >
        Save Interests
      </button>
    </div>
  );
}
