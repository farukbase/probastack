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
              <strong>model</strong>{" "}— a simple rule that turns an input (hours)
              into a prediction (score). The whole game is finding the{" "}
              <em>right</em>{" "}line.
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
                Hit <strong>&ldquo;Let it learn&rdquo;</strong>{" "}above. Watch the
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
              <strong>gradient descent</strong>{" "}— and it&rsquo;s the engine
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
        <Section eyebrow="The math, gently">
          <Prose>
            <p>
              None of this needs scary symbols, but a peek under the hood is
              worth it. The line you dragged is just{" "}
              <strong>ŷ = b + m·x</strong>: pick an intercept{" "}
              <em>b</em>{" "}(where the line starts) and a slope <em>m</em>{" "}(how
              steeply it climbs), feed in an <em>x</em> (hours), and out comes
              ŷ, your prediction.
            </p>
            <p>
              For any real point, the <strong>residual</strong>{" "}is the
              vertical gap between what actually happened and what the line
              guessed: residual = yᵢ − ŷᵢ. Those are the little red lines in the
              lab. Some points sit above the line, some below — so the errors
              come with plus and minus signs.
            </p>
            <p>
              To score a whole line with one number, we use{" "}
              <strong>Mean Squared Error</strong>. We square every residual,
              then average them. Squaring does two nice things at once: it
              throws away the sign (an error of −3 and +3 both count the same),
              and it punishes big misses far more than small ones.
            </p>
          </Prose>
          <Reveal prompt="Show me the formula">
            <Prose>
              <p>
                MSE = (1⁄n) Σ (yᵢ − ŷᵢ)². <strong>Least squares</strong>{" "}is
                simply the one line that makes this number as small as it can
                possibly go — and beautifully, you don&rsquo;t have to search
                for it. There&rsquo;s a clean closed-form answer: the slope is{" "}
                <em>m ≈ covariance(x, y) ⁄ variance(x)</em>, and the intercept{" "}
                <em>b</em>{" "}follows so that the line passes exactly through the
                average x and average y. Plug in, done.
              </p>
            </Prose>
          </Reveal>
          <Prose>
            <p>
              But what if you couldn&rsquo;t solve it directly — too many knobs,
              too messy a rule? Then you&rsquo;d do what the lab&rsquo;s
              &ldquo;Let it learn&rdquo; button does: start anywhere, check which
              way tilting <em>m</em>{" "}and lifting <em>b</em>{" "}makes the error
              drop, and take a small step that way. Repeat until you reach the
              bottom of the error surface. That &ldquo;roll downhill&rdquo; move
              is gradient descent — the exact same idea that trains models with
              billions of knobs.
            </p>
          </Prose>
          <Callout title="The whole recipe">
            Write the rule (ŷ = b + m·x), measure how wrong it is (MSE), and find
            the knobs that make that number smallest — either in one clean
            formula or by rolling downhill. Bigger models change the rule and add
            knobs, but never the recipe.
          </Callout>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="Check yourself">
          <div className="flex flex-col gap-4">
            <Quiz
              question="When a model 'learns,' what is it actually doing?"
              options={[
                "Adjusting its knobs (like slope and intercept) to make its total error as small as possible",
                "Memorizing every data point exactly",
                "Looking up the answer in a database",
              ]}
              correct={0}
              explanation="Learning = tuning the model's parameters to minimize a measure of error. For a line that's just slope and intercept; for a neural net it's billions of weights — but it's the same downhill chase toward less error (gradient descent)."
            />
            <Quiz
              question="In ŷ = b + m·x, what does the slope m actually tell you?"
              options={[
                "The prediction when x is zero",
                "How far each point sits above or below the line",
                "How much ŷ changes for each one-unit increase in x",
              ]}
              correct={2}
              explanation="The slope m is the rate of change: bump x up by one (one more hour studied) and the prediction ŷ moves by m. The intercept b is the value at x = 0, and the gaps between points and the line are the residuals."
            />
            <Quiz
              question="Why does Mean Squared Error square the residuals instead of just adding them up?"
              options={[
                "Squaring makes the formula run faster on a computer",
                "Without squaring, positive and negative errors cancel out — and squaring also punishes big misses more",
                "It guarantees the line passes through every single point",
              ]}
              correct={1}
              explanation="If you just summed yᵢ − ŷᵢ, a +3 error and a −3 error would cancel to zero and a terrible line could look perfect. Squaring removes the sign so errors always add up, and it weighs big misses far more heavily than small ones."
            />
          </div>
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
