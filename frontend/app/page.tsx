"use client";

import { useEffect, useMemo, useState } from "react";

type Technology = {
  id: number; slug: string; name: string; category: string;
  summary: string; description: string; is_demo: boolean;
};
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

export default function Home() {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Technology | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [asking, setAsking] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true); setError("");
      try {
        const response = await fetch(`${API_BASE}/api/v1/technologies`);
        if (!response.ok) throw new Error(`API returned ${response.status}`);
        const data = await response.json();
        if (!cancelled) { setTechnologies(data.items ?? []); setSelected((current) => current ?? data.items?.[0] ?? null); }
      } catch {
        if (!cancelled) setError("Could not connect to the API. Start FastAPI on port 8000.");
      } finally { if (!cancelled) setLoading(false); }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return technologies;
    return technologies.filter((item) =>
      [item.name, item.category, item.summary, item.description].some((value) => value.toLowerCase().includes(q))
    );
  }, [technologies, query]);

  async function askAtlas(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!question.trim()) return;
    setAsking(true); setAnswer("");
    try {
      const response = await fetch(`${API_BASE}/api/v1/research/ask`, {
        method: "POST", headers: {"Content-Type": "application/json"},
        body: JSON.stringify({question, technology_slug: selected?.slug ?? null}),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail ?? "Research request failed");
      setAnswer(`${data.answer}\n\nMode: ${data.mode}\n${data.disclaimer}`);
    } catch (err) { setAnswer(err instanceof Error ? err.message : "Research request failed."); }
    finally { setAsking(false); }
  }

  return (
    <main className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-900 text-lg font-bold text-white">M</div>
            <div><div className="text-lg font-bold tracking-tight">MobileTech Atlas</div><div className="text-xs text-slate-500">Technology · Patents · Research</div></div>
          </div>
          <span className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">Local MVP · Demo records</span>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-5 py-10">
        <section className="mb-9 max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-emerald-800">Research intelligence workspace</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Explore the technologies shaping mobile devices.</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">A structured workspace for technology timelines, patent evidence, research papers, standards, and company innovation. Evidence first; AI synthesis second.</p>
        </section>
        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-bold">Technology library</h2><span className="text-sm text-slate-500">{filtered.length} topics</span></div>
            <label htmlFor="search" className="mb-2 block text-sm font-medium text-slate-700">Search the library</label>
            <input id="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="e.g. camera, satellite, hinge" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-800 focus:ring-2 focus:ring-emerald-100" />
            {loading && <p className="py-6 text-sm text-slate-500">Loading research topics…</p>}
            {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
            {!loading && !error && <div className="mt-4 space-y-2">
              {filtered.map((item) => <button key={item.slug} onClick={() => setSelected(item)} className={`w-full rounded-xl border p-4 text-left transition ${selected?.slug === item.slug ? "border-emerald-800 bg-emerald-50" : "border-slate-200 hover:border-slate-400"}`}>
                <div className="mb-1 flex items-start justify-between gap-3"><span className="font-semibold">{item.name}</span><span className="shrink-0 rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-600">{item.is_demo ? "Demo" : "Record"}</span></div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-800">{item.category}</div><p className="text-sm leading-6 text-slate-600">{item.summary}</p>
              </button>)}
              {filtered.length === 0 && <p className="py-6 text-sm text-slate-500">No topics match that search.</p>}
            </div>}
          </div>
          <div className="space-y-6">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              {selected ? <>
                <div className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">{selected.category}</div>
                <h2 className="text-2xl font-bold tracking-tight">{selected.name}</h2>
                <p className="mt-4 leading-7 text-slate-700">{selected.description}</p>
                <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4"><div className="font-semibold text-amber-900">Evidence status</div><p className="mt-1 text-sm leading-6 text-amber-900/80">This is a topic-level demo record, not a verified patent entry. Patent numbers, inventors, legal status, and product-launch dates will be shown only when backed by source records.</p></div>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">{["Patent families", "Research papers", "Standards"].map((label) => <div key={label} className="rounded-xl bg-slate-50 p-4"><div className="text-sm font-semibold">{label}</div><div className="mt-1 text-xs text-slate-500">Coming in ingestion step</div></div>)}</div>
              </> : <p className="text-slate-500">Choose a technology to inspect it.</p>}
            </article>
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-2 flex items-center gap-2"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-900 text-white">✦</span><h2 className="text-lg font-bold">Ask Atlas</h2></div>
              <p className="mb-4 text-sm leading-6 text-slate-600">Ask a question about the selected topic. This MVP uses local context; full patent-and-paper RAG comes next.</p>
              <form onSubmit={askAtlas} className="space-y-3">
                <textarea value={question} onChange={(e) => setQuestion(e.target.value)} rows={3} placeholder="What technical trade-offs should I investigate?" className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-800 focus:ring-2 focus:ring-emerald-100" />
                <button disabled={asking || !question.trim()} className="rounded-xl bg-emerald-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50">{asking ? "Researching…" : "Ask research question"}</button>
              </form>
              {answer && <pre className="mt-4 whitespace-pre-wrap break-words rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">{answer}</pre>}
            </section>
          </div>
        </section>
        <footer className="mt-10 border-t border-slate-200 py-6 text-sm text-slate-500">MobileTech Atlas · Research provenance matters. Verify legal status with the relevant official register.</footer>
      </div>
    </main>
  );
}
