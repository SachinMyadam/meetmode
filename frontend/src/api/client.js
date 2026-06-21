const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5055";

async function request(path, options = {}) {
  const token = localStorage.getItem("mm_token");

  const res = await fetch(`${BASE_URL}${path}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || `HTTP Error ${res.status}`);
  }

  return data;
}

export const get = (path) => request(path);
export const post = (path, body) => request(path, { method: "POST", body });
export const put = (path, body) => request(path, { method: "PUT", body });
