import { logout } from "./auth";

export const LogoutBtn = () => {
  return <button onClick={logout}>Logout</button>;
};
