const Redis = require("ioredis");

const redis = new Redis(process.env.REDIS_URL || process.env.VALKEY_URL);

redis.on("connect", () => {
  console.log("Redis connected successfully");
});

redis.on("error", (err) => {
  console.log("Redis error:", err.message);
});

module.exports = redis;
