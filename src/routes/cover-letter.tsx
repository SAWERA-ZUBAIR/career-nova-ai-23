import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, FileText, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { GlassCard } from "@/components/ui-bits";
import { useProfile } from "@/lib/storage";
import { generateCoverLetter } from "@/lib/ai.functions";
import { renderMarkdown } from "@/lib/markdown";

export const Route = createFileRoute("/cover-letter")({
  head: () => ({
    meta: [
      { title: "AI Cover Letter Generator — CareerNova AI" },
      { name: "description", content: "Generate a tailored, professional cover letter in seconds." },
      { property: "og:title", content: "AI Cover Letter Generator — CareerNova AI" },
      { property: "og:description", content: "Tailored cover letters for every role." },
    ],
  }),
  component: Page,
});

function Page() {
  const [profile] = useProfile();
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const call = useServerFn(generateCoverLetter);

  const run = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setContent("");
    try {
      const res = await call({
        data: {
          jobTitle,
          company,
          jobDescription,
          name: profile.name,
          skills: profile.skills,
          experience: profile.experience,
        },
      });
      setContent(res.content);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to generate");
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <AppShell>
      <PageHeader eyebrow="AI Tool" title="Cover Letter" subtitle="Tailored to the role in seconds" />
      <div className="flex flex-col gap-4 px-5">
        <GlassCard>
          <form onSubmit={run} className="flex flex-col gap-3">
            <input
              required
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Job title (e.g. Frontend Engineer)"
              className="glass rounded-2xl px-3 py-3 text-sm outline-none"
            />
            <input
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company (e.g. Stripe)"
              className="glass rounded-2xl px-3 py-3 text-sm outline-none"
            />
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste key parts of the job description (optional)"
              rows={4}
              className="glass rounded-2xl px-3 py-3 text-sm outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cta px-4 py-3 text-sm font-semibold text-white shadow-elegant disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
              Generate cover letter
            </button>
          </form>
        </GlassCard>

        {content && (
          <GlassCard>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-display text-sm font-bold">Your cover letter</h3>
              <button
                onClick={copy}
                className="glass inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            {renderMarkdown(content)}
          </GlassCard>
        )}
      </div>
    </AppShell>
  );
}
