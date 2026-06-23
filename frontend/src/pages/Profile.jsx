import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    name: "",
    profession: "",
    company: "",
    city: "",
    skills: "",
    interests: "",
    networkingGoal: "",
  });
  const [saved, setSaved] = useState("");

  useEffect(() => {
    setForm({
      name: user?.name || "",
      profession: user?.profession || "",
      company: user?.company || "",
      city: user?.city || "",
      skills: (user?.skills || []).join(", "),
      interests: (user?.interests || []).join(", "),
      networkingGoal: user?.networkingGoal || "",
    });
  }, [user]);

  const save = async () => {
    const next = await updateProfile({
      ...form,
      skills: form.skills.split(",").map((v) => v.trim()).filter(Boolean),
      interests: form.interests.split(",").map((v) => v.trim()).filter(Boolean),
    });
    setSaved(`Saved for ${next.name}`);
    setTimeout(() => setSaved(""), 1500);
  };

  return (
    <div>
      <h1 className="page-title">Profile</h1>
      <p className="page-subtitle">Edit your public networking profile</p>

      <div className="card">
        <div className="form-grid">
          <div className="form-group"><label>Name</label><input className="input" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} /></div>
          <div className="form-group"><label>Profession</label><input className="input" value={form.profession} onChange={(e)=>setForm({...form,profession:e.target.value})} /></div>
          <div className="form-group"><label>Company / College</label><input className="input" value={form.company} onChange={(e)=>setForm({...form,company:e.target.value})} /></div>
          <div className="form-group"><label>City</label><input className="input" value={form.city} onChange={(e)=>setForm({...form,city:e.target.value})} /></div>
          <div className="form-group"><label>Skills</label><input className="input" value={form.skills} onChange={(e)=>setForm({...form,skills:e.target.value})} /></div>
          <div className="form-group"><label>Interests</label><input className="input" value={form.interests} onChange={(e)=>setForm({...form,interests:e.target.value})} /></div>
          <div className="form-group" style={{ gridColumn: "1 / -1" }}><label>Networking Goal</label><input className="input" value={form.networkingGoal} onChange={(e)=>setForm({...form,networkingGoal:e.target.value})} /></div>
        </div>

        <div className="form-actions">
          <button className="btn" onClick={save}>Save Profile</button>
        </div>

        {saved ? <div className="empty-state" style={{ marginTop: 14 }}>{saved}</div> : null}
      </div>
    </div>
  );
}
