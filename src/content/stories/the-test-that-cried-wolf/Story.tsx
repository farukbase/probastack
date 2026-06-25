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
        <Section eyebrow="The math, gently">
          <Prose>
            <p>
              Everything so far was the picture. Here&rsquo;s the same idea with
              its proper names, so you&rsquo;d recognize it on a whiteboard. Three
              numbers do all the work:{" "}
              <strong>sensitivity</strong> = P(test positive | sick), the chance a
              sick person tests positive; <strong>specificity</strong> = P(test
              negative | healthy), the chance a healthy person tests negative; and
              the <strong>base rate</strong> = P(sick), how common the thing is
              before any test. The bar after &ldquo;|&rdquo; just means
              &ldquo;given&rdquo;.
            </p>
            <p>
              What you actually want isn&rsquo;t any of those — it&rsquo;s the
              flipped question: <em>given a positive, am I sick?</em>{" "}
              That&rsquo;s the <strong>positive predictive value</strong>, P(sick
              | positive),
              and the tool that flips a conditional around is Bayes&rsquo; theorem.
            </p>
          </Prose>
          <Reveal prompt="Show me Bayes' theorem">
            <Prose>
              <p>
                P(sick | positive) = [ P(positive | sick) × P(sick) ] ⁄ [ P(positive
                | sick) × P(sick) + P(positive | healthy) × P(healthy) ].
              </p>
              <p>
                Now plug in the story&rsquo;s numbers — base rate 1 in 1,000
                (P(sick) = 0.001), and a 99% test (sensitivity 0.99, so a healthy
                person is wrongly flagged with probability 0.01):
              </p>
              <p>
                P(sick | positive) = (0.99 × 0.001) ⁄ (0.99 × 0.001 + 0.01 × 0.999)
                ≈ 0.090, i.e. about <strong>9%</strong>.
              </p>
              <p>
                That&rsquo;s exactly the <em>10 real versus 100 false alarms</em>{" "}from
                before. The top of the fraction is the 10 true positives (0.99 ×
                0.001); the bottom adds the ~100 false alarms (0.01 × 0.999) on top
                of them. Same answer, just written tidily.
              </p>
            </Prose>
          </Reveal>
          <Prose>
            <p>
              And here&rsquo;s the payoff for a second test. Bayes doesn&rsquo;t
              replace your starting number — it <em>updates</em>{" "}it. The first
              positive turns 0.001 into ~0.09. Run a second, independent test and
              you do Bayes again, but now <strong>0.09 is your new base rate</strong>{" "}instead
              of 0.001. Starting from 9% instead of 0.1%, a second positive pushes
              the answer well past 90%.
            </p>
          </Prose>
          <Callout title="The shortcut to remember">
            For a <em>rare</em>{" "}condition, the base rate dominates — a stellar
            sensitivity can&rsquo;t rescue a positive on its own. Bayes is just the
            bookkeeping that keeps the base rate in the math instead of letting your
            gut drop it.
          </Callout>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="Check yourself">
          <div className="flex flex-col gap-4">
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
            <Quiz
              question="For a very rare condition, which dial moves P(sick | positive) the most?"
              options={[
                "The base rate — how common the condition is",
                "The test's sensitivity — how many sick people it catches",
                "The number of people screened",
              ]}
              correct={0}
              explanation="When the thing is rare, the enormous healthy group sets how many false alarms you get, so the base rate dominates the answer. Pushing sensitivity from 99% toward 100% barely budges a positive that's drowning in false alarms."
            />
            <Quiz
              question="Why does a second, independent positive test make you so much more confident than the first one did?"
              options={[
                "Because two tests are simply twice as accurate as one",
                "Because the second test has a different, higher sensitivity",
                "Because you re-run Bayes using the first result (~9%) as the new base rate",
              ]}
              correct={2}
              explanation="Bayes updates rather than replaces. After the first positive your odds are ~9%, and that becomes the starting point for the second test. Starting from 9% instead of 0.1%, a second positive lands you well above 90%."
            />
          </div>
        </Section>
      </StoryColumn>
    </article>
  );
}
