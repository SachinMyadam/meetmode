import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("loggedIn");
    navigate("/login");
  }

  return (
    <button onClick={logout}>
      Logout
    </button>
  );
}
