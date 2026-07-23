import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Briefcase, GraduationCap, Globe2, Sparkles, TrendingUp, Search } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { GlassCard, SectionHeader, OpportunityCard, Badge } from "@/components/ui-bits";
import { JOBS, INTERNSHIPS, TRENDING } from "@/lib/sample-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CareerNova AI — Your AI Career Companion" },
      { name: "description", content: "Discover jobs, internships, scholarships and remote work with AI-powered career guidance." },
      { property: "og:title", content: "CareerNova AI" },
      { property: "og:description", content: "Your AI career companion for jobs, internships, scholarships and remote work." },
    ],
  }),
  component: Home,
});

const STATS = [
  { label: "Jobs", value: "12.4k", icon: Briefcase, tone: "from-primary to-primary-glow" },
  { label: "Internships", value: "3.2k", icon: GraduationCap, tone: "from-primary-glow to-primary" },
  { label: "Scholarships", value: "980", icon: Sparkles, tone: "from-primary to-primary-glow" },
  { label: "Remote", value: "5.7k", icon: Globe2, tone: "from-primary-glow to-primary" },
];

const ACTIONS = [
  { to: "/jobs", label: "Find Jobs", icon: Briefcase, emoji: "💼" },
  { to: "/opportunities", label: "Internships", icon: GraduationCap, emoji: "🎓", search: { tab: "internships" } },
  { to: "/opportunities", label: "Scholarships", icon: Sparkles, emoji: "🏆", search: { tab: "scholarships" } },
  { to: "/opportunities", label: "Remote Jobs", icon: Globe2, emoji: "🌍", search: { tab: "remote" } },
] as const;

function Home() {
  return (
    <AppShell>
      <PageHeader eyebrow="Hello there 👋" title="CareerNova AI" subtitle="Your AI companion for the next step." />

      {/* Hero */}
      <section className="px-5">
        <div className="relative overflow-hidden rounded-3xl bg-hero p-6 text-white shadow-elegant">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-2xl animate-blob" />
          <div className="pointer-events-none absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-white/10 blur-3xl animate-blob" />
          <p className="text-xs font-semibold uppercase tracking-widest opacity-90">AI Career Companion</p>
          <h2 className="mt-2 font-display text-2xl font-black leading-tight">
            Land your next role, internship or scholarship.
          </h2>
          <p className="mt-2 text-sm opacity-90">Personalized guidance for jobs and remote opportunities worldwide.</p>
          <Link
            to="/assistant"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-primary shadow-elegant transition-transform hover:scale-105 active:scale-95"
          >
            <Sparkles className="h-4 w-4" /> Ask CareerNova AI
          </Link>
        </div>
      </section>

      {/* Search */}
      <section className="px-5 pt-5">
        <div className="glass-strong flex items-center gap-2 rounded-2xl px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            placeholder="Search roles, companies, scholarships…"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </section>

      {/* Stats */}
      <section className="px-5 pt-6">
        <div className="grid grid-cols-2 gap-3">
          {STATS.map(({ label, value, icon: Icon }, i) => (
            <GlassCard key={label} className="animate-in fade-in slide-in-from-bottom-3 duration-500" >
              <div className="flex items-center gap-3" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-hero text-white shadow-elegant">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-display text-xl font-black leading-none">{value}</div>
                  <div className="text-[11px] text-muted-foreground">{label}</div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Quick actions */}
      <section className="px-5 pt-6">
        <SectionHeader title="Quick actions" />
        <div className="grid grid-cols-2 gap-3">
          {ACTIONS.map((a) => (
            <Link
              key={a.label}
              to={a.to}
              search={"search" in a ? a.search : undefined}
              className="glass-strong group relative overflow-hidden rounded-2xl p-4 transition-all hover:-translate-y-0.5 hover:shadow-elegant"
            >
              <div className="text-2xl">{a.emoji}</div>
              <div className="mt-2 font-display text-sm font-bold">{a.label}</div>
              <div className="mt-0.5 text-[11px] text-muted-foreground">Explore →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="px-5 pt-6">
        <SectionHeader title="Trending categories" action={<TrendingUp className="h-4 w-4 text-primary" />} />
        <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TRENDING.map((t) => (
            <div key={t.label} className="glass shrink-0 rounded-2xl px-4 py-3">
              <div className="text-xl">{t.icon}</div>
              <div className="mt-1 text-xs font-semibold">{t.label}</div>
              <div className="text-[10px] text-muted-foreground">{t.count} open</div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent opportunities */}
      <section className="px-5 pt-6">
        <SectionHeader
          title="Recent opportunities"
          action={<Link to="/jobs" className="text-xs font-semibold text-primary">View all</Link>}
        />
        <div className="flex flex-col gap-3">
          {JOBS.slice(0, 2).map((j) => (
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
                </>
              }
              deadline={j.deadline}
            />
          ))}
          {INTERNSHIPS.slice(0, 1).map((i) => (
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
                </>
              }
              deadline={i.deadline}
            />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
