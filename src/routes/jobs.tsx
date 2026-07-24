import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { useMemo, useState, useEffect } from "react";
import { Search } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { Chip, OpportunityCard, Badge, EmptyState } from "@/components/ui-bits";
import { OPPORTUNITIES, CATEGORIES } from "@/lib/sample-data";

const searchSchema = z.object({
  q: z.string().optional().default(""),
  cat: z.string().optional().default("All"),
});

export const Route = createFileRoute("/jobs")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Jobs — CareerNova AI" },
      { name: "description", content: "Browse curated full-time, contract and remote jobs from top companies." },
      { property: "og:title", content: "Jobs — CareerNova AI" },
      { property: "og:description", content: "Curated jobs from top companies, filtered by category and location." },
    ],
  }),
  component: JobsPage,
});

function JobsPage() {
  const { q: initialQ, cat: initialCat } = Route.useSearch();
  const [q, setQ] = useState(initialQ);
  const [cat, setCat] = useState<string>(initialCat);

  useEffect(() => setQ(initialQ), [initialQ]);
  useEffect(() => setCat(initialCat), [initialCat]);

  const jobs = useMemo(
    () => OPPORTUNITIES.filter((o) => o.type === "job" || o.type === "remote"),
    [],
  );

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return jobs.filter((j) => {
      const matchCat = cat === "All" || j.category === cat;
      const matchQ =
        !s ||
        j.title.toLowerCase().includes(s) ||
        j.organization.toLowerCase().includes(s) ||
        j.location.toLowerCase().includes(s) ||
        j.tags.some((t) => t.toLowerCase().includes(s));
      return matchCat && matchQ;
    });
  }, [q, cat, jobs]);

  return (
    <AppShell>
      <PageHeader eyebrow="Explore" title="Jobs" subtitle={`${filtered.length} roles matching your filters`} />

      <div className="px-5">
        <div className="glass-strong flex items-center gap-2 rounded-2xl px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search jobs, companies, locations…"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          {q && (
            <button onClick={() => setQ("")} className="text-xs font-semibold text-primary">
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {CATEGORIES.map((c) => (
          <Chip key={c} active={c === cat} onClick={() => setCat(c)}>
            {c}
          </Chip>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3 px-5">
        {filtered.length === 0 ? (
          <EmptyState title="No matches yet" subtitle="Try a different keyword or category." />
        ) : (
          filtered.map((j) => (
            <OpportunityCard
              key={j.id}
              opportunity={j}
              badges={
                <>
                  <Badge tone={j.remote ? "success" : "primary"}>{j.remote ? "Remote" : "Onsite"}</Badge>
                  {j.tags.slice(0, 2).map((t) => (
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
