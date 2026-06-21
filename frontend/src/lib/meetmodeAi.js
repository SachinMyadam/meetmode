export const EVENTS = [
  { title: "React Hyderabad Meetup", date: "28 June 2026", place: "Hyderabad" },
  { title: "Valkey Workshop", date: "30 June 2026", place: "Amazon HYD13" },
];

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getAiReply(message) {
  const text = normalize(message);

  if (!text) return "Type something and I will help.";

  if (/(^|\s)(hi|hello|hey|hii)(\s|$)/.test(text)) {
    return "Hi! I can help with events, friends, QR, profile, settings, and app guidance.";
  }

  if (
    text.includes("which event is next") ||
    text.includes("next event") ||
    text.includes("upcoming event") ||
    (text.includes("event") && (text.includes("next") || text.includes("upcoming")))
  ) {
    const next = EVENTS[0];
    return `The next event is ${next.title} on ${next.date} at ${next.place}.`;
  }

  if (text.includes("event")) {
    return `Upcoming events are ${EVENTS.map((e) => e.title).join(" and ")}.`;
  }

  if (text.includes("friend") || text.includes("match")) {
    return "Go to Friends to see match suggestions and connection cards.";
  }

  if (text.includes("qr")) {
    return "QR Network is available in the QR Network page for sharing your profile quickly.";
  }

  if (text.includes("profile")) {
    return "Your Profile page shows your name, email, and user ID.";
  }

  if (text.includes("settings")) {
    return "In Settings you can toggle Dark Mode, Notifications, and Logout.";
  }

  if (text.includes("help")) {
    return "I can answer about events, friends, QR, profile, settings, and navigation.";
  }

  return "I can help with events, friends, QR, profile, settings, and app guidance.";
}
