import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [interests, setInterests] = useState("");
  const [saved, setSaved] = useState("");

  useEffect(() => {
    setName(user?.name || "");
    setCity(user?.city || "");
    setInterests((user?.interests || []).join(", "));
  }, [user]);

  const save = async () => {
    const next = await updateProfile({
      name,
      city,
      interests: interests.split(",").map((v) => v.trim()).filter(Boolean),
    });
    setSaved(`Saved for ${next.name}`);
    setTimeout(() => setSaved(""), 1500);
  };

  return (
    <div>
      <h1 className="page-title">👤 Profile</h1>
      <p className="page-subtitle">Edit your public profile</p>

      <div className="card profile-card">
        <h2 className="section-title" style={{ marginTop: 0 }}>
          {user?.name || "No Name"}
        </h2>

        <div className="empty-state" style={{ padding: 0 }}>
          <b>Email:</b> {user?.email || "Not available"}
        </div>
        <div className="empty-state" style={{ padding: "8px 0 0" }}>
          <b>User ID:</b> {user?.id || "N/A"}
        </div>

        <div style={{ marginTop: 22 }}>
          <div className="form-group">
            <label>Name</label>
            <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="form-group">
            <label>City</label>
            <input className="input" value={city} onChange={(e) => setCity(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Interests</label>
            <input className="input" value={interests} onChange={(e) => setInterests(e.target.value)} />
          </div>

          <button className="btn" onClick={save}>
            Save Profile
          </button>

          {saved ? (
            <div className="empty-state" style={{ paddingTop: 12 }}>
              {saved}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
