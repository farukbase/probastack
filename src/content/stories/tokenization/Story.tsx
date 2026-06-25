import {
  StoryColumn,
  Section,
  Lead,
  Prose,
  Stage,
  Callout,
} from "@/components/story/StoryShell";
import { Reveal } from "@/components/story/Reveal";
import { M } from "@/components/story/Math";
import { Quiz } from "@/components/interactive/Quiz";
import { Tokenizer } from "./components/Tokenizer";

export default function TokenizationStory() {
  return (
    <article className="pb-20">
      <StoryColumn>
        <Section eyebrow="The hook">
          <Lead>
            Ask ChatGPT how many times the letter <strong>r</strong>{" "}appears in
            &ldquo;strawberry,&rdquo; and it often gets it wrong. A machine that
            can write essays and code… miscounts letters in a word a child can
            spell. Why?
          </Lead>
          <Prose>
            <p>
              The answer is that an AI never actually sees the letters. Before a
              single word reaches the model, the text is chopped into pieces
              called <strong>tokens</strong>{" "}— and the model only ever sees those
              pieces. Let&rsquo;s look at the text the way it does.
            </p>
          </Prose>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="See the pieces">
          <Prose>
            <p>
              Type anything below. Each colored chunk is one token. Try the
              presets — watch what happens to a long word, a big number, and
              poor &ldquo;strawberry.&rdquo;
            </p>
          </Prose>
          <Stage caption="␣ marks a space — notice spaces usually ride along with the word that follows.">
            <Tokenizer />
          </Stage>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="What you're seeing">
          <Prose>
            <p>
              A few patterns jump out once you play with it:
            </p>
            <p>
              <strong>Common words stay whole.</strong>{" "}&ldquo;the,&rdquo;
              &ldquo;sentence,&rdquo; &ldquo;read&rdquo; — each is a single token,
              because the model has seen them a billion times.
            </p>
            <p>
              <strong>Rare or long words shatter.</strong>{" "}Something like
              &ldquo;tokenization&rdquo; becomes &ldquo;token&rdquo; +
              &ldquo;ization.&rdquo; The model stitches meaning back together from
              fragments.
            </p>
            <p>
              <strong>Numbers break into chunks,</strong>{" "}and a space is usually
              glued to the front of the next word. To the AI, &ldquo;
              cat&rdquo; (with a space) and &ldquo;cat&rdquo; are different
              tokens entirely.
            </p>
          </Prose>
          <Callout title="Mystery solved: strawberry">
            Because &ldquo;strawberry&rdquo; arrives as a couple of chunks — not
            ten separate letters — the model has no clean view of the individual{" "}
            <strong>r</strong>&rsquo;s to count. It&rsquo;s not dumb; it&rsquo;s
            literally not looking at letters. The same blind spot explains why
            LLMs fumble spelling, rhymes, and arithmetic on long numbers.
          </Callout>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="Why it matters">
          <Prose>
            <p>
              Tokens aren&rsquo;t just trivia — they&rsquo;re the unit AI is{" "}
              <em>measured</em>{" "}in. A model&rsquo;s &ldquo;context window&rdquo;
              (how much it can read at once) and your bill from the API are both
              counted in tokens, not words. And because English packs more words
              per token than most languages, the same paragraph in, say, Turkish
              or Japanese can cost noticeably more to process. The humble token
              quietly sets the price and the memory of modern AI.
            </p>
          </Prose>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="Under the hood">
          <Prose>
            <p>
              So why chop text into these odd pieces at all? The obvious idea —
              give every <strong>whole word</strong>{" "}its own token — falls apart
              fast. There are millions of words across the world&rsquo;s
              languages, plus names, typos, slang, and brand-new coinages every
              day. A vocabulary that big would be unwieldy, and it would{" "}
              <em>still</em>{" "}choke the first time it met a word it had never
              seen. The opposite extreme — one token per{" "}
              <strong>single character</strong>{" "}— never hits an unknown letter,
              but it makes every sentence enormously long, and the model has to
              work much harder to find meaning in a soup of individual letters.
            </p>
            <p>
              The winning compromise is <strong>subword tokenization</strong>.
              The most common recipe is <strong>Byte-Pair Encoding</strong>{" "}(BPE):
              start with plain characters, then repeatedly find the most frequent
              adjacent pair and merge it into a new chunk. Do this thousands of
              times and you grow a vocabulary of handy building blocks — pieces
              like &ldquo;ing,&rdquo; &ldquo;tion,&rdquo; and &ldquo; the.&rdquo;
              Words you see constantly end up as a single token; rare ones get
              spelled out from smaller pieces. Best of both worlds: short
              sequences for common text, and nothing is ever truly unknown.
            </p>
            <Reveal prompt="See a merge in action">
              <Prose>
                <p>
                  Imagine the training text is full of the word{" "}
                  &ldquo;lower.&rdquo; We start from characters:{" "}
                  <code>l o w e r</code>. The pair <code>e r</code>{" "}shows up
                  everywhere, so it gets merged first → <code>l o w er</code>.
                  Next, <code>o w</code>{" "}is common, so → <code>l ow er</code>,
                  then <code>l ow</code>{" "}→ <code>low er</code>. After a few
                  passes the model has learned the reusable chunks{" "}
                  &ldquo;low&rdquo; and &ldquo;er&rdquo; — which it can now snap
                  together for &ldquo;lower,&rdquo; &ldquo;slower,&rdquo; and{" "}
                  &ldquo;flower&rdquo; alike.
                </p>
              </Prose>
            </Reveal>
            <p>
              A useful rule of thumb:{" "}
              <M>{String.raw`1\ \text{token} \approx \tfrac{3}{4}\ \text{English word}`}</M>,
              so roughly 100 tokens ≈ 75 words. It&rsquo;s only an average —
              short common words are one token, while a clunky technical term may
              be three or four — but it&rsquo;s close enough to estimate with.
            </p>
          </Prose>
          <Callout title="Why you should care">
            Both the things you pay for — the <strong>context window</strong>{" "}(how
            much the model can hold in mind) and your <strong>bill</strong>{" "}— are
            counted in tokens, not words or characters. So the way text gets
            split has real consequences: a token-hungry language can express the
            same idea in more tokens, which means it fills the window faster and
            costs more to run.
          </Callout>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="Check yourself">
          <div className="flex flex-col gap-4">
            <Quiz
              question="Why do modern models use subword tokens instead of giving every whole word its own token?"
              options={[
                "Whole-word tokens make sentences too long to process",
                "Single characters are easier for the model to read",
                "A whole-word vocabulary would be huge and still break on new, rare, or misspelled words",
              ]}
              correct={2}
              explanation="There are too many possible words to list them all, and a fixed word list still fails the moment it meets something new. Subwords keep the vocabulary manageable and let the model spell out any rare word from familiar pieces."
            />
            <Quiz
              question="Roughly how many English words fit in 100 tokens?"
              options={[
                "About 75 words — a token is, on average, about three-quarters of a word",
                "About 400 words — a token usually covers a whole sentence",
                "Exactly 100 words — one token always equals one word",
              ]}
              correct={0}
              explanation="A handy rule of thumb is 1 token ≈ ¾ of an English word, so ~100 tokens ≈ 75 words. It's only an average, but it's close enough to estimate context limits and API costs."
            />
          </div>
        </Section>
      </StoryColumn>

      <StoryColumn>
        <Section eyebrow="Where it shows up">
          <Prose>
            <p>
              Every time you chat with an AI, write a prompt, or pay for an API
              call, tokens are the currency changing hands. Knowing they exist is
              the first real step from &ldquo;AI is magic&rdquo; to &ldquo;AI is a
              system I can reason about&rdquo; — and it&rsquo;s the doorway into
              everything that follows: embeddings, attention, and how these
              models actually predict what comes next.
            </p>
          </Prose>
          <Callout title="A note on this demo">
            The tokenizer above is a <em>simplified illustration</em>. Real
            models (like GPT) learn their exact vocabulary of tokens from massive
            amounts of text, so their splits differ in the details — but the
            behavior you just explored (whole common words, shattered rare ones,
            attached spaces, chunked numbers) is true to the real thing.
          </Callout>
        </Section>
      </StoryColumn>
    </article>
  );
}
