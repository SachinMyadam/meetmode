const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, (_req, res) => {
  res.json({
    notifications: [
      {
        id: "n1",
        title: "Welcome to MeetMode",
        body: "Your account has been created successfully.",
      },
      {
        id: "n2",
        title: "AI Match Found",
        body: "Neha Gupta matches your skills 75%.",
      },
      {
        id: "n3",
        title: "Upcoming Event",
        body: "React Hyderabad Meetup starts on 28 June.",
      },
      {
        id: "n4",
        title: "Friend Request",
        body: "Rahul Sharma sent you a connection request.",
      },
    ],
  });
});

module.exports = router;
