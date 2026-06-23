export function getAiReply(text) {
  const t = String(text || "").toLowerCase();
  if (t.includes("event")) return "Join an event first, then open Nearby People to discover visible attendees.";
  if (t.includes("friend")) return "Search by skill, city, or interest on the Nearby People page.";
  if (t.includes("qr")) return "Use QR Network to generate a check-in link for your event.";
  if (t.includes("mode")) return "Meet Mode makes you discoverable. Focus Mode hides you.";
  if (t.includes("profile")) return "Open Profile to edit your name, company, skills, interests, and goal.";
  return "I can help with matching, events, QR check-in, profile, settings, and networking suggestions.";
}
