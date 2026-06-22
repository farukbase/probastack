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
        <Section eyebrow="Check yourself">
          <Quiz
            question="How can Treatment A win for small stones AND large stones, yet lose overall?"
            options={[
              "The percentages were calculated incorrectly",
              "A was given far more of the hard (large-stone) cases, dragging its combined average down",
              "Combining groups always favors the worse treatment",
            ]}
            correct={1}
            explanation="It's a weighted-average effect. Because A handled mostly hard cases and B mostly easy ones, the overall numbers reflect the mix of cases, not the treatments themselves. Compare within each group and A's true advantage reappears."
          />
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
