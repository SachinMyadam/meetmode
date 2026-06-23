const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || "meetmode_secret_key";
const PORT = process.env.PORT || 5055;
const DB_FILE = path.join(__dirname, "..", "data", "db.json");

fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });

function seedDB() {
  if (fs.existsSync(DB_FILE)) return;

  const hash = bcrypt.hashSync("demo123", 10);
  const now = new Date().toISOString();

  const db = {
    users: [
      {
        id: "u_neha",
        name: "Neha Gupta",
        email: "neha@example.com",
        password: hash,
        profession: "Software Engineer",
        company: "Open Source",
        city: "Hyderabad",
        skills: ["Python", "Oracle", "AI"],
        interests: ["AI", "Open Source", "Startups"],
        networkingGoal: "Collaborate and mentor",
        eventId: "e_hyd",
        mode: "meet",
        createdAt: now,
      },
      {
        id: "u_rahul",
        name: "Rahul Sharma",
        email: "rahul@example.com",
        password: hash,
        profession: "Data Analyst",
        company: "Valkey Labs",
        city: "Hyderabad",
        skills: ["Python", "AI"],
        interests: ["Networking", "Data", "AI"],
        networkingGoal: "Find startup ideas",
        eventId: "e_hyd",
        mode: "meet",
        createdAt: now,
      },
      {
        id: "u_arjun",
        name: "Arjun Kumar",
        email: "arjun@example.com",
        password: hash,
        profession: "Full Stack Developer",
        company: "Amazon",
        city: "Bangalore",
        skills: ["React", "Node", "AI"],
        interests: ["Open Source", "Hackathons"],
        networkingGoal: "Build products with teams",
        eventId: "e_hyd",
        mode: "meet",
        createdAt: now,
      },
    ],
    events: [
      { id: "e_hyd", title: "React Hyderabad Meetup", city: "Hyderabad", venue: "Amazon HYD13", date: "28 June 2026", code: "EVT-HYD-2026", attendees: 1248 },
      { id: "e_valkey", title: "Valkey Workshop", city: "Hyderabad", venue: "Amazon HYD13", date: "30 June 2026", code: "VALKEY-2026", attendees: 312 },
      { id: "e_startup", title: "Startup Networking Night", city: "Bangalore", venue: "Community Hub", date: "5 July 2026", code: "STARTUP-2026", attendees: 510 },
    ],
    messages: [
      { id: 1, room: "global", user: "MeetMode AI", text: "Welcome to the event room.", time: now },
      { id: 2, room: "global", user: "MeetMode AI", text: "Turn on Meet Mode to be discoverable.", time: now },
    ],
    notifications: [],
  };

  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

function loadDB() {
  seedDB();
  return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
}

function saveDB(db) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

function pubUser(u) {
  const { password, ...rest } = u;
  return rest;
}

function signToken(user) {
  return jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
}

function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const db = loadDB();
    const user = db.users.find((u) => u.id === payload.id);
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    req.user = user;
    req.db = db;
    next();
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

function scoreMatch(user, other) {
  const a = new Set([...(user.skills || []), ...(user.interests || []), user.networkingGoal || ""]);
  const b = new Set([...(other.skills || []), ...(other.interests || []), other.networkingGoal || ""]);
  let score = 40;
  for (const item of a) if (b.has(item)) score += 10;
  if ((user.city || "").toLowerCase() === (other.city || "").toLowerCase()) score += 8;
  if ((user.profession || "").toLowerCase() === (other.profession || "").toLowerCase()) score += 4;
  return Math.min(98, score);
}

function buildStarter(other) {
  const keywords = [other.skills?.[0], other.interests?.[0]].filter(Boolean);
  if (keywords.length >= 2) return `You both are into ${keywords[0]} and ${keywords[1]}. Ask how they got started.`;
  if (keywords.length === 1) return `Ask how they started learning ${keywords[0]}.`;
  return "Ask what brought them to the event today.";
}

function visibleMatches(db, currentUser) {
  const sameEvent = db.users.filter(
    (u) => u.id !== currentUser.id && u.eventId && u.eventId === currentUser.eventId && u.mode === "meet"
  );

  const source = currentUser.eventId ? sameEvent : [];
  return source
    .map((u) => ({
      ...pubUser(u),
      match: scoreMatch(currentUser, u),
      starter: buildStarter(u),
    }))
    .sort((a, b) => b.match - a.match)
    .slice(0, 8);
}

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (origin === "http://localhost:5173" || origin === "http://127.0.0.1:5173") return callback(null, true);
    if (origin.endsWith(".vercel.app")) return callback(null, true);
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));

app.post("/api/auth/signup", (req, res) => {
  const db = loadDB();
  const {
    name,
    email,
    password,
    profession = "",
    company = "",
    city = "",
    skills = [],
    interests = [],
    networkingGoal = "",
  } = req.body || {};

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }

  if (db.users.some((u) => u.email.toLowerCase() === String(email).toLowerCase())) {
    return res.status(409).json({ message: "Email already exists" });
  }

  const user = {
    id: `u_${Date.now()}`,
    name,
    email,
    password: bcrypt.hashSync(password, 10),
    profession,
    company,
    city,
    skills,
    interests,
    networkingGoal,
    eventId: null,
    eventCode: null,
    mode: "focus",
    createdAt: new Date().toISOString(),
  };

  db.users.push(user);
  db.notifications.push({
    id: `n_${Date.now()}`,
    userId: user.id,
    title: "Welcome to MeetMode",
    body: "Create your profile and join an event to start networking.",
    createdAt: new Date().toISOString(),
  });
  saveDB(db);

  return res.json({ token: signToken(user), user: pubUser(user) });
});

