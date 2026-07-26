import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { GlassCard } from "@/components/ui-bits";
import { generateInterviewQuestions } from "@/lib/ai.functions";
import { renderMarkdown } from "@/lib/markdown";

export const Route = createFileRoute("/interview-coach")({
  head: () => ({
    meta: [
      { title: "AI Interview Coach — CareerNova AI" },
      { name: "description", content: "Practice with tailored behavioral and technical interview questions." },
      { property: "og:title", content: "AI Interview Coach — CareerNova AI" },
      { property: "og:description", content: "Mock interviews for any role." },
    ],
  }),
  component: Page,
});

const LEVELS = ["Intern", "Entry", "Mid", "Senior"];

function Page() {
  const [role, setRole] = useState("");
  const [level, setLevel] = useState("Entry");
  const [focus, setFocus] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const call = useServerFn(generateInterviewQuestions);

  const run = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setContent("");
    try {
      const res = await call({ data: { role, level, focus } });
      setContent(res.content);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to generate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <PageHeader eyebrow="AI Tool" title="Interview Coach" subtitle="Practice like it's the real thing" />
      <div className="flex flex-col gap-4 px-5">
        <GlassCard>
          <form onSubmit={run} className="flex flex-col gap-3">
            <input
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Target role (e.g. Product Designer)"
              className="glass rounded-2xl px-3 py-3 text-sm outline-none"
            />
            <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {LEVELS.map((l) => (
                <button
                  type="button"
                  key={l}
                  onClick={() => setLevel(l)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold ${
                    level === l ? "bg-hero text-white shadow-elegant" : "glass"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <input
              value={focus}
              onChange={(e) => setFocus(e.target.value)}
              placeholder="Focus area (e.g. system design, portfolio review)"
              className="glass rounded-2xl px-3 py-3 text-sm outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cta px-4 py-3 text-sm font-semibold text-white shadow-elegant disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MessageSquare className="h-4 w-4" />}
              Start mock interview
            </button>
          </form>
        </GlassCard>

        {content && <GlassCard>{renderMarkdown(content)}</GlassCard>}
      </div>
    </AppShell>
  );
}
