import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Briefcase, GraduationCap, Globe2, Sparkles, TrendingUp, Search } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { GlassCard, SectionHeader, OpportunityCard, Badge } from "@/components/ui-bits";
import { OPPORTUNITIES, TRENDING } from "@/lib/sample-data";

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
  { label: "Jobs", value: "12.4k", icon: Briefcase },
  { label: "Internships", value: "3.2k", icon: GraduationCap },
  { label: "Scholarships", value: "980", icon: Sparkles },
  { label: "Remote", value: "5.7k", icon: Globe2 },
];

function Home() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/jobs", search: { q, cat: "All" } });
  };

  const recent = OPPORTUNITIES.slice(0, 3);

  return (
    <AppShell>
      <PageHeader eyebrow="Hello there 👋" title="CareerNova AI" subtitle="Your AI companion for the next step." />

      <section className="px-5">
        <div className="relative overflow-hidden rounded-3xl bg-hero p-6 text-white shadow-elegant">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-2xl animate-blob" />
          <div className="pointer-events-none absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-white/10 blur-3xl animate-blob" />
          <p className="text-xs font-semibold uppercase tracking-widest opacity-90">AI Career Companion</p>
          <h2 className="mt-2 font-display text-2xl font-black leading-tight">Land your next role, internship or scholarship.</h2>
          <p className="mt-2 text-sm opacity-90">Personalized guidance for jobs and remote opportunities worldwide.</p>
          <Link
            to="/assistant"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-primary shadow-elegant transition-transform hover:scale-105 active:scale-95"
          >
            <Sparkles className="h-4 w-4" /> Ask CareerNova AI
          </Link>
        </div>
      </section>

      <section className="px-5 pt-5">
        <form onSubmit={submitSearch} className="glass-strong flex items-center gap-2 rounded-2xl px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search roles, companies, scholarships…"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button type="submit" className="rounded-full bg-hero px-3 py-1 text-xs font-semibold text-white shadow-elegant">
            Search
          </button>
        </form>
      </section>

      <section className="px-5 pt-6">
        <div className="grid grid-cols-2 gap-3">
          {STATS.map(({ label, value, icon: Icon }) => (
            <GlassCard key={label} className="animate-in fade-in slide-in-from-bottom-3 duration-500">
              <div className="flex items-center gap-3">
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

      <section className="px-5 pt-6">
        <SectionHeader title="Quick actions" />
        <div className="grid grid-cols-2 gap-3">
          <Link to="/jobs" search={{ q: "", cat: "All" }} className="glass-strong rounded-2xl p-4 transition-all hover:-translate-y-0.5 hover:shadow-elegant">
            <div className="text-2xl">💼</div>
            <div className="mt-2 font-display text-sm font-bold">Find Jobs</div>
            <div className="mt-0.5 text-[11px] text-muted-foreground">Explore →</div>
          </Link>
          <Link to="/opportunities" search={{ tab: "internship", q: "" }} className="glass-strong rounded-2xl p-4 transition-all hover:-translate-y-0.5 hover:shadow-elegant">
            <div className="text-2xl">🎓</div>
            <div className="mt-2 font-display text-sm font-bold">Internships</div>
            <div className="mt-0.5 text-[11px] text-muted-foreground">Explore →</div>
          </Link>
          <Link to="/opportunities" search={{ tab: "scholarship", q: "" }} className="glass-strong rounded-2xl p-4 transition-all hover:-translate-y-0.5 hover:shadow-elegant">
            <div className="text-2xl">🏆</div>
            <div className="mt-2 font-display text-sm font-bold">Scholarships</div>
            <div className="mt-0.5 text-[11px] text-muted-foreground">Explore →</div>
          </Link>
          <Link to="/opportunities" search={{ tab: "remote", q: "" }} className="glass-strong rounded-2xl p-4 transition-all hover:-translate-y-0.5 hover:shadow-elegant">
            <div className="text-2xl">🌍</div>
            <div className="mt-2 font-display text-sm font-bold">Remote Jobs</div>
            <div className="mt-0.5 text-[11px] text-muted-foreground">Explore →</div>
          </Link>
        </div>
      </section>

      <section className="px-5 pt-6">
        <SectionHeader title="Trending categories" action={<TrendingUp className="h-4 w-4 text-primary" />} />
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TRENDING.map((t) => (
            <Link
              key={t.label}
              to="/jobs"
              search={{ q: t.label, cat: "All" }}
              className="glass shrink-0 rounded-2xl px-4 py-3"
            >
              <div className="text-xl">{t.icon}</div>
              <div className="mt-1 text-xs font-semibold">{t.label}</div>
              <div className="text-[10px] text-muted-foreground">{t.count} open</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-5 pt-6">
        <SectionHeader
          title="Recent opportunities"
          action={<Link to="/jobs" search={{ q: "", cat: "All" }} className="text-xs font-semibold text-primary">View all</Link>}
        />
        <div className="flex flex-col gap-3">
          {recent.map((o) => (
            <OpportunityCard
              key={o.id}
              opportunity={o}
              badges={
                <>
                  <Badge tone="primary">{o.category}</Badge>
                  {o.remote && <Badge tone="success">Remote</Badge>}
                </>
              }
            />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
