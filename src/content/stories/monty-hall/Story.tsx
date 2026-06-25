import {
  StoryColumn,
  Section,
  Lead,
  Prose,
  Stage,
  Callout,
} from "@/components/story/StoryShell";
import { Reveal } from "@/components/story/Reveal";
import { VideoEmbed } from "@/components/story/VideoEmbed";
import { Quiz } from "@/components/interactive/Quiz";
import { DoorGame } from "./components/DoorGame";
import { MontyHallSim } from "./components/MontyHallSim";
import { SwitchOutcomeGrid } from "./components/SwitchOutcomeGrid";

/**
 * The Monty Hall story. A server component that arranges prose and interactive
 * islands. It uses the shell primitives loosely — beats flow as the story
 * needs, not as a fixed 11-step checklist.
 */
export default function MontyHallStory() {
  return (
    <article className="pb-20">
      <StoryColumn>
        <Section eyebrow="The hook">
          <Lead>
            You&rsquo;re on a game show. Three doors. Behind one is a car;
            behind the other two, goats. You point at a door — and then the
            host, who knows where the car is, swings open a <em>different</em>{" "}
            door to reveal a goat.
          </Lead>
          <Prose>
            <p>
              Now the offer: stick with your door, or switch to the last
              unopened one. Most people feel it&rsquo;s a coin flip — two doors
              left, 50/50, why bother moving? Hold onto that feeling. We&rsquo;re
              about to test it.
            </p>
          </Prose>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="On the big screen">
          <Prose>
            <p>
              You may have seen this exact puzzle before. In the movie{" "}
              <em>21</em>, an MIT professor springs it on a student to test
              whether he&rsquo;ll think or just guess. Watch how fast intuition
              and probability part ways:
            </p>
          </Prose>
          <Stage caption="From the film 21 (2008) — the Monty Hall problem, dramatized.">
            <VideoEmbed id="CYyUuIXzGgI" title="21 (2008) — the Monty Hall problem" />
          </Stage>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="Play it yourself">
          <Prose>
            <p>
              Don&rsquo;t take anyone&rsquo;s word for it — play a few rounds.
              Pick a door, see the host reveal a goat, then choose. Keep an eye
              on the two tallies at the bottom.
            </p>
          </Prose>
          <Stage caption="Play 10–15 rounds. Try staying for a streak, then switching for a streak.">
            <DoorGame />
          </Stage>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="Make a prediction">
          <Prose>
            <p>
              Before the math: if you played <strong>a thousand</strong>{" "}games
              always switching, what win rate would you expect? Commit to a
              number in your head.
            </p>
          </Prose>
          <Reveal prompt="I’ve got my guess — reveal the truth">
            <Prose>
              <p>
                Switching wins about <strong>two-thirds</strong>{" "}of the time.
                Staying wins about one-third. Not 50/50 — not even close. Let the
                simulator settle the argument.
              </p>
            </Prose>
          </Reveal>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="Run a thousand">
          <Stage caption="The law of large numbers doing its job, live.">
            <MontyHallSim />
          </Stage>
          <Prose>
            <p>
              The more trials you run, the tighter the rates lock onto 1⁄3 and
              2⁄3. So where does the missing intuition go? Why isn&rsquo;t it a
              coin flip?
            </p>
          </Prose>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="The reveal">
          <Lead>
            The trick is that the host isn&rsquo;t opening a door at random — he
            knows where the car is, and he&rsquo;ll only ever reveal a goat.
          </Lead>
          <Prose>
            <p>
              Your first pick was right 1⁄3 of the time and wrong 2⁄3 of the
              time. The host&rsquo;s reveal doesn&rsquo;t change that — but it
              quietly sweeps the entire 2⁄3 of &ldquo;you were wrong&rdquo; onto
              the single remaining door. Look at all three equally likely cases:
            </p>
          </Prose>
          <Stage>
            <SwitchOutcomeGrid />
          </Stage>
          <Prose>
            <p>
              Switching turns every &ldquo;you first grabbed a goat&rdquo; into a
              win — and that happens twice as often as grabbing the car. The host
              hands you the 2⁄3 he was holding.
            </p>
          </Prose>
          <Callout title="The real lesson">
            The host&rsquo;s action carries <em>information</em>. He had to avoid
            the car, so <em>which</em>{" "}door he opens is a clue — and conditioning
            on that clue is exactly Bayesian updating. Your gut ignored the clue;
            that&rsquo;s the trap.
          </Callout>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="The math, gently">
          <Prose>
            <p>
              Let&rsquo;s put numbers on the gut feeling. When you first point at
              a door, you&rsquo;re right with probability <strong>1⁄3</strong>{" "}
              and wrong with probability <strong>2⁄3</strong>. That split is
              fixed the instant you choose — before the host touches anything.
            </p>
            <p>
              Now the &ldquo;always switch&rdquo; rule: switching wins{" "}
              <em>exactly</em>{" "}when your first pick was a goat. That happens
              2⁄3 of the time. So switching wins 2⁄3 and staying wins 1⁄3 —
              they&rsquo;re just the two outcomes of that very first guess, seen
              from opposite sides.
            </p>
          </Prose>
          <Reveal prompt="Show the 1⁄3 vs 2⁄3 breakdown">
            <Prose>
              <p>
                Across the three equally likely first picks — car, goatA, goatB
                — switching <em>loses</em>{" "}once (when you started on the car)
                and <em>wins</em>{" "}twice (when you started on a goat). Two wins,
                one loss: 2⁄3.
              </p>
              <p>
                Why is the host&rsquo;s reveal informative? Because he{" "}
                <em>must</em>{" "}avoid the car. A random door-opener would
                sometimes expose the car and ruin the game; this host never
                does. That constraint is a Bayes update — the reveal carries
                information, and it concentrates the whole 2⁄3 onto the one
                door he left closed:
              </p>
              <p>
                P(car behind other door | host opened a goat) = 2⁄3 ≈ 0.667
              </p>
            </Prose>
          </Reveal>
          <Callout title="The takeaway">
            Staying bets on your first guess being right (1⁄3). Switching bets
            on it having been wrong (2⁄3) — and lets the host&rsquo;s
            constrained reveal cash that bet in. Twice as good, every time.
          </Callout>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="Check yourself">
          <div className="flex flex-col gap-4">
            <Quiz
              question="Suppose there are 100 doors. You pick one, and the host opens 98 goats, leaving yours and one other. Switch or stay?"
              options={[
                "Stay — it’s now 50/50",
                "Switch — the other door is almost certainly the car",
                "It doesn’t matter",
              ]}
              correct={1}
              explanation="Your first pick had a 1/100 chance. The host concentrated the other 99/100 onto that single remaining door. Switching wins 99% of the time — the same logic as three doors, just louder."
            />
            <Quiz
              question="What is it about the host’s action that makes the reveal informative?"
              options={[
                "He opens the door slowly, building suspense",
                "He picks a door uniformly at random from all three",
                "He knows where the car is and will only ever open a goat",
              ]}
              correct={2}
              explanation="The information comes from the host’s constraint, not the act of opening a door. Because he knows where the car is and must avoid it, the door he leaves closed is a filtered, non-random choice — that’s what concentrates the 2⁄3 onto it."
            />
            <Quiz
              question="Now suppose the host opened a door at RANDOM and just happened to reveal a goat. Given that, what are your odds if you switch?"
              options={[
                "50/50 — with a random reveal, switching and staying tie",
                "2⁄3 — switching still wins, same as before",
                "1⁄3 — staying is now strictly better",
              ]}
              correct={0}
              explanation="When the reveal is random (and merely happened to be a goat), no constraint was applied, so no extra information lands on the other door. The two remaining doors are genuinely 50/50. The classic 2⁄3 edge depends entirely on the host knowing — and avoiding — the car."
            />
          </div>
        </Section>
      </StoryColumn>
    </article>
  );
}
