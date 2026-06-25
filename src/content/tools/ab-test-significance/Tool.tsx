import { Callout } from "@/components/story/StoryShell";
import { M, MathBlock } from "@/components/story/Math";
import { AbTestCalculator } from "./AbTestCalculator";

/**
 * A/B Test Significance tool page body: the calculator plus a short, optional
 * explainer of the two-proportion z-test it runs.
 */
export default function AbTestSignificanceTool() {
  return (
    <div className="space-y-10">
      <AbTestCalculator />

      <section>
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground">
          How it&rsquo;s calculated
        </h2>
        <div className="space-y-3 text-[0.95rem] leading-relaxed text-muted">
          <p>
            It&rsquo;s a <strong className="text-foreground">two-proportion
            z-test</strong>. We compare each variant&rsquo;s conversion rate{" "}
            <M>{String.raw`\hat p_A = x_A/n_A`}</M> and{" "}
            <M>{String.raw`\hat p_B = x_B/n_B`}</M>, then ask how many standard
            errors apart they are under the assumption that they&rsquo;re really
            the same:
          </p>
          <MathBlock>{String.raw`z = \frac{\hat p_B - \hat p_A}{\sqrt{\hat p\,(1-\hat p)\left(\dfrac{1}{n_A}+\dfrac{1}{n_B}\right)}}, \quad \hat p = \frac{x_A + x_B}{n_A + n_B}`}</MathBlock>
          <p>
            That <M>{String.raw`z`}</M> becomes a two-tailed{" "}
            <strong className="text-foreground">p-value</strong> — the chance of
            seeing a gap this big (or bigger) if the two variants were actually
            identical. <strong className="text-foreground">Confidence</strong> is
            just <M>{String.raw`1 - p`}</M>. When the p-value drops below your
            threshold (e.g. 0.05 for 95%), the result is &ldquo;significant.&rdquo;
          </p>
        </div>
        <Callout title="A fair-test reminder">
          Significance answers &ldquo;is this real?&rdquo;, not &ldquo;is this
          big?&rdquo; — a tiny lift can be significant with enough traffic, and a
          huge lift can be noise with too little. Decide your sample size and
          stopping point <em>before</em> you peek, or you&rsquo;ll fool yourself.
        </Callout>
      </section>
    </div>
  );
}
