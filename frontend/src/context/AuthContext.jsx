import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { get, post } from "../api/client";

const AuthContext = createContext({
  user: null,
  loading: false,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
  refreshUser: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const refreshUser = async () => {
    const token = localStorage.getItem("mm_token");

    if (!token) {
      setUser(null);
      setLoading(false);
      return null;
    }

    setLoading(true);
    try {
      const data = await get("/auth/me");
      const nextUser = data?.user || null;
      setUser(nextUser);
      return nextUser;
    } catch {
      localStorage.removeItem("mm_token");
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async ({ email, password }) => {
    const data = await post("/auth/login", { email, password });
    localStorage.setItem("mm_token", data.token);
    setUser(data.user || null);
    return data;
  };

  const signup = async (payload) => {
    const data = await post("/auth/signup", payload);
    localStorage.setItem("mm_token", data.token);
    setUser(data.user || null);
    return data;
  };

  const logout = async () => {
    try {
      await post("/auth/logout", {});
    } catch {}
    localStorage.removeItem("mm_token");
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, loading, login, signup, logout, refreshUser }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
