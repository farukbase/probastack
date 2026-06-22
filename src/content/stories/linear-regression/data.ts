/**
 * Study hours vs. exam score — a noisy but real upward trend. Shared by the
 * regression lab. Includes the ordinary-least-squares best fit so the "let it
 * learn" button has a target.
 */
export interface Point {
  x: number;
  y: number;
}

export const POINTS: Point[] = [
  { x: 1, y: 42 }, { x: 2, y: 51 }, { x: 3, y: 49 }, { x: 4, y: 62 },
  { x: 5, y: 58 }, { x: 6, y: 72 }, { x: 7, y: 68 }, { x: 8, y: 81 },
  { x: 9, y: 83 }, { x: 10, y: 90 },
];

export const X_MAX = 10;
export const Y_MAX = 100;

const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;

/** Ordinary least squares: the slope & intercept that minimize squared error. */
export function bestFit(pts: Point[]): { m: number; b: number } {
  const mx = mean(pts.map((p) => p.x));
  const my = mean(pts.map((p) => p.y));
  let num = 0;
  let den = 0;
  for (const p of pts) {
    num += (p.x - mx) * (p.y - my);
    den += (p.x - mx) ** 2;
  }
  const m = num / den;
  return { m, b: my - m * mx };
}

/** Sum of squared errors for a given line. */
export function sse(pts: Point[], m: number, b: number): number {
  return pts.reduce((s, p) => {
    const e = p.y - (m * p.x + b);
    return s + e * e;
  }, 0);
}
