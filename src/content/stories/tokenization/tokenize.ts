/**
 * A simplified, illustrative tokenizer in the spirit of GPT-style byte-pair
 * encoding. It is NOT the real vocabulary — real tokenizers learn their pieces
 * from data — but the behaviour it shows is faithful: common words stay whole,
 * rare/long words shatter into sub-pieces, a leading space rides along with its
 * word, and numbers split into chunks. Good enough to *feel* how an LLM sees
 * text, without shipping a multi-megabyte vocab file.
 */

// A small set of very common words that a real tokenizer keeps as single tokens.
const COMMON = new Set(
  ("the of and a to in is you that it he was for on are as with his they i at be this " +
    "have from or one had by word but not what all were we when can said there use an each " +
    "which do how their if will up other about out many then them these so some her would " +
    "make like him into time has look more write go see number no way could people than first " +
    "been call who its now find long down day did get come made may part over new sound take " +
    "only little work know place year live me back give most very after thing our just name good " +
    "man think say great where help much before right too mean old any same tell does well must " +
    "big even because turn here why ask went read need home us move try kind hand again change " +
    "play air away animal house point page letter mother answer found study learn should world " +
    "read this that chat does")
    .split(" "),
);

const SUFFIXES = [
  "ization", "ational", "ation", "tions", "tion", "ments", "ment", "ness",
  "able", "ible", "ings", "ing", "edly", "ed", "ly", "ers", "er", "es", "est", "s",
];

function chunk(word: string): string[] {
  const parts: string[] = [];
  for (let i = 0; i < word.length; i += 4) parts.push(word.slice(i, i + 4));
  return parts;
}

function subwords(word: string): string[] {
  const lower = word.toLowerCase();
  if (word.length <= 5 || COMMON.has(lower)) return [word];

  for (const s of SUFFIXES) {
    if (lower.endsWith(s) && word.length - s.length >= 3) {
      const head = word.slice(0, word.length - s.length);
      const tail = word.slice(word.length - s.length);
      return [...subwords(head), tail];
    }
  }
  if (word.length <= 7) return [word];
  return chunk(word);
}

/** Split text into illustrative tokens (each may carry a leading space). */
export function tokenize(text: string): string[] {
  if (!text) return [];
  const pieces = text.match(/\s+|[A-Za-z]+|\d+|[^\sA-Za-z\d]+/g) || [];
  const tokens: string[] = [];
  let pendingSpace = "";

  for (const p of pieces) {
    if (/^\s+$/.test(p)) {
      if (p === " ") {
        pendingSpace = " ";
      } else {
        if (pendingSpace) {
          tokens.push(pendingSpace);
          pendingSpace = "";
        }
        tokens.push(p);
      }
      continue;
    }

    const emit = (parts: string[]) => {
      parts.forEach((part, i) => {
        tokens.push(i === 0 ? pendingSpace + part : part);
      });
      pendingSpace = "";
    };

    if (/^[A-Za-z]+$/.test(p)) emit(subwords(p));
    else if (/^\d+$/.test(p)) emit(p.match(/.{1,3}/g) || [p]);
    else emit([...p]);
  }

  if (pendingSpace) tokens.push(pendingSpace);
  return tokens;
}
