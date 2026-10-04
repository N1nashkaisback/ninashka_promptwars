import { useState } from "react";
import { reflectOnThinking } from "./ai";

const challenges = {
  assumption: {
    title: "Challenge an assumption",
    text: "What evidence do you have that this assumption is true, rather than simply likely or convenient?",
  },
  perspective: {
    title: "Show another perspective",
    text: "Imagine someone you trust strongly disagreed with your reasoning. What might they notice that you currently don't?",
  },
  missing: {
    title: "What am I missing?",
    text: "Which important piece of information could realistically change your decision?",
  },
  harder: {
    title: "Ask me a harder question",
    text: "If this decision went badly six months from now, what would you wish you had questioned today?",
  },
};

function Section({ icon, title, items }) {
  if (!items?.length) return null;

  return (
    <section className="mb-10">
      <div className="mb-4 flex items-center gap-3">
        <span className="text-xl">{icon}</span>
        <h2 className="text-lg font-semibold tracking-tight text-stone-900">
          {title}
        </h2>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
          >
            <h3 className="font-medium text-stone-900">
              {item.factor || item.question}
            </h3>

            {item.why && (
              <p className="mt-2 text-sm leading-6 text-stone-500">
                {item.why}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const [decision, setDecision] = useState("");
  const [reasoning, setReasoning] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [challenge, setChallenge] = useState(null);

  async function handleReflect(e) {
    e.preventDefault();

    if (!decision.trim() || !reasoning.trim()) return;

    setLoading(true);
    setChallenge(null);

    try {
      const result = await reflectOnThinking(decision, reasoning);
      setAnalysis(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function startAgain() {
    setDecision("");
    setReasoning("");
    setAnalysis(null);
    setChallenge(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleChallenge(type) {
    setChallenge(challenges[type]);
  }

  return (
    <main className="min-h-screen bg-[#f7f4ed] text-stone-900">
      {/* HEADER */}
      <header className="border-b border-stone-200/80 bg-[#f7f4ed]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <button
            onClick={startAgain}
            className="text-xl font-semibold tracking-[0.22em] text-stone-900"
          >
            MIRROR
          </button>

          <span className="text-xs uppercase tracking-[0.2em] text-stone-400">
            Thinking companion
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-12">
        {!analysis ? (
          /* INPUT */
          <div className="mx-auto max-w-3xl">
            <div className="mb-12">
              <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-stone-400">
                See what you might be missing.
              </p>

              <h1 className="max-w-2xl text-5xl font-medium leading-[1.05] tracking-tight text-stone-900 md:text-6xl">
                Before you decide,
                <span className="text-stone-400"> reflect.</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-stone-500">
                MIRROR helps you examine your reasoning, question assumptions,
                and notice what you may have overlooked.
              </p>
            </div>

            <form
              onSubmit={handleReflect}
              className="rounded-3xl border border-stone-200 bg-white p-6 shadow-[0_20px_60px_rgba(60,50,40,0.06)] md:p-8"
            >
              <label className="block">
                <span className="text-sm font-medium text-stone-800">
                  What are you deciding?
                </span>

                <textarea
                  value={decision}
                  onChange={(e) => setDecision(e.target.value)}
                  placeholder="e.g. Should I accept this 6-month internship?"
                  rows={3}
                  className="mt-3 w-full resize-none rounded-2xl border border-stone-200 bg-[#faf9f6] p-4 text-base outline-none transition focus:border-stone-400 focus:ring-2 focus:ring-stone-100"
                />
              </label>

              <label className="mt-6 block">
                <span className="text-sm font-medium text-stone-800">
                  Why are you leaning this way?
                </span>

                <textarea
                  value={reasoning}
                  onChange={(e) => setReasoning(e.target.value)}
                  placeholder="Tell MIRROR what matters to you, what you're worried about, and why this option seems attractive."
                  rows={6}
                  className="mt-3 w-full resize-none rounded-2xl border border-stone-200 bg-[#faf9f6] p-4 text-base outline-none transition focus:border-stone-400 focus:ring-2 focus:ring-stone-100"
                />
              </label>

              <button
                type="submit"
                disabled={loading || !decision.trim() || !reasoning.trim()}
                className="mt-7 w-full rounded-2xl bg-stone-900 px-6 py-4 text-sm font-medium text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? "Reading your reasoning…" : "Reflect on my thinking →"}
              </button>

              <p className="mt-4 text-center text-xs text-stone-400">
                MIRROR doesn't decide for you. It helps you think more clearly.
              </p>
            </form>
          </div>
        ) : (
          /* ANALYSIS */
          <div>
            <div className="mb-12 max-w-3xl">
              <p className="mb-4 text-sm uppercase tracking-[0.2em] text-stone-400">
                Your reflection
              </p>

              <h1 className="text-4xl font-medium tracking-tight md:text-5xl">
                Here’s what MIRROR noticed.
              </h1>

              <div className="mt-7 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone-400">
                  Your decision
                </p>

                <p className="mt-3 text-xl leading-8 text-stone-800">
                  {decision}
                </p>

                <div className="my-6 h-px bg-stone-100" />

                <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone-400">
                  Your reasoning
                </p>

                <p className="mt-3 leading-7 text-stone-500">{reasoning}</p>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <Section
                  icon="🪞"
                  title="What you're prioritizing"
                  items={analysis.priorities}
                />

                <Section
                  icon="🔍"
                  title="Blind spots"
                  items={analysis.blindSpots}
                />

                <Section
                  icon="🧠"
                  title="Assumptions"
                  items={analysis.assumptions}
                />

                <Section
                  icon="⚖️"
                  title="Trade-offs"
                  items={analysis.tradeOffs}
                />

                <Section
                  icon="🧩"
                  title="Before you decide"
                  items={analysis.beforeYouDecide}
                />

                <Section
                  icon="❓"
                  title="Questions worth asking yourself"
                  items={analysis.questions}
                />

                <Section
                  icon="👁"
                  title="Alternative perspectives"
                  items={analysis.alternativePerspectives}
                />
              </div>

              {/* CHALLENGE */}
              {/* CHALLENGE */}
<aside className="lg:sticky lg:top-8 lg:self-start">
  <div className="rounded-3xl border border-stone-200 bg-[#ebe8df] p-6">
    <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone-500">
      Challenge your thinking
    </p>

    <h2 className="mt-3 text-2xl font-medium tracking-tight">
      Don't just accept the reflection.
    </h2>

    <p className="mt-3 text-sm leading-6 text-stone-500">
      Push your reasoning one step further.
    </p>

    <div className="mt-6 space-y-3">

      {/* ASSUMPTION */}
      <details className="group rounded-2xl border border-stone-300 bg-white">
        <summary className="cursor-pointer list-none px-4 py-4 text-sm font-medium">
          <div className="flex items-center justify-between">
            <span>Challenge an assumption</span>
            <span className="text-stone-400 transition group-open:rotate-45">
              +
            </span>
          </div>
        </summary>

        <div className="border-t border-stone-100 px-4 py-4">
          <p className="text-xs uppercase tracking-[0.15em] text-stone-400">
            Look closer
          </p>

          <p className="mt-2 text-sm leading-6 text-stone-700">
            What evidence do you have that your most important assumption is
            actually true?
          </p>

          <p className="mt-3 text-xs leading-5 text-stone-400">
            Separate what you know from what you are expecting.
          </p>
        </div>
      </details>

      {/* PERSPECTIVE */}
      <details className="group rounded-2xl border border-stone-300 bg-white">
        <summary className="cursor-pointer list-none px-4 py-4 text-sm font-medium">
          <div className="flex items-center justify-between">
            <span>Show another perspective</span>
            <span className="text-stone-400 transition group-open:rotate-45">
              +
            </span>
          </div>
        </summary>

        <div className="border-t border-stone-100 px-4 py-4">
          <p className="text-xs uppercase tracking-[0.15em] text-stone-400">
            Change the lens
          </p>

          <p className="mt-2 text-sm leading-6 text-stone-700">
            Imagine someone you trust strongly disagreed with your reasoning.
            What might they notice that you currently don't?
          </p>

          <p className="mt-3 text-xs leading-5 text-stone-400">
            A different perspective doesn't have to be the correct one. It
            simply gives you another angle to examine.
          </p>
        </div>
      </details>

      {/* MISSING */}
      <details className="group rounded-2xl border border-stone-300 bg-white">
        <summary className="cursor-pointer list-none px-4 py-4 text-sm font-medium">
          <div className="flex items-center justify-between">
            <span>What am I missing?</span>
            <span className="text-stone-400 transition group-open:rotate-45">
              +
            </span>
          </div>
        </summary>

        <div className="border-t border-stone-100 px-4 py-4">
          <p className="text-xs uppercase tracking-[0.15em] text-stone-400">
            Find the unknown
          </p>

          <p className="mt-2 text-sm leading-6 text-stone-700">
            Which piece of information could realistically change your
            decision?
          </p>

          <div className="mt-4 rounded-xl bg-[#f7f4ed] p-4">
            <p className="text-xs font-medium text-stone-500">
              Before deciding, ask:
            </p>

            <p className="mt-2 text-sm leading-6 text-stone-700">
              “What don't I know yet that I would want to know before committing?”
            </p>
          </div>
        </div>
      </details>

      {/* HARDER QUESTION */}
      <details className="group rounded-2xl border border-stone-300 bg-white">
        <summary className="cursor-pointer list-none px-4 py-4 text-sm font-medium">
          <div className="flex items-center justify-between">
            <span>Ask me a harder question</span>
            <span className="text-stone-400 transition group-open:rotate-45">
              +
            </span>
          </div>
        </summary>

        <div className="border-t border-stone-100 px-4 py-4">
          <p className="text-xs uppercase tracking-[0.15em] text-stone-400">
            Go deeper
          </p>

          <p className="mt-2 text-base font-medium leading-7 text-stone-900">
            If this decision went badly six months from now, what would you
            wish you had questioned today?
          </p>

          <p className="mt-3 text-xs leading-5 text-stone-400">
            Don't answer with what sounds reasonable. Think about what would
            genuinely make you regret the decision.
          </p>
        </div>
      </details>

    </div>
  </div>
</aside>
            </div>

            <div className="mt-10 border-t border-stone-200 pt-8 text-center">
              <p className="text-sm text-stone-500">
                Your thinking, reflected.
              </p>

              <p className="mt-2 text-lg font-medium">
                Your decision is still yours.
              </p>

              <button
                onClick={startAgain}
                className="mt-5 rounded-xl border border-stone-300 px-5 py-3 text-sm font-medium transition hover:bg-white"
              >
                ← Reflect on another decision
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}