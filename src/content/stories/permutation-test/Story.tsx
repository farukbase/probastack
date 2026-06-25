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
import { TipsSetup } from "./components/TipsSetup";
import { ShuffleTest } from "./components/ShuffleTest";

export default function PermutationTestStory() {
  return (
    <article className="pb-20">
      <StoryColumn>
        <Section eyebrow="The hook">
          <Lead>
            Maria draws a little smiley face on every receipt. She&rsquo;s sure
            it earns her bigger tips. Sam, working the same tables, just rolls
            his eyes: <em>&ldquo;You had a lucky week.&rdquo;</em>
          </Lead>
          <Prose>
            <p>
              They each pull up their tips from the last eight nights to settle
              it. Maria <em>does</em>{" "}have the higher average — but Sam has a
              point too. Eight nights isn&rsquo;t many. Couldn&rsquo;t a gap
              that small just be the luck of the draw? How would you ever{" "}
              <em>know</em>?
            </p>
          </Prose>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="The evidence">
          <Prose>
            <p>
              Here&rsquo;s every night, side by side. Maria&rsquo;s smiley nights
              run a bit higher — her average beats Sam&rsquo;s by{" "}
              <strong>$4.25</strong>{" "}a night.
            </p>
          </Prose>
          <Stage caption="Real money — but is $4.25 a real effect, or a coincidence?">
            <TipsSetup />
          </Stage>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="The big idea">
          <Lead>
            Here&rsquo;s a wonderfully simple way to settle it — no formulas,
            no statistics class. Just a hat.
          </Lead>
          <Prose>
            <p>
              Let&rsquo;s take Sam&rsquo;s side for a moment and assume the
              smiley does <strong>nothing</strong>. If that&rsquo;s true, then
              the labels &ldquo;smiley&rdquo; and &ldquo;no smiley&rdquo; are
              meaningless stickers — every night&rsquo;s tip would&rsquo;ve been
              the same no matter who earned it.
            </p>
            <p>
              So let&rsquo;s test that world. Toss all sixteen nights into a hat,
              shuffle, and randomly deal eight to a pretend &ldquo;Maria&rdquo;
              and eight to a pretend &ldquo;Sam.&rdquo; Measure the gap. That gap
              is <em>pure luck</em>{" "}— we just made the labels up. Do it
              thousands of times and we map out exactly how big a gap luck alone
              tends to cook up.
            </p>
            <p>
              Then the only question left: is Maria&rsquo;s real{" "}
              <strong>$4.25</strong>{" "}gap a normal, everyday luck-gap… or a
              freak one that luck almost never produces?
            </p>
          </Prose>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="Make a prediction">
          <Prose>
            <p>
              Before you shuffle: what&rsquo;s your gut say? Is the smiley real,
              or did Maria just have a good week?
            </p>
          </Prose>
          <Reveal prompt="I've made my call — let's shuffle and find out">
            <Prose>
              <p>
                No peeking at the verdict — go run the shuffles below yourself.
                Watch where Maria&rsquo;s teal line falls in the pile of
                luck-gaps. The answer is in how often luck reaches it.
              </p>
            </Prose>
          </Reveal>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="Shuffle the hat">
          <Prose>
            <p>
              Each shuffle is one imaginary world where the smiley does nothing.
              Build up a few thousand. The bars show every luck-gap; the teal
              line is Maria&rsquo;s real one.
            </p>
          </Prose>
          <Stage caption="The shaded bars to the right of the line are the worlds where luck matched or beat Maria's gap.">
            <ShuffleTest />
          </Stage>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="Reading it">
          <Prose>
            <p>
              Look at that shaded slice — the shuffles where blind luck produced
              a gap as big as Maria&rsquo;s. It&rsquo;s tiny. Out of thousands of
              &ldquo;it&rsquo;s just luck&rdquo; worlds, only a sliver ever
              reached <strong>$4.25</strong>.
            </p>
            <p>
              That fraction has a name: the <strong>p-value</strong>. It&rsquo;s
              simply <em>how often luck alone fakes a result this big</em>. When
              it&rsquo;s small, luck is a poor explanation — so something real is
              probably going on. Maria wins the argument.
            </p>
          </Prose>
          <Callout title="What the p-value is NOT">
            A small p-value doesn&rsquo;t mean the smiley is{" "}
            <em>definitely</em>{" "}the cause, and it&rsquo;s <em>not</em>{" "}&ldquo;the
            chance the smiley does nothing.&rdquo; It only says: <em>if</em>{" "}the
            smiley did nothing, a gap this big would be a rare fluke. With just
            eight nights it&rsquo;s suggestive, not the final word — but the
            smiley effect is real enough that psychologists have measured it for
            decades.
          </Callout>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="The math, gently">
          <Lead>
            We never wrote a formula — but one was quietly running the whole
            time. Here it is, in plain language.
          </Lead>
          <Prose>
            <p>
              Start with the thing we pretended to believe: the{" "}
              <strong>null hypothesis</strong>. It just says the smiley does{" "}
              <em>nothing</em>{" "}— Maria&rsquo;s nights and Sam&rsquo;s nights are
              drawn from the same pile, and the labels are decoration. Everything
              we did was a way to give that boring world a fair hearing.
            </p>
            <p>
              To measure the argument we need a single number — a{" "}
              <strong>test statistic</strong>. Ours is the obvious one: the
              observed difference in group means, Maria&rsquo;s average minus
              Sam&rsquo;s. That came out to <strong>$4.25</strong>. Big numbers
              are suspicious for the null; near-zero numbers are comfortable for
              it.
            </p>
            <p>
              Now the clever part. <em>If</em>{" "}the labels truly don&rsquo;t
              matter, then any relabeling of the sixteen nights is just as
              legitimate as the real one — every shuffle is equally likely. So we
              shuffle, recompute the difference, and write it down. Repeat
              thousands of times and the pile of fake gaps traces out exactly
              what pure chance tends to produce. That pile is the{" "}
              <strong>null distribution</strong>.
            </p>
            <p>
              The <strong>p-value</strong>{" "}is then just a count: of all those
              shuffled worlds, what fraction reached a gap as big as the one we
              actually saw?
            </p>
          </Prose>
          <Reveal prompt="Show me the formula">
            <Prose>
              <p style={{ textAlign: "center" }}>
                p = (shuffles with difference ≥ observed) ⁄ (total shuffles)
              </p>
              <p>
                Read it left to right: numerator is how many imaginary, label-shuffled
                worlds matched or beat Maria&rsquo;s real <strong>$4.25</strong>{" "}gap;
                denominator is how many worlds we tried. A small ratio means luck
                almost never gets this far on its own.
              </p>
            </Prose>
          </Reveal>
          <Prose>
            <p>
              If this smells like a <em>t</em>-test, it&rsquo;s a cousin — but a
              more honest one here. The <em>t</em>-test assumes the data follow a
              tidy bell curve; the permutation test assumes no such thing and
              simply <strong>resamples</strong>{" "}the data you actually have.
            </p>
          </Prose>
          <Callout title="The whole idea in one line">
            Build the world where nothing is going on, see what gaps it coughs up
            by chance, and ask how often that chance reaches what you observed. A
            rare reach (small p) is evidence the null is wrong.
          </Callout>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="Check yourself">
          <div className="flex flex-col gap-4">
            <Quiz
              question="The shaded slice (the p-value) came out around 4%. What does that actually tell us?"
              options={[
                "If the smiley did nothing, luck would fake a gap this big only ~4% of the time — so the effect is probably real",
                "There's a 4% chance the smiley does nothing",
                "Maria earned 4% more than Sam",
              ]}
              correct={0}
              explanation="The p-value is about luck, not certainty. It measures how often pure chance would produce a result this extreme if there were no real effect. Small means 'luck is a lousy explanation' — strong evidence something real is happening. It is NOT the probability that the effect is fake."
            />
            <Quiz
              question="In this test, what does the null hypothesis actually claim?"
              options={[
                "Maria's smiley earns her bigger tips",
                "Sam is a worse waiter than Maria",
                "The smiley does nothing — both nights come from the same pile and the labels are just decoration",
                "The p-value will be small",
              ]}
              correct={2}
              explanation="The null hypothesis is the 'nothing is going on' world. It says the smiley has no effect, so the two groups are really one pile and the labels are interchangeable. The entire shuffle is a way to simulate that world and see what it produces by chance."
            />
            <Quiz
              question="Why is it fair to shuffle the labels thousands of times to build the null distribution?"
              options={[
                "Because shuffling makes Maria's gap bigger",
                "Because if the labels truly don't matter, every relabeling is equally likely — so each shuffle is a legitimate 'pure luck' world",
                "Because the data follow a normal distribution",
              ]}
              correct={1}
              explanation="Shuffling only makes sense under the null. If the smiley does nothing, the labels are meaningless, so any way of dealing the nights into two groups is equally valid. Repeating it many times maps out exactly what gaps chance alone tends to create."
            />
            <Quiz
              question="What does the permutation test NOT require, unlike a classic t-test?"
              options={[
                "A clearly defined test statistic",
                "Two groups to compare",
                "An observed difference to measure",
                "An assumption that the data follow a normal (bell-curve) distribution",
              ]}
              correct={3}
              explanation="The t-test leans on the data being roughly normal. The permutation test makes no such assumption — it just reshuffles the real data over and over. It still needs a statistic, two groups, and an observed difference; it simply skips the normality requirement."
            />
          </div>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="Where it shows up">
          <Prose>
            <p>
              You just ran a <strong>permutation test</strong>{" "}— and the exact
              same shuffle settles far bigger arguments. Did the new checkout
              button really boost sales, or was it a good week? Did the new drug
              actually beat the placebo? Did the redesign lift sign-ups? Every
              time, it&rsquo;s the same hat: pool the results, shuffle the
              labels thousands of times, and ask how often luck alone could fake
              what you saw. No formula required — just the courage to shuffle.
            </p>
          </Prose>
        </Section>
      </StoryColumn>
    </article>
  );
}