app.post("/api/auth/login", (req, res) => {
  const db = loadDB();
  const { email, password } = req.body || {};
  const user = db.users.find((u) => u.email.toLowerCase() === String(email || "").toLowerCase());

  if (!user || !bcrypt.compareSync(password || "", user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  return res.json({ token: signToken(user), user: pubUser(user) });
});

app.get("/api/auth/me", auth, (req, res) => {
  const db = loadDB();
  const me = db.users.find((u) => u.id === req.user.id);
  res.json({ user: pubUser(me) });
});

app.post("/api/auth/logout", (req, res) => res.json({ ok: true }));

app.put("/api/user/profile", auth, (req, res) => {
  const db = loadDB();
  const me = db.users.find((u) => u.id === req.user.id);
  if (!me) return res.status(404).json({ message: "User not found" });

  const fields = ["name", "profession", "company", "city", "skills", "interests", "networkingGoal"];
  for (const field of fields) {
    if (req.body[field] !== undefined) me[field] = req.body[field];
  }

  saveDB(db);
  res.json({ user: pubUser(me) });
});

app.post("/api/mode/toggle", auth, (req, res) => {
  const db = loadDB();
  const me = db.users.find((u) => u.id === req.user.id);
  if (!me) return res.status(404).json({ message: "User not found" });

  me.mode = req.body?.mode === "meet" ? "meet" : "focus";
  db.notifications.push({
    id: `n_${Date.now()}`,
    userId: me.id,
    title: "Meet Mode updated",
    body: `Your status is now ${me.mode === "meet" ? "Meet Mode" : "Focus Mode"}.`,
    createdAt: new Date().toISOString(),
  });
  saveDB(db);
  res.json({ user: pubUser(me) });
});

app.get("/api/events", auth, (req, res) => {
  const db = loadDB();
  const me = db.users.find((u) => u.id === req.user.id);
  const events = db.events.map((event) => ({
    ...event,
    joined: me?.eventId === event.id,
  }));
  res.json({ events });
});

app.post("/api/events/:id/join", auth, (req, res) => {
  const db = loadDB();
  const event = db.events.find((e) => e.id === req.params.id);
  const me = db.users.find((u) => u.id === req.user.id);

  if (!event) return res.status(404).json({ message: "Event not found" });
  if (!me) return res.status(404).json({ message: "User not found" });

  me.eventId = event.id;
  me.eventCode = event.code;
  me.mode = "meet";

  db.notifications.push({
    id: `n_${Date.now()}`,
    userId: me.id,
    title: "Event joined",
    body: `You joined ${event.title}. Meet Mode is enabled.`,
    createdAt: new Date().toISOString(),
  });

  saveDB(db);
  res.json({ ok: true, event, user: pubUser(me) });
});

app.post("/api/qr/join", auth, (req, res) => {
  const db = loadDB();
  const code = String(req.body?.code || "").trim().toUpperCase();
  const event = db.events.find((e) => e.code.toUpperCase() === code);
  if (!event) return res.status(404).json({ message: "Invalid QR code" });

  const me = db.users.find((u) => u.id === req.user.id);
  me.eventId = event.id;
  me.eventCode = event.code;
  me.mode = "meet";

  db.notifications.push({
    id: `n_${Date.now()}`,
    userId: me.id,
    title: "QR check-in successful",
    body: `You checked into ${event.title}.`,
    createdAt: new Date().toISOString(),
  });

  saveDB(db);
  res.json({ message: `Joined ${event.title}`, event, user: pubUser(me) });
});

app.get("/api/user/friends", auth, (req, res) => {
  const db = loadDB();
  const me = db.users.find((u) => u.id === req.user.id);
  const q = String(req.query.q || "").toLowerCase();

  const friends = visibleMatches(db, me).filter((u) => {
    if (!q) return true;
    const blob = [
      u.name,
      u.city,
      u.profession,
      ...(u.skills || []),
      ...(u.interests || []),
      u.networkingGoal,
    ].join(" ").toLowerCase();
    return blob.includes(q);
  });

  res.json({ friends });
});

app.get("/api/recommendations", auth, (req, res) => {
  const db = loadDB();
  const me = db.users.find((u) => u.id === req.user.id);
  const matches = visibleMatches(db, me);
  res.json({ matches });
});

app.get("/api/chat/global", auth, (req, res) => {
  const db = loadDB();
  const messages = db.messages
    .filter((m) => m.room === "global")
    .map((m) => ({ id: m.id, user: m.user, text: m.text, time: m.time, mine: m.userId === req.user.id }));
  res.json({ messages });
});

app.post("/api/chat/send", auth, (req, res) => {
  const db = loadDB();
  const text = String(req.body?.message?.text || "").trim();
  if (!text) return res.status(400).json({ message: "Message is required" });

  const me = db.users.find((u) => u.id === req.user.id);
  db.messages.push({
    id: Date.now(),
    room: "global",
    userId: me.id,
    user: me.name,
    text,
    time: new Date().toISOString(),
  });
  saveDB(db);
  res.json({ ok: true });
});

app.get("/api/notifications", auth, (req, res) => {
  const db = loadDB();
  const items = db.notifications
    .filter((n) => n.userId === req.user.id || !n.userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json({ notifications: items });
});

app.use((req, res) => res.status(404).json({ message: "Route not found" }));

app.listen(PORT, () => {
  console.log(`MeetMode backend running on ${PORT}`);
});
