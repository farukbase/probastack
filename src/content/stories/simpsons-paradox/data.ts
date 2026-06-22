/**
 * The classic kidney-stone study (Charig et al., 1986) — the textbook example
 * of Simpson's Paradox. Treatment A wins for small stones AND for large stones,
 * yet Treatment B wins overall, because A was given the harder cases.
 */
export interface Record {
  cured: number;
  total: number;
}

export const STONES: {
  small: { A: Record; B: Record };
  large: { A: Record; B: Record };
} = {
  small: { A: { cured: 81, total: 87 }, B: { cured: 234, total: 270 } },
  large: { A: { cured: 192, total: 263 }, B: { cured: 55, total: 80 } },
};

export const rate = (r: Record) => r.cured / r.total;

export const combined = (key: "A" | "B"): Record => ({
  cured: STONES.small[key].cured + STONES.large[key].cured,
  total: STONES.small[key].total + STONES.large[key].total,
});
