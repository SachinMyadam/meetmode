const express = require("express");
const auth = require("../middleware/auth");
const {
  publicUser,
  getUserById,
  saveUser,
  SAMPLE_FRIENDS,
} = require("../lib/store");

const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await getUserById(req.auth.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({ user: publicUser(user) });
});

router.put("/me", auth, async (req, res) => {
  const user = await getUserById(req.auth.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  const { name, city, interests, bio } = req.body;

  if (name !== undefined) user.name = name;
  if (city !== undefined) user.city = city;
  if (bio !== undefined) user.bio = bio;
  if (interests !== undefined) {
    user.interests = Array.isArray(interests)
      ? interests
      : String(interests)
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean);
  }

  await saveUser(user);
  res.json({ user: publicUser(user) });
});

router.get("/friends", auth, async (req, res) => {
  const q = String(req.query.q || "").toLowerCase().trim();

  const friends = SAMPLE_FRIENDS.filter((friend) => {
    if (!q) return true;
    return (
      friend.name.toLowerCase().includes(q) ||
      friend.city.toLowerCase().includes(q) ||
      friend.skills.join(" ").toLowerCase().includes(q) ||
      friend.interests.join(" ").toLowerCase().includes(q)
    );
  });

  res.json({ friends });
});

module.exports = router;
