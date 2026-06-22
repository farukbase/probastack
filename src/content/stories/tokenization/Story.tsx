import {
  StoryColumn,
  Section,
  Lead,
  Prose,
  Stage,
  Callout,
} from "@/components/story/StoryShell";
import { Quiz } from "@/components/interactive/Quiz";
import { Tokenizer } from "./components/Tokenizer";

export default function TokenizationStory() {
  return (
    <article className="pb-20">
      <StoryColumn>
        <Section eyebrow="The hook">
          <Lead>
            Ask ChatGPT how many times the letter <strong>r</strong> appears in
            &ldquo;strawberry,&rdquo; and it often gets it wrong. A machine that
            can write essays and code… miscounts letters in a word a child can
            spell. Why?
          </Lead>
          <Prose>
            <p>
              The answer is that an AI never actually sees the letters. Before a
              single word reaches the model, the text is chopped into pieces
              called <strong>tokens</strong> — and the model only ever sees those
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
              <strong>Common words stay whole.</strong> &ldquo;the,&rdquo;
              &ldquo;sentence,&rdquo; &ldquo;read&rdquo; — each is a single token,
              because the model has seen them a billion times.
            </p>
            <p>
              <strong>Rare or long words shatter.</strong> Something like
              &ldquo;tokenization&rdquo; becomes &ldquo;token&rdquo; +
              &ldquo;ization.&rdquo; The model stitches meaning back together from
              fragments.
            </p>
            <p>
              <strong>Numbers break into chunks,</strong> and a space is usually
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
              <em>measured</em> in. A model&rsquo;s &ldquo;context window&rdquo;
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
        <Section eyebrow="Check yourself">
          <Quiz
            question="Why does an AI struggle to count the letters in a word like 'strawberry'?"
            options={[
              "It isn't smart enough to count to three",
              "It never sees individual letters — the word arrives as a few multi-letter tokens",
              "Strawberry is spelled differently in its training data",
            ]}
            correct={1}
            explanation="The model only ever sees tokens, not letters. 'strawberry' comes in as a couple of chunks, so the individual r's aren't visible to count. This same fact explains its trouble with spelling and long-number math."
          />
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
