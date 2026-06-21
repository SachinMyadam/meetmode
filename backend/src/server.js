const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const eventsRoutes = require("./routes/events");
const chatRoutes = require("./routes/chat");
const notificationsRoutes = require("./routes/notifications");

const app = express();

/* ✅ CLEAN CORS CONFIG (ONLY ONCE) */
app.use(cors({
  origin: "https://meetmode.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/events", eventsRoutes);
app.use("/chat", chatRoutes);
app.use("/notifications", notificationsRoutes);

/* 404 HANDLER (SAFE - NO *) */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`MeetMode backend running on ${port}`);
});
