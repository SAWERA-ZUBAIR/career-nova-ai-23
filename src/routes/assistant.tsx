import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Sparkles, Loader2, Send } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { GlassCard } from "@/components/ui-bits";
import { askCareerAI } from "@/lib/ai.functions";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "AI Assistant — CareerNova AI" },
      { name: "description", content: "Get AI-powered career suggestions for jobs, internships, scholarships and skills." },
      { property: "og:title", content: "AI Assistant — CareerNova AI" },
      { property: "og:description", content: "Personalized career guidance powered by AI." },
    ],
  }),
  component: AssistantPage,
});

function Field({ label, value, onChange, placeholder, multi = false }: { label: string; value: string; onChange: (v: string) => void; placeholder: string; multi?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-muted-foreground">{label}</span>
      {multi ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={2}
          className="glass w-full resize-none rounded-2xl px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="glass w-full rounded-2xl px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40"
        />
      )}
    </label>
  );
}

function renderMarkdown(md: string) {
  // ultra-light md renderer: ## headings, - bullets, blank lines
  const lines = md.split("\n");
  const out: JSX.Element[] = [];
  let list: string[] = [];
  const flushList = () => {
    if (list.length) {
      out.push(
        <ul key={out.length} className="ml-4 list-disc space-y-1 text-sm text-foreground/90">
          {list.map((li, i) => <li key={i}>{li}</li>)}
        </ul>
      );
      list = [];
    }
  };
  lines.forEach((raw) => {
    const line = raw.trim();
    if (line.startsWith("## ")) {
      flushList();
      out.push(
        <h3 key={out.length} className="mt-4 flex items-center gap-2 font-display text-sm font-bold text-primary">
          <Sparkles className="h-3.5 w-3.5" /> {line.replace("## ", "")}
        </h3>
      );
    } else if (line.startsWith("- ")) {
      list.push(line.replace(/^- /, ""));
    } else if (line === "") {
      flushList();
    } else {
      flushList();
      out.push(<p key={out.length} className="text-sm leading-relaxed text-foreground/90">{line}</p>);
    }
  });
  flushList();
  return out;
}

function AssistantPage() {
  const ask = useServerFn(askCareerAI);
  const [education, setEducation] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [goal, setGoal] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const submit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await ask({ data: { education, skills, experience, goal, message } });
      setResult(res.content);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <PageHeader eyebrow="Powered by AI" title="AI Assistant" subtitle="Tailored guidance in seconds" />

      <div className="flex flex-col gap-4 px-5">
        <GlassCard>
          <div className="flex flex-col gap-3">
            <Field label="Education" value={education} onChange={setEducation} placeholder="e.g. BSc Computer Science, 3rd year" />
            <Field label="Skills" value={skills} onChange={setSkills} placeholder="e.g. React, Python, SQL, UI design" />
            <Field label="Experience" value={experience} onChange={setExperience} placeholder="e.g. 1 internship, freelance projects" />
            <Field label="Career goal" value={goal} onChange={setGoal} placeholder="e.g. Land a remote frontend role in Europe" />
            <Field label="Anything else? (optional)" value={message} onChange={setMessage} placeholder="Region, constraints, questions…" multi />

            <button
              onClick={submit}
              disabled={loading}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-hero px-4 py-3 text-sm font-semibold text-white shadow-elegant transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-70"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {loading ? "Thinking…" : "Get my career plan"}
            </button>
          </div>
        </GlassCard>

        {error && (
          <div className="glass-strong rounded-2xl border border-destructive/40 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        {loading && !result && (
          <GlassCard>
            <div className="space-y-2">
              <div className="h-4 w-2/3 rounded animate-shimmer" />
              <div className="h-3 w-full rounded animate-shimmer" />
              <div className="h-3 w-5/6 rounded animate-shimmer" />
              <div className="h-3 w-4/6 rounded animate-shimmer" />
            </div>
          </GlassCard>
        )}

        {result && (
          <GlassCard className="animate-in fade-in slide-in-from-bottom-3 duration-500">
            <div className="flex flex-col gap-1">{renderMarkdown(result)}</div>
          </GlassCard>
        )}
      </div>
    </AppShell>
  );
}
