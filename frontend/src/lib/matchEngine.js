export function calculateMatch(userInterests = [], eventTags = []) {
  if (!userInterests.length || !eventTags.length) return 0;

  let matches = 0;

  userInterests.forEach(i => {
    if (eventTags.includes(i)) matches++;
  });

  return Math.round((matches / eventTags.length) * 100);
}
