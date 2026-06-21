import axios from "axios";
import { setSession } from "./auth";

export const login = async (email, password) => {
  const res = await axios.post("http://localhost:5000/login", {
    email,
    password,
  });

  setSession(res.data);
};
