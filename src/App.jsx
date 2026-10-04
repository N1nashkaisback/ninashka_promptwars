import { useState } from "react";
import { reflectOnThinking } from "./ai";

function Section({ icon, title, items }) {
  return (
    <section className="mb-8">
      <div className="mb-4 flex items-center gap-3">
        <span className="text-xl">{icon}</span>
        <h2 className="text-xl font-semibold text-[#292824]">{title}</h2>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <article
            key={index}
            className="rounded-2xl border border-[#dedbd2] bg-[#fffdf8] p-5"
          >
            <h3 className="font-semibold text-[#292824]">{item.factor}</h3>
            <p className="mt-2 leading-7 text-[#66635c]">{item.why}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Challenge({ title, children }) {
  return (
    <details className="group rounded-2xl border border-[#dcd8cd] bg-[#fffdf8]">
      <summary className="cursor-pointer list-none p-4 font-medium text-[#292824]">
        <span className="mr-2 text-[#8b806d] group-open:rotate-90 inline-block transition">
          ›
        </span>
        {title}
      </summary>
      <div className="border-t border-[#e5e1d8] px-4 pb-4 pt-3 leading-7 text-[#66635c]">
        {children}
      </div>
    </details>
  );
}

export default function App() {
  const [decision, setDecision] = useState("");
  const [reasoning, setReasoning] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleReflect(e) {
    e.preventDefault();

    if (!decision.trim() || !reasoning.trim()) return;

    setLoading(true);
    const result = await reflectOnThinking(decision, reasoning);
    setAnalysis(result);
    setLoading(false);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function startAgain() {
    setDecision("");
    setReasoning("");
    setAnalysis(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="min-h-screen bg-[#f5f1e8] text-[#292824]">
      <header className="border-b border-[#dedbd2] bg-[#f8f5ed]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">MIRROR</h1>
            <p className="text-sm text-[#777269]">
              See what you might be missing.
            </p>
          </div>

          {analysis && (
            <button
              type="button"
              onClick={startAgain}
              className="rounded-full border border-[#cfc9bb] px-4 py-2 text-sm font-medium transition hover:bg-white"
            >
              Start again
            </button>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-12">
        {!analysis ? (
          <div className="mx-auto max-w-3xl">
            <div className="mb-10">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[#8b806d]">
                Decision reflection
              </p>

              <h2 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                Before you decide,
                <br />
                take a second look.
              </h2>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#66635c]">
                Explain what you're deciding and why. MIRROR helps uncover
                assumptions, blind spots, trade-offs, and questions worth
                asking — without deciding for you.
              </p>
            </div>

            <form
              onSubmit={handleReflect}
              className="rounded-3xl border border-[#dedbd2] bg-[#fffdf8] p-6 shadow-sm md:p-8"
            >
              <div className="mb-6">
                <label
                  htmlFor="decision"
                  className="mb-2 block font-semibold text-[#292824]"
                >
                  What are you deciding?
                </label>

                <textarea
                  id="decision"
                  value={decision}
                  onChange={(e) => setDecision(e.target.value)}
                  placeholder="e.g. Should I accept this 6-month internship?"
                  className="min-h-32 w-full resize-none rounded-2xl border border-[#d8d3c8] bg-[#faf8f2] p-4 outline-none transition focus:border-[#8b806d] focus:ring-2 focus:ring-[#8b806d]/20"
                  required
                />
              </div>

              <div className="mb-7">
                <label
                  htmlFor="reasoning"
                  className="mb-2 block font-semibold text-[#292824]"
                >
                  Why are you considering it?
                </label>

                <textarea
                  id="reasoning"
                  value={reasoning}
                  onChange={(e) => setReasoning(e.target.value)}
                  placeholder="Tell MIRROR what matters to you, what you're worried about, and why you're leaning one way."
                  className="min-h-40 w-full resize-none rounded-2xl border border-[#d8d3c8] bg-[#faf8f2] p-4 outline-none transition focus:border-[#8b806d] focus:ring-2 focus:ring-[#8b806d]/20"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-[#292824] px-6 py-4 font-semibold text-white transition hover:bg-[#403d37] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Reflecting..." : "Reflect on my thinking →"}
              </button>
            </form>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            <div>
              <div className="mb-10">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#8b806d]">
                  Your reflection
                </p>

                <h2 className="mt-3 text-4xl font-semibold tracking-tight">
                  Here's what might be worth noticing.
                </h2>
              </div>

              <Section
                icon="🔍"
                title="What you're prioritizing"
                items={analysis.priorities}
              />

              <Section
                icon="👁"
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
                items={analysis.questions.map((q) => ({
                  factor: q.question,
                  why: q.why,
                }))}
              />

              <Section
                icon="↔️"
                title="Alternative perspectives"
                items={analysis.alternativePerspectives}
              />
            </div>

            <aside className="lg:sticky lg:top-6 lg:h-fit">
              <div className="rounded-3xl border border-[#d8d3c8] bg-[#e9e5da] p-5">
                <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#81796b]">
                  Challenge your thinking
                </p>

                <h3 className="mt-2 text-xl font-semibold">
                  Don't just confirm what you already believe.
                </h3>

                <div className="mt-5 space-y-3">
                  <Challenge title="Challenge an assumption">
                    What evidence would prove one of your assumptions wrong?
                    What would you need to verify before treating it as fact?
                  </Challenge>

                  <Challenge title="Show another perspective">
                    Imagine someone you trust strongly disagrees with your
                    current reasoning. What might they notice that you don't?
                  </Challenge>

                  <Challenge title="What am I missing?">
                    Look beyond the obvious benefits. Consider time, energy,
                    opportunity cost, uncertainty, and what happens six months
                    from now.
                  </Challenge>

                  <Challenge title="Ask me a harder question">
                    If you knew you could not change this decision later,
                    what information would you want to know before saying yes?
                  </Challenge>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}