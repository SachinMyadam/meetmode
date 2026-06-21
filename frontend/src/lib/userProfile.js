export function getUserProfile() {
  return JSON.parse(localStorage.getItem("userProfile")) || {
    name: "User",
    interests: ["React", "AI"]
  };
}

export function setUserInterests(interests) {
  const profile = getUserProfile();
  profile.interests = interests;
  localStorage.setItem("userProfile", JSON.stringify(profile));
}
