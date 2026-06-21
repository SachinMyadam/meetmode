const bcrypt = require("bcryptjs");
const valkey = require("../config/valkey");

const SAMPLE_EVENTS = [
  {
    id: "evt-1",
    title: "React Hyderabad Meetup",
    location: "Hyderabad",
    date: "2026-06-28",
    description: "Frontend builders and networking.",
  },
  {
    id: "evt-2",
    title: "Valkey Workshop",
    location: "Amazon HYD13",
    date: "2026-06-30",
    description: "Build with Valkey and Breeth.",
  },
  {
    id: "evt-3",
    title: "AI Product Jam",
    location: "Bangalore",
    date: "2026-07-02",
    description: "Ship AI features fast.",
  },
];

const SAMPLE_FRIENDS = [
  {
    id: "f1",
    name: "Neha Gupta",
    city: "Hyderabad",
    skills: ["Python", "Oracle", "AI"],
    interests: ["AI", "Hackathons"],
    match: 75,
  },
  {
    id: "f2",
    name: "Rahul Sharma",
    city: "Hyderabad",
    skills: ["Python", "AI"],
    interests: ["AI", "Events"],
    match: 50,
  },
  {
    id: "f3",
    name: "Arjun Kumar",
    city: "Bangalore",
    skills: ["Python", "AI"],
    interests: ["AI", "Startups"],
    match: 50,
  },
  {
    id: "f4",
    name: "Aarav Mehta",
    city: "Hyderabad",
    skills: ["JavaScript", "React"],
    interests: ["Meetups", "Networking"],
    match: 65,
  },
];

const DEFAULT_MESSAGES = [
  {
    id: "m1",
    user: "System",
    text: "MeetMode initialized 🚀",
    time: new Date().toISOString(),
  },
];

function publicUser(user) {
  if (!user) return null;
  const { passwordHash, ...safe } = user;
  return safe;
}

async function getJSON(key, fallback) {
  const raw = await valkey.get(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

async function setJSON(key, value) {
  await valkey.set(key, JSON.stringify(value));
}

async function getUserByEmail(email) {
  return getJSON(`meetmode:user:email:${String(email).toLowerCase()}`, null);
}

async function getUserById(id) {
  return getJSON(`meetmode:user:id:${id}`, null);
}

async function saveUser(user) {
  await setJSON(`meetmode:user:email:${user.email.toLowerCase()}`, user);
  await setJSON(`meetmode:user:id:${user.id}`, user);
}

async function seedUsers() {
  const seeds = [
    {
      id: "demo-1",
      name: "Sachin",
      email: "sachin@test.com",
      passwordPlain: "123456",
      city: "Hyderabad",
      interests: ["AI", "Valkey", "Hackathons"],
    },
    {
      id: "demo-2",
      name: "Sachin123",
      email: "sachin123@test.com",
      passwordPlain: "123456",
      city: "Hyderabad",
      interests: ["AI", "Events", "Friends"],
    },
  ];

  for (const seed of seeds) {
    const existing = await getUserByEmail(seed.email);
    if (!existing) {
      const passwordHash = await bcrypt.hash(seed.passwordPlain, 10);
      await saveUser({
        id: seed.id,
        name: seed.name,
        email: seed.email.toLowerCase(),
        passwordHash,
        city: seed.city,
        interests: seed.interests,
      });
    }
  }
}

async function getEvents() {
  return getJSON("meetmode:events", SAMPLE_EVENTS);
}

async function saveEvents(events) {
  await setJSON("meetmode:events", events);
}

async function seedEvents() {
  if (!(await valkey.get("meetmode:events"))) {
    await saveEvents(SAMPLE_EVENTS);
  }
}

async function getChat(room = "global") {
  return getJSON(`meetmode:chat:${room}`, DEFAULT_MESSAGES);
}

async function saveChat(room, messages) {
  await setJSON(`meetmode:chat:${room}`, messages);
}

async function seedChat() {
  if (!(await valkey.get("meetmode:chat:global"))) {
    await saveChat("global", DEFAULT_MESSAGES);
  }
}

module.exports = {
  publicUser,
  getUserByEmail,
  getUserById,
  saveUser,
  seedUsers,
  getEvents,
  saveEvents,
  seedEvents,
  getChat,
  saveChat,
  seedChat,
  SAMPLE_FRIENDS,
  SAMPLE_EVENTS,
};
