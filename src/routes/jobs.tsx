import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { Chip, OpportunityCard, Badge, EmptyState } from "@/components/ui-bits";
import { JOBS, CATEGORIES } from "@/lib/sample-data";

export const Route = createFileRoute("/jobs")({
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
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");

  const filtered = useMemo(() => {
    return JOBS.filter((j) => {
      const matchCat = cat === "All" || j.category === cat;
      const s = q.trim().toLowerCase();
      const matchQ = !s || j.title.toLowerCase().includes(s) || j.company.toLowerCase().includes(s);
      return matchCat && matchQ;
    });
  }, [q, cat]);

  return (
    <AppShell>
      <PageHeader eyebrow="Explore" title="Jobs" subtitle={`${filtered.length} roles matching your filters`} />

      <div className="px-5">
        <div className="glass-strong flex items-center gap-2 rounded-2xl px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search jobs or companies…"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <SlidersHorizontal className="h-4 w-4 shrink-0 text-muted-foreground" />
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
              logo={j.logo}
              title={j.title}
              subtitle={`${j.company} · ${j.location}`}
              meta={j.salary}
              badges={
                <>
                  <Badge tone="primary">{j.type}</Badge>
                  <Badge tone={j.remote ? "success" : "default"}>{j.remote ? "Remote" : "Onsite"}</Badge>
                  {j.tags.slice(0, 2).map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </>
              }
              deadline={j.deadline}
            />
          ))
        )}
      </div>
    </AppShell>
  );
}
