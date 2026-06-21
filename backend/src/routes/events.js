const express = require("express");
const auth = require("../middleware/auth");
const valkey = require("../config/valkey");
const {
  getEvents,
  saveEvents,
  seedEvents,
} = require("../lib/store");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const events = await getEvents();
  const email = req.auth.email;

  const data = [];
  for (const event of events) {
    const registered = await valkey.sismember(
      `meetmode:event:registered:${event.id}`,
      email
    );
    data.push({ ...event, registered: Boolean(registered) });
  }

  res.json({ events: data });
});

router.post("/register", auth, async (req, res) => {
  const { eventId } = req.body;
  if (!eventId) {
    return res.status(400).json({ message: "eventId required" });
  }

  const events = await getEvents();
  const exists = events.some((event) => event.id === eventId);
  if (!exists) {
    return res.status(404).json({ message: "Event not found" });
  }

  await valkey.sadd(`meetmode:event:registered:${eventId}`, req.auth.email);
  res.json({ success: true, eventId });
});

router.get("/mine", auth, async (req, res) => {
  const events = await getEvents();
  const mine = [];

  for (const event of events) {
    const registered = await valkey.sismember(
      `meetmode:event:registered:${event.id}`,
      req.auth.email
    );
    if (registered) mine.push(event);
  }

  res.json({ events: mine });
});

module.exports = router;
module.exports.seedData = seedEvents;
