import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { Chip, GlassCard, EmptyState, Badge } from "@/components/ui-bits";
import { OPPORTUNITIES } from "@/lib/sample-data";
import { useApplications, type AppStatus } from "@/lib/storage";
import { ExternalLink, Trash2 } from "lucide-react";

export const Route = createFileRoute("/applications")({
  head: () => ({
    meta: [
      { title: "Applications — CareerNova AI" },
      { name: "description", content: "Track applications by status: applied, interviewing, offer, rejected." },
      { property: "og:title", content: "Applications — CareerNova AI" },
      { property: "og:description", content: "Your application tracker." },
    ],
  }),
  component: AppsPage,
});

const TABS: { id: "all" | AppStatus; label: string }[] = [
  { id: "all", label: "All" },
  { id: "applied", label: "Applied" },
  { id: "interviewing", label: "Interviewing" },
  { id: "offer", label: "Offer" },
  { id: "rejected", label: "Rejected" },
];

function AppsPage() {
  const { apps, setStatus, remove } = useApplications();
  const [tab, setTab] = useState<"all" | AppStatus>("all");

  const rows = useMemo(() => {
    return apps
      .filter((a) => tab === "all" || a.status === tab)
      .map((a) => ({ app: a, opp: OPPORTUNITIES.find((o) => o.id === a.opportunityId) }))
      .filter((r) => r.opp);
  }, [apps, tab]);

  return (
    <AppShell>
      <PageHeader eyebrow="Tracker" title="Applications" subtitle={`${apps.length} total`} />

      <div className="mt-2 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {TABS.map((t) => (
          <Chip key={t.id} active={t.id === tab} onClick={() => setTab(t.id)}>
            {t.label}
          </Chip>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3 px-5">
        {rows.length === 0 ? (
          <EmptyState title="No applications yet" subtitle="Tap Apply Now on any opportunity — it will show up here." />
        ) : (
          rows.map(({ app, opp }) => (
            <GlassCard key={app.id}>
              <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-hero text-2xl">{opp!.logo}</div>
                <div className="min-w-0">
                  <div className="truncate font-semibold">{opp!.title}</div>
                  <div className="truncate text-xs text-muted-foreground">{opp!.organization} · {opp!.location}</div>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    <Badge tone="primary">{opp!.type}</Badge>
                    <Badge tone={app.status === "offer" ? "success" : app.status === "rejected" ? "warning" : "default"}>
                      {app.status}
                    </Badge>
                  </div>
                </div>
                <button
                  onClick={() => remove(app.id)}
                  aria-label="Remove"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <select
                  value={app.status}
                  onChange={(e) => setStatus(app.id, e.target.value as AppStatus)}
                  className="glass rounded-full px-3 py-1.5 text-xs font-semibold"
                >
                  <option value="applied">Applied</option>
                  <option value="interviewing">Interviewing</option>
                  <option value="offer">Offer</option>
                  <option value="rejected">Rejected</option>
                </select>
                <a
                  href={opp!.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full bg-hero px-3 py-1.5 text-xs font-semibold text-white shadow-elegant"
                >
                  Open <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </GlassCard>
          ))
        )}
      </div>
    </AppShell>
  );
}
