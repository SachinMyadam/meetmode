import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("Sachin");
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("123456");
  const [city, setCity] = useState("Hyderabad");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup({ name, email, password, city });
      navigate("/");
    } catch (err) {
      setError(err.message || "Signup failed");
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 360, margin: "0 auto" }}>
      <h1>MeetMode Signup</h1>
      <form onSubmit={onSubmit}>
        <input style={{ width: "100%", marginBottom: 12, padding: 10 }} value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input style={{ width: "100%", marginBottom: 12, padding: 10 }} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input style={{ width: "100%", marginBottom: 12, padding: 10 }} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <input style={{ width: "100%", marginBottom: 12, padding: 10 }} value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
        {error ? <p style={{ color: "red" }}>{error}</p> : null}
        <button style={{ width: "100%", padding: 10 }} type="submit">
          Sign Up
        </button>
      </form>
      <p style={{ marginTop: 12 }}>
        Already have account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
