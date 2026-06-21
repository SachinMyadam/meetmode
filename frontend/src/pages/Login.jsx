import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("sachin@test.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-title">🔐 Login</div>
        <div className="auth-subtitle">Welcome Back</div>

        <form onSubmit={submit}>
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

          {error ? <div className="empty-state" style={{ color: "#ff6b6b" }}>{error}</div> : null}

          <button className="btn" style={{ width: "100%" }} type="submit">
            Login
          </button>
        </form>

        <div className="form-actions" style={{ marginTop: 18 }}>
          <span className="empty-state" style={{ padding: 0 }}>
            New user?
          </span>
          <Link className="auth-link" to="/signup">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}
