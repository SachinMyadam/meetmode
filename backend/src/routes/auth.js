const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const {
  publicUser,
  getUserByEmail,
  getUserById,
  saveUser,
} = require("../lib/store");

const router = express.Router();

function signUser(user) {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, city = "Hyderabad", interests = [] } = req.body;
    const safeEmail = String(email || "").toLowerCase().trim();

    if (!name || !safeEmail || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    const existing = await getUserByEmail(safeEmail);
    if (existing) {
      return res.status(409).json({ message: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
      id: `user-${Date.now()}`,
      name,
      email: safeEmail,
      passwordHash,
      city,
      interests: Array.isArray(interests)
        ? interests
        : String(interests)
            .split(",")
            .map((v) => v.trim())
            .filter(Boolean),
    };

    await saveUser(user);

    return res.json({
      token: signUser(user),
      user: publicUser(user),
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const safeEmail = String(email || "").toLowerCase().trim();

    const user = await getUserByEmail(safeEmail);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const ok = await bcrypt.compare(password || "", user.passwordHash);
    if (!ok) {
      return res.status(400).json({ message: "Wrong password" });
    }

    return res.json({
      token: signUser(user),
      user: publicUser(user),
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get("/me", auth, async (req, res) => {
  const user = await getUserById(req.auth.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({ user: publicUser(user) });
});

router.post("/logout", (_req, res) => {
  res.json({ success: true });
});

module.exports = router;
