import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { get, post, put } from "../api/client";

const AuthContext = createContext(null);
const THEME_KEY = "mm_theme";

function applyTheme(theme) {
  document.body.classList.toggle("light", theme === "light");
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [theme, setThemeState] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY) || "dark";
    setThemeState(savedTheme);
    applyTheme(savedTheme);

    const token = localStorage.getItem("mm_token");
    const savedUser = localStorage.getItem("mm_user");

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      get("/auth/me")
        .then((res) => {
          setUser(res.user);
          localStorage.setItem("mm_user", JSON.stringify(res.user));
        })
        .catch(() => {
          localStorage.removeItem("mm_token");
          localStorage.removeItem("mm_user");
          setUser(null);
        });
    }

    setReady(true);
  }, []);

  const setTheme = (next) => {
    setThemeState(next);
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  };

  const login = async (email, password) => {
    const res = await post("/auth/login", { email, password });
    localStorage.setItem("mm_token", res.token);
    localStorage.setItem("mm_user", JSON.stringify(res.user));
    setUser(res.user);
    return res.user;
  };

  const signup = async (payload) => {
    const res = await post("/auth/signup", payload);
    localStorage.setItem("mm_token", res.token);
    localStorage.setItem("mm_user", JSON.stringify(res.user));
    setUser(res.user);
    return res.user;
  };

  const logout = async () => {
    try {
      await post("/auth/logout", {});
    } catch {}
    localStorage.removeItem("mm_token");
    localStorage.removeItem("mm_user");
    setUser(null);
  };

  const updateProfile = async (payload) => {
    const res = await put("/user/me", payload);
    localStorage.setItem("mm_user", JSON.stringify(res.user));
    setUser(res.user);
    return res.user;
  };

  const value = useMemo(
    () => ({ user, ready, theme, setTheme, login, signup, logout, updateProfile }),
    [user, ready, theme]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
