import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Bookmark, Calendar, MapPin, Building2 } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { GlassCard, Badge } from "@/components/ui-bits";
import { getOpportunity, type OppType } from "@/lib/sample-data";
import { useApplications, useSaved } from "@/lib/storage";

export const Route = createFileRoute("/opportunity/$type/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Opportunity — CareerNova AI` },
      { name: "description", content: `Details for opportunity ${params.id}.` },
      { property: "og:title", content: "Opportunity — CareerNova AI" },
      { property: "og:description", content: "Full details and application link." },
    ],
  }),
  component: DetailPage,
});

function DetailPage() {
  const { id } = Route.useParams();
  const opp = getOpportunity(id);
  const navigate = useNavigate();
  const { isSaved, toggle } = useSaved();
  const { record, hasApplied } = useApplications();

  if (!opp) {
    return (
      <AppShell>
        <div className="px-5 pt-10 text-center">
          <h1 className="font-display text-2xl font-black">Not found</h1>
          <p className="mt-2 text-sm text-muted-foreground">This opportunity no longer exists.</p>
          <Link to="/jobs" className="mt-4 inline-flex rounded-full bg-hero px-4 py-2 text-sm font-semibold text-white shadow-elegant">
            Browse jobs
          </Link>
        </div>
      </AppShell>
    );
  }

  const saved = isSaved(opp.id);
  const applied = hasApplied(opp.id);

  const onApply = () => {
    record(opp.id);
    window.open(opp.applyUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <AppShell>
      <div className="px-5 pt-6">
        <button
          onClick={() => navigate({ to: ".." })}
          className="glass inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </button>
      </div>

      <div className="mt-4 px-5">
        <div className="relative overflow-hidden rounded-3xl bg-hero p-6 text-white shadow-elegant">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-2xl animate-blob" />
          <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white/20 text-3xl">
              {opp.logo}
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-widest opacity-90">{opp.type}</p>
              <h1 className="mt-1 font-display text-2xl font-black leading-tight">{opp.title}</h1>
              <p className="text-sm opacity-90">{opp.organization}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4 px-5">
        <GlassCard>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {opp.location}</div>
            <div className="flex items-center gap-2"><Building2 className="h-4 w-4 text-primary" /> {opp.meta}</div>
            <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> Deadline: <span className="font-semibold">{opp.deadline}</span></div>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Badge tone="primary">{opp.category}</Badge>
            {opp.tags.map((t) => <Badge key={t}>{t}</Badge>)}
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="mb-2 font-display text-base font-bold">About this opportunity</h2>
          <p className="text-sm leading-relaxed text-foreground/90">{opp.description}</p>
        </GlassCard>

        <div className="sticky bottom-24 z-10 flex gap-3">
          <button
            onClick={() => toggle(opp.id)}
            className={`glass-strong flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold ${saved ? "text-primary" : ""}`}
          >
            <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
            {saved ? "Saved" : "Save"}
          </button>
          <button
            onClick={onApply}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-hero px-4 py-3 text-sm font-semibold text-white shadow-elegant transition-transform hover:scale-[1.02] active:scale-95"
          >
            {applied ? "Applied — Open again" : "Apply Now"} <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </AppShell>
  );
}

// Silence unused import when TS is strict about JSX-only usage.
export type _OppType = OppType;
