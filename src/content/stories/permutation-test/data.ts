/**
 * The tipping data behind the story: eight nights each for Maria (who draws a
 * smiley on receipts) and Sam (who doesn't). Pure helpers shared by the
 * story's server and client components.
 */
export const SMILEY = [25, 22, 30, 19, 28, 24, 33, 21]; // Maria — mean 25.25
export const CONTROL = [18, 24, 20, 27, 19, 23, 21, 16]; // Sam — mean 21.0

export const mean = (xs: number[]): number =>
  xs.reduce((a, b) => a + b, 0) / xs.length;

/** The real, observed gap in nightly tips (smiley − no smiley). */
export const OBSERVED_DIFF = mean(SMILEY) - mean(CONTROL); // 4.25
