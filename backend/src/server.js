const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const eventsRoutes = require("./routes/events");
const chatRoutes = require("./routes/chat");
const notificationsRoutes = require("./routes/notifications");

const app = express();

const corsOptions = {
  origin: "https://meetmode.vercel.app",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/events", eventsRoutes);
app.use("/chat", chatRoutes);
app.use("/notifications", notificationsRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`MeetMode backend running on ${port}`));
