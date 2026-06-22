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
            Gather <strong>23</strong> random people in a room. What are the
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
              <strong>99%</strong> chance of a shared birthday? Most people
              guess hundreds. Lock in a number.
            </p>
          </Prose>
          <Reveal prompt="I've got a number — reveal it">
            <Prose>
              <p>
                Just <strong>57</strong>. And you hit 99.9% by{" "}
                <strong>70</strong>. The curve rockets up far faster than
                intuition expects — because every new person you add compares
                themselves against <em>everyone</em> already there.
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
              share <em>my</em> birthday?&rdquo; That really would need hundreds
              of people. But the actual question is whether <em>any</em> two
              people match, and the number of pairs grows shockingly fast.
            </p>
          </Prose>
          <Callout title="Count the pairs">
            23 people don&rsquo;t make 23 chances — they make{" "}
            <strong>253</strong> pairs (that&rsquo;s 23 × 22 ÷ 2). With 253
            chances for a collision against 365 days, a match around 50% stops
            feeling so impossible.
          </Callout>
          <Prose>
            <p>
              The clean way to compute it is to flip the question: find the
              probability that <em>nobody</em> matches and subtract from 1. Each
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
        <Section eyebrow="Check yourself">
          <Quiz
            question="Why does a room of just 23 people reach a 50% chance of a shared birthday?"
            options={[
              "Because birthdays cluster in certain months",
              "Because you compare every pair — 23 people make 253 pairs",
              "Because 23 is close to half of 365",
            ]}
            correct={1}
            explanation="It's combinatorial. The chance grows with the number of pairs (23 × 22 ÷ 2 = 253), not the number of people. That's why it climbs so much faster than intuition predicts."
          />
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="Where it shows up">
          <Prose>
            <p>
              This isn&rsquo;t just a party trick. The same math powers the{" "}
              <strong>birthday attack</strong> in cryptography: finding two
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
