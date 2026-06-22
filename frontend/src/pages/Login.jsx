import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login({ email, password });
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 360, margin: "0 auto" }}>
      <h1>MeetMode Login</h1>
      <form onSubmit={onSubmit}>
        <input
          style={{ width: "100%", marginBottom: 12, padding: 10 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          style={{ width: "100%", marginBottom: 12, padding: 10 }}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {error ? <p style={{ color: "red" }}>{error}</p> : null}
        <button style={{ width: "100%", padding: 10 }} type="submit">
          Login
        </button>
      </form>
      <p style={{ marginTop: 12 }}>
        New user? <Link to="/signup">Create account</Link>
      </p>
    </div>
  );
}
