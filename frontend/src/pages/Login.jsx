import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(form);
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="page" style={{ placeItems: "center", minHeight: "100vh", padding: 20 }}>
      <div className="card" style={{ width: "100%", maxWidth: 460 }}>
        <h1 className="page-title">MeetMode Login</h1>
        <p className="page-subtitle">Enter the event-first networking space</p>
        <form onSubmit={submit} className="form-grid" style={{ gridTemplateColumns: "1fr", gap: 12 }}>
          <input className="input" placeholder="Email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} />
          <input className="input" placeholder="Password" type="password" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} />
          {error ? <div className="empty-state" style={{ color: "#fb7185" }}>{error}</div> : null}
          <button className="btn" type="submit">Login</button>
        </form>
        <p className="muted" style={{ marginTop: 12 }}>
          No account? <Link to="/signup"><b>Sign up</b></Link>
        </p>
      </div>
    </div>
  );
}
