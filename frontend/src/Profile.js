import { getUser } from "./auth";

export default function Profile() {
  const user = getUser();

  return (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  );
}
