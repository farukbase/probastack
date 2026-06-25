import {
  StoryColumn,
  Section,
  Lead,
  Prose,
  Stage,
  Callout,
} from "@/components/story/StoryShell";
import { Reveal } from "@/components/story/Reveal";
import { Quiz } from "@/components/interactive/Quiz";
import { SimpsonChart } from "./components/SimpsonChart";
import { CaseMix } from "./components/CaseMix";

export default function SimpsonsParadoxStory() {
  return (
    <article className="pb-20">
      <StoryColumn>
        <Section eyebrow="The hook">
          <Lead>
            Two real treatments for kidney stones. Treatment A cured a higher
            percentage of patients with <em>small</em>{" "}stones. It also cured a
            higher percentage with <em>large</em>{" "}stones. So A is the better
            treatment — obviously. Right?
          </Lead>
          <Prose>
            <p>
              It wins in both groups. There are only two groups. It feels
              airtight. But hold on — let&rsquo;s actually look at the numbers,
              and then lump all the patients together.
            </p>
          </Prose>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="See it flip">
          <Prose>
            <p>
              Start on <strong>Split by stone size</strong>: Treatment A wins
              both. Then hit <strong>Combined</strong>{" "}and watch what happens to
              the overall winner.
            </p>
          </Prose>
          <Stage caption="Same patients, same cures — only the grouping changed.">
            <SimpsonChart />
          </Stage>
          <Prose>
            <p>
              Treatment A beats B in every subgroup, yet <strong>loses</strong>{" "}
              when you combine them. That&rsquo;s not a typo or a trick of
              rounding — it&rsquo;s a genuine reversal, and it has a name:{" "}
              <strong>Simpson&rsquo;s Paradox</strong>.
            </p>
          </Prose>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="Make a guess">
          <Prose>
            <p>
              Before the explanation: how can a treatment win every group but
              lose the total? What do you think is hiding in these numbers?
            </p>
          </Prose>
          <Reveal prompt="Reveal what's really going on">
            <Prose>
              <p>
                The secret isn&rsquo;t in the cure rates — it&rsquo;s in{" "}
                <em>who got which treatment</em>. The two groups aren&rsquo;t the
                same size, and they aren&rsquo;t equally hard.
              </p>
            </Prose>
          </Reveal>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="The reveal">
          <Prose>
            <p>
              Large stones are simply harder to cure than small ones — everyone
              does worse on them. Now look at how the cases were handed out:
            </p>
          </Prose>
          <Stage>
            <CaseMix />
          </Stage>
          <Prose>
            <p>
              Doctors gave the tough <strong>large-stone</strong>{" "}cases mostly to
              Treatment A, and the easy <strong>small-stone</strong>{" "}cases mostly
              to B. So A&rsquo;s overall score is dragged down by all the hard
              cases it took on, while B&rsquo;s is propped up by easy ones. The
              combined average isn&rsquo;t measuring the treatment — it&rsquo;s
              measuring <em>who walked through each door</em>.
            </p>
          </Prose>
          <Callout title="The lurking variable">
            Stone size is a <strong>confounder</strong>{" "}— a hidden factor tangled
            up with both the treatment and the outcome. Average over it blindly
            and it quietly flips your conclusion. The fix is to compare like with
            like: small stones to small stones, large to large.
          </Callout>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="The math, gently">
          <Prose>
            <p>
              Here&rsquo;s the quiet move that trips everyone up. The combined
              cure rate is <em>not</em>{" "}the average of the two subgroup rates.
              You don&rsquo;t add the percentages and halve them. You pool the
              raw counts: combined = (cured₁ + cured₂) ⁄ (trials₁ + trials₂). In
              effect each group gets a <strong>weight</strong>{" "}equal to how many
              patients it had — a big group pulls the overall number toward its
              own rate, a tiny group barely tugs at all.
            </p>
            <p>
              That weighting is the whole trick. A treatment can win every
              single subgroup and still lose overall — as long as its wins pile
              up in the <em>small</em>{" "}groups and its losses sit in the{" "}
              <em>big</em>{" "}ones. If a treatment was tested mostly on the harder
              cases (where everybody&rsquo;s base success is low), those heavy,
              low-scoring weights drag its combined number down, even while it
              beats the rival case-for-case.
            </p>
            <p>
              For the flip to actually happen you need a{" "}
              <strong>lurking variable</strong>{" "}— here, stone size, i.e. case
              difficulty — that is <em>both</em>{" "}linked to the outcome (large
              stones are harder to cure) <em>and</em>{" "}unevenly spread across the
              treatments (A took most of the large stones). Knock out either
              condition and the paradox can&rsquo;t form: a confounder that
              doesn&rsquo;t move the outcome, or one that&rsquo;s split evenly,
              is harmless.
            </p>
            <p>
              The fix is the same fix every time: don&rsquo;t trust the lone
              pooled average. Split the data by the lurking variable and compare
              like with like — or, if you must report one number, weight the
              groups fairly instead of letting the case mix do it for you.
            </p>
          </Prose>
          <Reveal prompt="Show me the numbers">
            <Prose>
              <p>
                Small stones: A cured 81 of 87 (≈ 93%), B cured 234 of 270
                (≈ 87%). Large stones: A cured 192 of 263 (≈ 73%), B cured 55
                of 80 (≈ 69%). A wins both — by a clear margin.
              </p>
              <p>
                Now pool the counts, not the percentages. Treatment A: (81 +
                192) ⁄ (87 + 263) = 273 ⁄ 350 ≈ 78%. Treatment B: (234 + 55) ⁄
                (270 + 80) = 289 ⁄ 350 ≈ 83%. B wins overall — because 263 of
                A&rsquo;s 350 patients were the hard large-stone cases, while 270
                of B&rsquo;s 350 were the easy small ones. The weights, not the
                treatments, decided the headline.
              </p>
            </Prose>
          </Reveal>
          <Callout title="The one-line takeaway">
            A pooled percentage is a <strong>weighted average</strong>, and the
            weights are just how many cases each group had. Whenever those
            weights line up with a hidden difference between the groups, the
            overall number can point the opposite way from every subgroup. Split
            by the lurking variable before you believe it.
          </Callout>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="Check yourself">
          <div className="flex flex-col gap-4">
            <Quiz
              question="Why can the single pooled cure rate lie about which treatment is better?"
              options={[
                "Because percentages can't be combined across groups at all",
                "Because the pooled rate is a weighted average — it reflects how the cases were distributed, not just the treatments",
                "Because rounding errors build up when you add the groups",
              ]}
              correct={1}
              explanation="The pooled number weights each group by its size. When the heavy groups happen to be the hard cases for one treatment, the overall rate reports the case mix, not the treatment. That's exactly how A wins both subgroups yet loses the total."
            />
            <Quiz
              question="What does it mean that the combined cure rate is a 'weighted average'?"
              options={[
                "Each group counts in proportion to how many patients it had — big groups pull the overall rate toward their own rate",
                "Each group counts equally, so you just average the two percentages",
                "The higher subgroup rate always wins the overall comparison",
              ]}
              correct={0}
              explanation="Combined = (cured₁ + cured₂) ⁄ (trials₁ + trials₂). That's a size-weighted average: a group with many patients dominates the pooled figure, while a tiny group barely moves it. Equal-weighting the two percentages would give a different — and misleading — answer."
            />
            <Quiz
              question="What does the paradox actually require, and what's the right fix?"
              options={[
                "It requires identical group sizes; the fix is to collect more data",
                "It requires the two treatments to have equal subgroup rates; the fix is to round less",
                "It requires a lurking variable tied to the outcome AND unevenly split across groups; the fix is to condition on that variable",
              ]}
              correct={2}
              explanation="No lurking variable, no flip. Here stone size both affects cure rate and is unevenly handed out across treatments. The cure is to split by (condition on) that variable and compare like with like — or weight the groups fairly — instead of trusting the lone pooled average."
            />
          </div>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="Where it shows up">
          <Prose>
            <p>
              This isn&rsquo;t a rare curiosity — it ambushes real decisions all
              the time. It famously made a university look like it discriminated
              against women in admissions (it didn&rsquo;t — women applied to
              tougher departments). It can make a hospital, a drug, or a sales
              campaign look better or worse than it is. The lesson is permanent:
              whenever you&rsquo;re shown a single average, ask{" "}
              <strong>&ldquo;averaged over what?&rdquo;</strong>{" "}— because the
              groups underneath might be telling the opposite story.
            </p>
          </Prose>
        </Section>
      </StoryColumn>
    </article>
  );
}
