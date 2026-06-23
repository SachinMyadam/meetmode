import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    profession: "",
    company: "",
    city: "",
    skills: "",
    interests: "",
    networkingGoal: "",
  });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup({
        ...form,
        skills: form.skills.split(",").map(v => v.trim()).filter(Boolean),
        interests: form.interests.split(",").map(v => v.trim()).filter(Boolean),
      });
      navigate("/");
    } catch (err) {
      setError(err.message || "Signup failed");
    }
  };

  return (
    <div className="page" style={{ placeItems: "center", minHeight: "100vh", padding: 20 }}>
      <div className="card" style={{ width: "100%", maxWidth: 760 }}>
        <h1 className="page-title">Create MeetMode Account</h1>
        <p className="page-subtitle">Profile first, privacy first, event first</p>

        <form onSubmit={submit} className="form-grid">
          <div className="form-group"><label>Name</label><input className="input" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} /></div>
          <div className="form-group"><label>Email</label><input className="input" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} /></div>
          <div className="form-group"><label>Password</label><input className="input" type="password" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} /></div>
          <div className="form-group"><label>Profession</label><input className="input" value={form.profession} onChange={(e)=>setForm({...form,profession:e.target.value})} /></div>
          <div className="form-group"><label>Company / College</label><input className="input" value={form.company} onChange={(e)=>setForm({...form,company:e.target.value})} /></div>
          <div className="form-group"><label>City</label><input className="input" value={form.city} onChange={(e)=>setForm({...form,city:e.target.value})} /></div>
          <div className="form-group"><label>Skills</label><input className="input" placeholder="React, Python, SQL" value={form.skills} onChange={(e)=>setForm({...form,skills:e.target.value})} /></div>
          <div className="form-group"><label>Interests</label><input className="input" placeholder="AI, Open Source, Startups" value={form.interests} onChange={(e)=>setForm({...form,interests:e.target.value})} /></div>
          <div className="form-group" style={{ gridColumn: "1 / -1" }}><label>Networking Goal</label><input className="input" placeholder="Hire, learn, collaborate, mentor..." value={form.networkingGoal} onChange={(e)=>setForm({...form,networkingGoal:e.target.value})} /></div>
          {error ? <div className="empty-state" style={{ gridColumn: "1 / -1", color: "#fb7185" }}>{error}</div> : null}
          <button className="btn" type="submit">Create Account</button>
        </form>

        <p className="muted" style={{ marginTop: 12 }}>
          Already have account? <Link to="/login"><b>Login</b></Link>
        </p>
      </div>
    </div>
  );
}
