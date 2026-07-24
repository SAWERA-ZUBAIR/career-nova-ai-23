import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { Chip, OpportunityCard, Badge, EmptyState } from "@/components/ui-bits";
import { OPPORTUNITIES, OPP_TYPES, type OppType } from "@/lib/sample-data";

const OPP_TAB_IDS = OPP_TYPES.map((t) => t.id) as [OppType, ...OppType[]];

const searchSchema = z.object({
  tab: z.enum(OPP_TAB_IDS).optional().default("internship"),
  q: z.string().optional().default(""),
});

export const Route = createFileRoute("/opportunities")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Opportunities — CareerNova AI" },
      { name: "description", content: "Internships, scholarships, fellowships, competitions, exchange programs and more." },
      { property: "og:title", content: "Opportunities — CareerNova AI" },
      { property: "og:description", content: "Every kind of opportunity for students and professionals." },
    ],
  }),
  component: OpportunitiesPage,
});

// Handle legacy ?tab=internships / scholarships / remote from earlier links.
const LEGACY_MAP: Record<string, OppType> = {
  internships: "internship",
  scholarships: "scholarship",
  remote: "remote",
};

function OpportunitiesPage() {
  const raw = Route.useSearch();
  const activeTab: OppType = LEGACY_MAP[raw.tab as unknown as string] ?? (raw.tab as OppType);
  const navigate = Route.useNavigate();
  const [q, setQ] = useState(raw.q);

  const items = useMemo(() => OPPORTUNITIES.filter((o) => o.type === activeTab), [activeTab]);
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter(
      (o) =>
        o.title.toLowerCase().includes(s) ||
        o.organization.toLowerCase().includes(s) ||
        o.location.toLowerCase().includes(s) ||
        o.category.toLowerCase().includes(s),
    );
  }, [q, items]);

  return (
    <AppShell>
      <PageHeader eyebrow="Explore" title="Opportunities" subtitle="Everything beyond just jobs" />

      <div className="px-5">
        <div className="glass-strong flex items-center gap-2 rounded-2xl px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search opportunities…"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          {q && (
            <button onClick={() => setQ("")} className="text-xs font-semibold text-primary">
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {OPP_TYPES.map((t) => (
          <Chip
            key={t.id}
            active={t.id === activeTab}
            onClick={() => navigate({ search: { tab: t.id, q } })}
          >
            <span className="mr-1">{t.icon}</span>
            {t.label}
          </Chip>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3 px-5">
        {filtered.length === 0 ? (
          <EmptyState title="No results" subtitle="Try a different search or another category above." />
        ) : (
          filtered.map((o) => (
            <OpportunityCard
              key={o.id}
              opportunity={o}
              badges={
                <>
                  <Badge tone="primary">{o.category}</Badge>
                  {o.tags.slice(0, 2).map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </>
              }
            />
          ))
        )}
      </div>
    </AppShell>
  );
}
