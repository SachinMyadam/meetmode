const KEY = "mm_user_profile";

export function getUserProfile() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

export function setUserInterests(interests) {
  const profile = getUserProfile();
  profile.interests = interests;
  localStorage.setItem(KEY, JSON.stringify(profile));
  return profile;
}

export function setUserProfile(partial) {
  const profile = { ...getUserProfile(), ...partial };
  localStorage.setItem(KEY, JSON.stringify(profile));
  return profile;
}
