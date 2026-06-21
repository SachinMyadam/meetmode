import { useEffect } from "react";
import { get } from "../api/client";
import { useNavigate } from "react-router-dom";

export default function useAuthCheck(setUser) {
  const navigate = useNavigate();

  useEffect(() => {
    async function check() {
      try {
        const res = await get("/auth/me");
        setUser(res.user);
      } catch (err) {
        localStorage.removeItem("mm_token");
        navigate("/login");
      }
    }

    check();
  }, []);
}
