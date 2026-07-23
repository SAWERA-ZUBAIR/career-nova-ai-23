import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { Chip, OpportunityCard, Badge } from "@/components/ui-bits";
import { INTERNSHIPS, SCHOLARSHIPS, REMOTE_JOBS } from "@/lib/sample-data";

const searchSchema = z.object({
  tab: z.enum(["internships", "scholarships", "remote"]).optional().default("internships"),
});

export const Route = createFileRoute("/opportunities")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Opportunities — CareerNova AI" },
      { name: "description", content: "Internships, scholarships and remote jobs curated for students and pros." },
      { property: "og:title", content: "Opportunities — CareerNova AI" },
      { property: "og:description", content: "Internships, scholarships, and remote work in one place." },
    ],
  }),
  component: OpportunitiesPage,
});

const TABS = [
  { id: "internships", label: "Internships" },
  { id: "scholarships", label: "Scholarships" },
  { id: "remote", label: "Remote" },
] as const;

function OpportunitiesPage() {
  const { tab } = Route.useSearch();
  const navigate = Route.useNavigate();

  return (
    <AppShell>
      <PageHeader eyebrow="Explore" title="Opportunities" subtitle="Internships, scholarships & remote roles" />

      <div className="flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {TABS.map((t) => (
          <Chip key={t.id} active={t.id === tab} onClick={() => navigate({ search: { tab: t.id } })}>
            {t.label}
          </Chip>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3 px-5">
        {tab === "internships" &&
          INTERNSHIPS.map((i) => (
            <OpportunityCard
              key={i.id}
              logo={i.logo}
              title={i.role}
              subtitle={`${i.company} · ${i.location}`}
              meta={i.duration}
              badges={
                <>
                  <Badge tone="primary">Internship</Badge>
                  <Badge tone={i.paid ? "success" : "warning"}>{i.paid ? "Paid" : "Unpaid"}</Badge>
                  <Badge>{i.category}</Badge>
                </>
              }
              deadline={i.deadline}
            />
          ))}

        {tab === "scholarships" &&
          SCHOLARSHIPS.map((s) => (
            <OpportunityCard
              key={s.id}
              logo="🏆"
              title={s.name}
              subtitle={`${s.university} · ${s.country}`}
              meta={s.level}
              badges={
                <>
                  <Badge tone="primary">{s.funding}</Badge>
                  <Badge>{s.country}</Badge>
                </>
              }
              deadline={s.deadline}
            />
          ))}

        {tab === "remote" &&
          REMOTE_JOBS.map((j) => (
            <OpportunityCard
              key={j.id}
              logo={j.logo}
              title={j.title}
              subtitle={`${j.company} · ${j.location}`}
              meta={j.salary}
              badges={
                <>
                  <Badge tone="success">Remote</Badge>
                  <Badge tone="primary">{j.type}</Badge>
                  <Badge>{j.timezone}</Badge>
                </>
              }
              deadline={j.deadline}
            />
          ))}
      </div>
    </AppShell>
  );
}
