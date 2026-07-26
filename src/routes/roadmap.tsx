import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Map } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { GlassCard } from "@/components/ui-bits";
import { generateRoadmap } from "@/lib/ai.functions";
import { renderMarkdown } from "@/lib/markdown";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "AI Career Roadmap — CareerNova AI" },
      { name: "description", content: "Get a phased, actionable career roadmap tailored to your goal." },
      { property: "og:title", content: "AI Career Roadmap — CareerNova AI" },
      { property: "og:description", content: "A phased plan for your career goal." },
    ],
  }),
  component: Page,
});

const TIMES = ["3 months", "6 months", "12 months"];

function Page() {
  const [goal, setGoal] = useState("");
  const [currentLevel, setCurrentLevel] = useState("");
  const [timeframe, setTimeframe] = useState("6 months");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const call = useServerFn(generateRoadmap);

  const run = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setContent("");
    try {
      const res = await call({ data: { goal, currentLevel, timeframe } });
      setContent(res.content);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to generate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <PageHeader eyebrow="AI Tool" title="Career Roadmap" subtitle="A phased plan just for you" />
      <div className="flex flex-col gap-4 px-5">
        <GlassCard>
          <form onSubmit={run} className="flex flex-col gap-3">
            <input
              required
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Career goal (e.g. become a data scientist)"
              className="glass rounded-2xl px-3 py-3 text-sm outline-none"
            />
            <input
              value={currentLevel}
              onChange={(e) => setCurrentLevel(e.target.value)}
              placeholder="Where are you now? (e.g. CS student, 2 yrs marketing)"
              className="glass rounded-2xl px-3 py-3 text-sm outline-none"
            />
            <div className="flex gap-2">
              {TIMES.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={`flex-1 rounded-full px-3 py-2 text-xs font-semibold ${
                    timeframe === t ? "bg-hero text-white shadow-elegant" : "glass"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cta px-4 py-3 text-sm font-semibold text-white shadow-elegant disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Map className="h-4 w-4" />}
              Build my roadmap
            </button>
          </form>
        </GlassCard>

        {content && <GlassCard>{renderMarkdown(content)}</GlassCard>}
      </div>
    </AppShell>
  );
}
