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
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5181"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/events", eventsRoutes);
app.use("/chat", chatRoutes);
app.use("/notifications", notificationsRoutes);

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

const port = process.env.PORT || 5055;
app.listen(port, () => {
  console.log(`🚀 MeetMode backend running on port ${port}`);
});
