export const adjectives = ["Important", "Great", "Single", "Historical", "Major", "Particular", "Rare", "Significant", "Annual", "Next", "Big", "Unlikely", "Actual", "Specific", "Main", "Future", "Past", "Happy", "Historic", "Latter", "Unexpected", "Sad", "Tragic", "Unique", "Extraordinary", "Dramatic", "Memorable", "Momentous", "Stressful", "Unusual", "External", "Initial", "Greatest", "Adverse", "Remarkable", "Critical", "Isolated", "Interesting", "Key", "Decisive", "Catastrophic", "Notable", "Exciting", "Untoward", "Unfortunate", "Day", "Crucial", "Strange", "Terrible", "Singular", "Random", "Melancholy", "Outstanding", "Acute", "Biggest", "Time", "Sudden", "Miraculous", "Unforeseen"];

export function getAdjective() {
  return adjectives[Math.floor(Math.random() * adjectives.length - 1)];
}

export function readCookie(cookieKey) {
  const cookie = document.cookie.split(';').find(x => x.trim().startsWith(cookieKey));
  if (!cookie) {
    return null;
  }
  const splitAt = cookie.indexOf('=') + 1;
  return cookie.slice(splitAt);
}
