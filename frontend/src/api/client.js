const RAW_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5055";
const BASE_URL = RAW_BASE_URL.replace(/\/$/, "");
const API_BASE_URL = BASE_URL.endsWith("/api") ? BASE_URL : `${BASE_URL}/api`;

async function request(path, options = {}) {
  const token = localStorage.getItem("mm_token");

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export const get = (p) => request(p);
export const post = (p, b) => request(p, { method: "POST", body: b });
export const put = (p, b) => request(p, { method: "PUT", body: b });
