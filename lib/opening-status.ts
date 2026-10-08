const localClock = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Porto_Velho",
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export function isBusinessOpen(now: Date = new Date()): boolean {
  const parts = localClock.formatToParts(now);
  const weekday = parts.find((part) => part.type === "weekday")?.value;
  const hour = Number(parts.find((part) => part.type === "hour")?.value);
  const minute = Number(parts.find((part) => part.type === "minute")?.value);
  const minutes = hour * 60 + minute;
  if (weekday === "Sun") return false;
  const closing = weekday === "Sat" ? 13 * 60 : 18 * 60 + 30;
  return minutes >= 7 * 60 && minutes < closing;
}
