/**
 * Pure birthday-problem math, shared by this story's server and client
 * components. 365 days, uniform, no leap year — the classic formulation.
 */

/** P(at least two of n people share a birthday). */
export function sharedBirthdayProbability(n: number): number {
  if (n < 2) return 0;
  let pNoMatch = 1;
  for (let k = 0; k < n; k++) pNoMatch *= (365 - k) / 365;
  return 1 - pNoMatch;
}

/** Simulate one room of n people; true if any two share a day. */
export function sampleHasMatch(n: number): boolean {
  const seen = new Set<number>();
  for (let i = 0; i < n; i++) {
    const d = Math.floor(Math.random() * 365);
    if (seen.has(d)) return true;
    seen.add(d);
  }
  return false;
}

/** Draw n random day-of-year indices (0–364). */
export function sampleRoom(n: number): number[] {
  return Array.from({ length: n }, () => Math.floor(Math.random() * 365));
}

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** Turn a day-of-year index (0–364) into "Mar 14". */
export function dayToDate(day: number): string {
  let d = day;
  for (let m = 0; m < 12; m++) {
    if (d < DAYS_IN_MONTH[m]) return `${MONTHS[m]} ${d + 1}`;
    d -= DAYS_IN_MONTH[m];
  }
  return "Dec 31";
}
