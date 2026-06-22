"use client";

import { useState } from "react";
import { tokenize } from "../tokenize";

/**
 * Bespoke to this story: type anything and watch it shatter into tokens — the
 * puzzle pieces an LLM actually reads. Shows the token / word / character
 * counts and a few revealing presets.
 */
const PALETTE = [
  "#e0e7ff", "#fae8ff", "#dcfce7", "#fef3c7", "#fee2e2", "#cffafe",
];

const PRESETS = [
  { label: "strawberry 🍓", text: "How many r's are in strawberry?" },
  { label: "a big number", text: "The population is 8127364 people." },
  { label: "made-up word", text: "antidisestablishmentarianism" },
  { label: "code", text: "const x = arr.map(i => i * 2);" },
];

export function Tokenizer() {
  const [text, setText] = useState("How does ChatGPT read this sentence?");
  const tokens = tokenize(text);

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;

  const display = (tok: string) =>
    tok.replace(/ /g, "␣").replace(/\n/g, "⏎");

  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={2}
        spellCheck={false}
        className="w-full resize-none rounded-lg border border-border bg-surface-2/40 p-3 font-mono text-sm text-foreground outline-none focus:border-accent"
        placeholder="Type anything…"
      />

      <div className="mt-3 flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => setText(p.text)}
            className="rounded-full border border-border px-2.5 py-1 text-xs text-muted transition hover:bg-surface-2"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-1 leading-7">
        {tokens.map((tok, i) => (
          <span
            key={i}
            className="rounded px-1.5 py-0.5 font-mono text-sm text-foreground"
            style={{ backgroundColor: PALETTE[i % PALETTE.length] }}
          >
            {display(tok)}
          </span>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-4 text-center">
        <Stat value={tokens.length} label="tokens" highlight />
        <Stat value={words} label="words" />
        <Stat value={chars} label="characters" />
      </div>
    </div>
  );
}

function Stat({
  value,
  label,
  highlight,
}: {
  value: number;
  label: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <div
        className={`font-mono text-2xl font-semibold ${
          highlight ? "text-accent" : "text-foreground"
        }`}
      >
        {value}
      </div>
      <div className="text-xs uppercase tracking-wide text-muted">{label}</div>
    </div>
  );
}
