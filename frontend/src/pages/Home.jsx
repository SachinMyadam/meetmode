import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: 24 }}>
      <h1>MeetMode</h1>
      <p>{user ? `Welcome, ${user.name}` : "Welcome"}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
