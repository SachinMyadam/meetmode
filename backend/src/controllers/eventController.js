const Event = require("../models/Event");

exports.getEvents = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};

exports.createEvent = async (req, res) => {
  const event = await Event.create(req.body);
  res.json(event);
};

exports.joinEvent = async (req, res) => {
  const { eventId, userId } = req.body;

  const event = await Event.findById(eventId);
  event.participants.push(userId);

  await event.save();

  res.json(event);
};
