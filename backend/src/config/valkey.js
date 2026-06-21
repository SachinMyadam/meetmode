const Redis = require("ioredis");

const valkey = new Redis({
  host: process.env.VALKEY_HOST || "127.0.0.1",
  port: Number(process.env.VALKEY_PORT || 6379),
});

valkey.on("connect", () => console.log("✅ Valkey connected"));
valkey.on("error", (err) => console.error("Valkey error:", err.message));

module.exports = valkey;
