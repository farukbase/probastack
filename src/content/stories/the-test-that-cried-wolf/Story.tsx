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
import { BaseRateLab } from "./components/BaseRateLab";

/**
 * The Test That Cried Wolf — base-rate neglect, told through a scary-but-fine
 * medical result. One central interactive (BaseRateLab) lets the reader feel
 * how rarity, not test quality, decides what a positive really means.
 */
export default function TestThatCriedWolfStory() {
  return (
    <article className="pb-20">
      <StoryColumn>
        <Section eyebrow="The hook">
          <Lead>
            A doctor calls. The screening test you took is{" "}
            <em>99% accurate</em>, and yours came back <em>positive</em>. Your
            stomach drops. Ninety-nine percent — it&rsquo;s basically certain,
            right?
          </Lead>
          <Prose>
            <p>
              Hold that fear for a second. As scary as it sounds, that
              &ldquo;99%&rdquo; doesn&rsquo;t mean what your gut thinks it means.
              For a lot of real tests, a positive like this is{" "}
              <strong>more likely to be a false alarm than the real thing</strong>.
              Not because the test is bad — but because of one number nobody
              mentioned on the phone.
            </p>
          </Prose>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="Make a prediction">
          <Prose>
            <p>
              Say a disease affects <strong>1 in 1,000</strong>{" "}people, and the
              test is right <strong>99%</strong>{" "}of the time. You test positive.
              What&rsquo;s the chance you actually have it? Commit to a gut number
              before you peek.
            </p>
          </Prose>
          <Reveal prompt="I’ve got a number — show me">
            <Prose>
              <p>
                About <strong>9%</strong>. Out of every positive result this test
                produces, only around one in eleven is a real case. The other ten
                are healthy people the test flagged by mistake. Surprised? The
                simulator below will show you exactly where the missing certainty
                went.
              </p>
            </Prose>
          </Reveal>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="Play with the numbers">
          <Prose>
            <p>
              Drag the two dials. <strong>How common</strong>{" "}the condition is,
              and <strong>how accurate</strong>{" "}the test is. Watch the big
              number — your real chance of being sick after a positive — and the
              bar of who actually gets flagged.
            </p>
          </Prose>
          <Stage caption="Try the presets, then make the disease rarer and watch the false alarms take over.">
            <BaseRateLab />
          </Stage>
          <Prose>
            <p>
              Notice the pattern: crank the test accuracy as high as you like and
              the positive result <em>still</em>{" "}can&rsquo;t be trusted when the
              disease is rare. The dial that really moves the answer isn&rsquo;t
              accuracy — it&rsquo;s how common the thing is in the first place.
            </p>
          </Prose>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="The reveal">
          <Lead>
            When a condition is rare, the healthy crowd is enormous — and even a
            tiny mistake rate on a huge crowd produces a flood of false alarms.
          </Lead>
          <Prose>
            <p>
              Picture 10,000 people and a disease that hits 1 in 1,000. That&rsquo;s
              just <strong>10</strong>{" "}sick people and <strong>9,990</strong>{" "}healthy
              ones. A 99% test catches about 10 of the sick — good. But 1% of the
              9,990 healthy people get flagged too, and that&rsquo;s about{" "}
              <strong>100</strong>{" "}false alarms. So the positives are 10 real and
              100 fake: your odds are 10 out of 110, roughly 9%.
            </p>
          </Prose>
          <Callout title="The starting number has a name">
            That &ldquo;1 in 1,000&rdquo; is the <em>base rate</em> — how common
            something is before any test. Your gut quietly throws it away and
            judges the test on accuracy alone. Putting the base rate back in is
            exactly what <em>Bayes&rsquo; theorem</em>{" "}does: it updates a starting
            chance with new evidence instead of replacing it.
          </Callout>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="It’s everywhere">
          <Prose>
            <p>
              This isn&rsquo;t just a medical-school riddle. The same trap fires
              anywhere you screen a big population for something rare:
            </p>
            <p>
              <strong>Spam filters</strong>{" "}flagging a real email, because almost
              no message is the rare thing they hunt for.{" "}
              <strong>Fraud alerts</strong>{" "}freezing your card on a normal
              purchase. <strong>Airport security</strong>{" "}buzzing on belt buckles a
              thousand times for every genuine threat. Each looks broken — but it
              may just be the base rate doing what it always does to a rare target.
            </p>
            <p>
              The fix in real life is rarely panic. It&rsquo;s a{" "}
              <strong>second, independent test</strong>. The first positive drags
              your odds up from &ldquo;1 in 1,000&rdquo; to &ldquo;1 in 11&rdquo;;
              a second positive starts from that new number and pushes it much
              higher. That&rsquo;s why doctors confirm before they worry you.
            </p>
          </Prose>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="Check yourself">
          <Quiz
            question="A test is 99% accurate. You want a single positive result to mean you're very likely to actually have the condition. What has to be true?"
            options={[
              "Nothing more — 99% accuracy already guarantees it",
              "The condition has to be reasonably common, not rare",
              "You need an even more accurate test, like 99.99%",
            ]}
            correct={1}
            explanation="Accuracy alone can't save a positive when the thing is rare — the huge healthy group still produces more false alarms than there are real cases. Raise the base rate (or add a second independent test) and the positive finally becomes trustworthy."
          />
        </Section>
      </StoryColumn>
    </article>
  );
}
