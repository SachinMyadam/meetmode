const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const eventsRoutes = require("./routes/events");
const chatRoutes = require("./routes/chat");
const notificationsRoutes = require("./routes/notifications");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://meetmode.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

/* ✅ FIXED API PREFIX */
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/notifications", notificationsRoutes);

/* 404 */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`MeetMode backend running on ${port}`);
});
