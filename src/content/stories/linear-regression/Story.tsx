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
import { RegressionLab } from "./components/RegressionLab";

export default function LinearRegressionStory() {
  return (
    <article className="pb-20">
      <StoryColumn>
        <Section eyebrow="The hook">
          <Lead>
            Ten students told us how many hours they studied and what they
            scored. The dots clearly drift upward — more hours, higher marks. So
            here&rsquo;s a question: if a friend studied for 7 hours, what would
            you bet they scored?
          </Lead>
          <Prose>
            <p>
              To answer, you&rsquo;d mentally draw a line through the cloud of
              dots and read off the height at 7. That line is a{" "}
              <strong>model</strong> — a simple rule that turns an input (hours)
              into a prediction (score). The whole game is finding the{" "}
              <em>right</em> line.
            </p>
          </Prose>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="Fit it by hand">
          <Prose>
            <p>
              Try it. Use the two sliders to tilt and lift the line until it
              slices through the dots as snugly as you can. The red lines show
              how far off each prediction is; the <strong>total error</strong>{" "}
              adds up their squares.
            </p>
          </Prose>
          <Stage caption="Hunt for the smallest total error you can find by hand.">
            <RegressionLab />
          </Stage>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="What 'best' means">
          <Prose>
            <p>
              Notice you weren&rsquo;t fitting by vibes — you had a{" "}
              <em>target</em>: make the total error as small as possible. That
              single number turns &ldquo;draw a good line&rdquo; into a precise,
              solvable problem. The best line is simply the one where the error
              can&rsquo;t shrink any further.
            </p>
          </Prose>
          <Reveal prompt="Think you found the best line? Let the machine try">
            <Prose>
              <p>
                Hit <strong>&ldquo;Let it learn&rdquo;</strong> above. Watch the
                line slide into place as the error drops to its lowest possible
                value. The machine isn&rsquo;t doing anything mystical — it&rsquo;s
                nudging the line downhill, again and again, until error stops
                improving.
              </p>
            </Prose>
          </Reveal>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="The reveal">
          <Lead>
            That&rsquo;s machine learning, stripped to its bones: pick a rule
            with some knobs, define what &ldquo;wrong&rdquo; means, and turn the
            knobs to be less wrong.
          </Lead>
          <Prose>
            <p>
              The downhill nudging has a name —{" "}
              <strong>gradient descent</strong> — and it&rsquo;s the engine
              underneath almost everything, from this two-knob line to a
              language model with billions of knobs. The numbers get
              astronomically bigger; the idea stays exactly this small.
            </p>
          </Prose>
          <Callout title="Where the line stops">
            A straight line can only capture a straight relationship. Real models
            swap it for bendier rules with more knobs to fit curvier patterns —
            but they all learn the same way you just watched: by chasing a
            smaller error, one nudge at a time.
          </Callout>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="Check yourself">
          <Quiz
            question="When a model 'learns,' what is it actually doing?"
            options={[
              "Memorizing every data point exactly",
              "Adjusting its knobs (like slope and intercept) to make its total error as small as possible",
              "Looking up the answer in a database",
            ]}
            correct={1}
            explanation="Learning = tuning the model's parameters to minimize a measure of error. For a line that's just slope and intercept; for a neural net it's billions of weights — but it's the same downhill chase toward less error (gradient descent)."
          />
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="Where it shows up">
          <Prose>
            <p>
              This one idea — fit a rule by minimizing error — predicts house
              prices from square footage, demand from price, risk from history,
              and a thousand other things. Master the line and you&rsquo;ve got
              the seed of every model that follows: the only real difference is
              how many knobs there are, and how bendy the rule is allowed to be.
            </p>
          </Prose>
        </Section>
      </StoryColumn>
    </article>
  );
}
