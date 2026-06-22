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
              Before the math: if you played <strong>a thousand</strong> games
              always switching, what win rate would you expect? Commit to a
              number in your head.
            </p>
          </Prose>
          <Reveal prompt="I’ve got my guess — reveal the truth">
            <Prose>
              <p>
                Switching wins about <strong>two-thirds</strong> of the time.
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
            the car, so <em>which</em> door he opens is a clue — and conditioning
            on that clue is exactly Bayesian updating. Your gut ignored the clue;
            that&rsquo;s the trap.
          </Callout>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="Check yourself">
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
        </Section>
      </StoryColumn>
    </article>
  );
}
