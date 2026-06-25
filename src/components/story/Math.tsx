import katex from "katex";

/**
 * Server-rendered LaTeX via KaTeX. Stories pass a TeX string as children —
 * easiest with a String.raw template so backslashes stay literal:
 *
 *   <M>{String.raw`P(\text{sick}\mid +)`}</M>
 *   <MathBlock>{String.raw`\text{MSE} = \frac{1}{n}\sum (y_i - \hat{y}_i)^2`}</MathBlock>
 *
 * KaTeX renders at build time (no client JS); the stylesheet is imported once in
 * the root layout. `throwOnError: false` means a typo shows inline instead of
 * breaking the build.
 */
function render(tex: string, displayMode: boolean) {
  return katex.renderToString(tex, {
    displayMode,
    throwOnError: false,
    output: "htmlAndMathml",
  });
}

/** Inline math, flows within a sentence. */
export function M({ children }: { children: string }) {
  return <span dangerouslySetInnerHTML={{ __html: render(children, false) }} />;
}

/** Display (block) math, centered on its own line. */
export function MathBlock({ children }: { children: string }) {
  return (
    <span
      className="my-4 block overflow-x-auto overflow-y-hidden text-foreground"
      dangerouslySetInnerHTML={{ __html: render(children, true) }}
    />
  );
}
