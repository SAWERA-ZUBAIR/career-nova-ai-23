import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { OpportunityCard, EmptyState, Badge } from "@/components/ui-bits";
import { OPPORTUNITIES } from "@/lib/sample-data";
import { useSaved } from "@/lib/storage";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "Saved — CareerNova AI" },
      { name: "description", content: "Your saved jobs, internships and scholarships." },
      { property: "og:title", content: "Saved — CareerNova AI" },
      { property: "og:description", content: "Everything you bookmarked, in one place." },
    ],
  }),
  component: SavedPage,
});

function SavedPage() {
  const { ids } = useSaved();
  const items = OPPORTUNITIES.filter((o) => ids.includes(o.id));

  return (
    <AppShell>
      <PageHeader eyebrow="Bookmarks" title="Saved" subtitle={`${items.length} saved opportunit${items.length === 1 ? "y" : "ies"}`} />
      <div className="flex flex-col gap-3 px-5">
        {items.length === 0 ? (
          <EmptyState title="Nothing saved yet" subtitle="Tap the bookmark on any opportunity to save it here." />
        ) : (
          items.map((o) => (
            <OpportunityCard
              key={o.id}
              opportunity={o}
              badges={<Badge tone="primary">{o.type}</Badge>}
            />
          ))
        )}
        <Link to="/jobs" search={{ q: "", cat: "All" }} className="mt-2 text-center text-xs font-semibold text-primary">
          Browse more →
        </Link>
      </div>
    </AppShell>
  );
}
