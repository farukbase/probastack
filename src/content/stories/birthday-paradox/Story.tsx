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
import { BirthdayRoom } from "./components/BirthdayRoom";
import { BirthdayTrials } from "./components/BirthdayTrials";
import { BirthdayCurve } from "./components/BirthdayCurve";

export default function BirthdayParadoxStory() {
  return (
    <article className="pb-20">
      <StoryColumn>
        <Section eyebrow="The hook">
          <Lead>
            Gather <strong>23</strong>{" "}random people in a room. What are the
            odds that two of them share a birthday — same day, same month?
          </Lead>
          <Prose>
            <p>
              With 365 days to go around, 23 people feels nowhere near enough.
              Most guess something small — 5%, maybe 10%. The real answer is
              just over <strong>50%</strong>. It&rsquo;s a literal coin flip.
              Let&rsquo;s feel why.
            </p>
          </Prose>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="Fill the room">
          <Prose>
            <p>
              Drag the slider to change how many people are in the room. The big
              number is the true probability of a shared birthday; the chips
              below are one randomly sampled room — matches light up.
            </p>
          </Prose>
          <Stage caption="Slide to 23 for the 50/50 point. Push to 50 and it's almost certain.">
            <BirthdayRoom />
          </Stage>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="Make a prediction">
          <Prose>
            <p>
              Here&rsquo;s the flip side: how many people would you need for a{" "}
              <strong>99%</strong>{" "}chance of a shared birthday? Most people
              guess hundreds. Lock in a number.
            </p>
          </Prose>
          <Reveal prompt="I've got a number — reveal it">
            <Prose>
              <p>
                Just <strong>57</strong>. And you hit 99.9% by{" "}
                <strong>70</strong>. The curve rockets up far faster than
                intuition expects — because every new person you add compares
                themselves against <em>everyone</em>{" "}already there.
              </p>
            </Prose>
          </Reveal>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="Run a thousand">
          <Prose>
            <p>
              Don&rsquo;t trust the formula — test it. Each trial builds a fresh
              room of 23 random people and checks for a collision.
            </p>
          </Prose>
          <Stage caption="The empirical rate converges right onto the theoretical 50.7%.">
            <BirthdayTrials />
          </Stage>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="The reveal">
          <Lead>
            The trick: it&rsquo;s not about <em>people</em>, it&rsquo;s about{" "}
            <em>pairs</em>.
          </Lead>
          <Prose>
            <p>
              Your gut quietly answers a different question — &ldquo;does someone
              share <em>my</em>{" "}birthday?&rdquo; That really would need hundreds
              of people. But the actual question is whether <em>any</em>{" "}two
              people match, and the number of pairs grows shockingly fast.
            </p>
          </Prose>
          <Callout title="Count the pairs">
            23 people don&rsquo;t make 23 chances — they make{" "}
            <strong>253</strong>{" "}pairs (that&rsquo;s 23 × 22 ÷ 2). With 253
            chances for a collision against 365 days, a match around 50% stops
            feeling so impossible.
          </Callout>
          <Prose>
            <p>
              The clean way to compute it is to flip the question: find the
              probability that <em>nobody</em>{" "}matches and subtract from 1. Each
              new person must dodge all the birthdays already taken —
              <span className="font-mono text-[0.95em]">
                {" "}
                1 − (365/365)(364/365)(363/365)…
              </span>{" "}
              — and that product collapses quickly. Here&rsquo;s the full curve:
            </p>
          </Prose>
          <Stage>
            <BirthdayCurve />
          </Stage>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="The math, gently">
          <Prose>
            <p>
              Here&rsquo;s the trick that makes this tractable: don&rsquo;t count
              the matches — count the <em>opposite</em>. Work out the chance that{" "}
              <em>nobody</em>{" "}shares a birthday, then subtract from 1. That
              path is far easier to build up one person at a time.
            </p>
            <p>
              The first person can land on any day. The second has to dodge that
              one taken day, so they avoid it with probability 364⁄365. The third
              must dodge two days (363⁄365), the fourth three (362⁄365), and so
              on. Multiply those dodges together and you get the probability that
              the whole room stays collision-free.
            </p>
          </Prose>
          <Reveal prompt="Show me the formula">
            <Prose>
              <p>
                <span className="font-mono text-[0.95em]">
                  P(no match) = (365⁄365) × (364⁄365) × … × ((365 − n + 1)⁄365)
                </span>
                , which packs down to{" "}
                <span className="font-mono text-[0.95em]">
                  P(no match) = 365! ⁄ (365ⁿ × (365 − n)!)
                </span>
                . The answer we actually want is the flip side:{" "}
                <span className="font-mono text-[0.95em]">
                  P(at least one match) = 1 − P(no match)
                </span>
                .
              </p>
            </Prose>
          </Reveal>
          <Prose>
            <p>
              So why does it feel so wrong? Because our gut pictures{" "}
              <em>someone matching me</em> — one fixed birthday against the
              crowd. But the real test is whether <em>any</em>{" "}pair matches.
              With n people there are n(n − 1)⁄2 pairs, and that grows fast.
            </p>
          </Prose>
          <Callout title="Count the pairs, not the people">
            At n = 23 there are 23 × 22 ⁄ 2 = <strong>253</strong>{" "}distinct
            pairs — 253 separate chances for a collision. That&rsquo;s why the
            answer is a coin flip, not the tiny number intuition expects.
          </Callout>
          <Prose>
            <p>
              Plug the numbers in and it lands where the slider promised: n = 23
              gives <strong>≈ 50.7%</strong>, and by n = 70 you&rsquo;re at a
              near-certain <strong>≈ 99.9%</strong>. The formula and the
              intuition finally agree.
            </p>
          </Prose>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="Check yourself">
          <div className="flex flex-col gap-4">
            <Quiz
              question="Why does it take only ~23 people, not ~183 (about half of 365), to reach a 50% chance of a shared birthday?"
              options={[
                "Because birthdays cluster in certain months",
                "Because 183 would only be right if you needed every day covered",
                "Because the chance grows with pairs — 23 people make 253 of them",
              ]}
              correct={2}
              explanation="It's the number of pairs that matters, not the number of people. 23 × 22 ÷ 2 = 253 pairs gives 253 chances for a collision, so the probability reaches 50% far sooner than the 'half of 365' guess suggests."
            />
            <Quiz
              question="How is 'does anyone in the room share a birthday?' different from 'does anyone share MY birthday?'"
              options={[
                "The first checks every pair; the second fixes one birthday against the crowd, which really would need hundreds",
                "They're the same question phrased two ways",
                "The second is more likely because your birthday is special",
              ]}
              correct={0}
              explanation="Your gut quietly answers the second, harder question — one fixed date versus everyone. The actual question lets any two people match, which is why far fewer people are needed."
            />
            <Quiz
              question="What's the cleanest way to compute the chance of at least one shared birthday?"
              options={[
                "Add up the probability of each possible matching pair",
                "Find the probability that nobody matches, then subtract it from 1",
                "Multiply 23 by 1/365",
              ]}
              correct={1}
              explanation="Counting the opposite is far easier: each new person must dodge the days already taken (364/365, 363/365, …). Multiply those, then 1 − P(no match) gives the answer."
            />
          </div>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="Where it shows up">
          <Prose>
            <p>
              This isn&rsquo;t just a party trick. The same math powers the{" "}
              <strong>birthday attack</strong>{" "}in cryptography: finding two
              inputs that hash to the same value takes only about{" "}
              <span className="font-mono text-[0.95em]">√N</span> tries, not{" "}
              <span className="font-mono text-[0.95em]">N</span> — which is
              exactly why secure hashes need so many bits. Collisions are always
              closer than they look.
            </p>
          </Prose>
        </Section>
      </StoryColumn>
    </article>
  );
}
