const express = require("express");
const auth = require("../middleware/auth");
const {
  getChat,
  saveChat,
  seedChat,
} = require("../lib/store");

const router = express.Router();

router.get("/:room", async (req, res) => {
  const room = req.params.room || "global";
  const messages = await getChat(room);
  res.json({ success: true, messages });
});

router.post("/send", auth, async (req, res) => {
  const room = req.body.room || "global";
  const payload = req.body.message;
  const text = typeof payload === "string" ? payload : payload?.text || "";

  if (!text.trim()) {
    return res.status(400).json({ message: "Message required" });
  }

  const messages = await getChat(room);
  messages.push({
    id: String(Date.now()),
    user: req.auth.name || req.auth.email,
    text,
    mine: true,
    time: new Date().toISOString(),
  });

  await saveChat(room, messages);
  res.json({ success: true, message: text });
});

module.exports = router;
module.exports.seedData = seedChat;
