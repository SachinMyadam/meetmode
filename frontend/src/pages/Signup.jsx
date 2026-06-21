import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [name, setName] = useState("Sachin");
  const [email, setEmail] = useState("sachin123@test.com");
  const [password, setPassword] = useState("123456");
  const [city, setCity] = useState("Hyderabad");
  const [interests, setInterests] = useState("AI, Valkey, Hackathons");
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup({
        name,
        email,
        password,
        city,
        interests: interests.split(",").map((v) => v.trim()).filter(Boolean),
      });
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-title">✨ Sign Up</div>
        <div className="auth-subtitle">Create Account</div>

        <form onSubmit={submit}>
          <div className="form-group">
            <label>Name</label>
            <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>City</label>
            <input className="input" value={city} onChange={(e) => setCity(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Interests</label>
            <input className="input" value={interests} onChange={(e) => setInterests(e.target.value)} />
          </div>

          {error ? <div className="empty-state" style={{ color: "#ff6b6b" }}>{error}</div> : null}

          <button className="btn" style={{ width: "100%" }} type="submit">
            Sign Up
          </button>
        </form>

        <div className="form-actions" style={{ marginTop: 18 }}>
          <span className="empty-state" style={{ padding: 0 }}>
            Already have account?
          </span>
          <Link className="auth-link" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
