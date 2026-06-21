import { post } from "../api/client";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  async function handleLogin() {
    const res = await post("/auth/login", {
      email,
      password
    });

    localStorage.setItem("mm_token", res.token);
    navigate("/home");
  }

  return null;
}
