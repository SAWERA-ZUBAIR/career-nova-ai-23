import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Briefcase, GraduationCap, Globe2, Sparkles, TrendingUp, Search,
  FileText, MessageSquare, Map, Shield, Rocket, Heart, Mail, ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
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

const AI_TOOLS = [
  { to: "/assistant", label: "Career Advisor", desc: "Personalized recommendations", icon: Sparkles },
  { to: "/cover-letter", label: "Cover Letter", desc: "Tailored in seconds", icon: FileText },
  { to: "/interview-coach", label: "Interview Coach", desc: "Practice mock interviews", icon: MessageSquare },
  { to: "/roadmap", label: "Career Roadmap", desc: "Your phased plan", icon: Map },
] as const;

const WHY = [
  { icon: Rocket, title: "AI-powered guidance", desc: "Advice tuned to your goals and background." },
  { icon: Shield, title: "Verified opportunities", desc: "Free-to-apply, official sources only." },
  { icon: Heart, title: "Built for you", desc: "Students, grads and professionals worldwide." },
];

const FAQ = [
  { q: "Is CareerNova AI free?", a: "Yes. Browsing, saving and every AI tool are free — no paywalls or application fees." },
  { q: "Where do jobs come from?", a: "We surface verified roles from official employer sites and trusted platforms; expired listings are removed automatically." },
  { q: "How does the AI advisor work?", a: "It uses your education, skills and goals to generate concrete, personalized suggestions." },
  { q: "Do I need an account?", a: "No — you can browse without one. Signing in saves your bookmarks and applications across devices." },
];

function FeaturedRow({ type, title, to, search }: { type: string; title: string; to: "/jobs" | "/opportunities"; search: { q: string; cat: string } | { tab: string; q: string } }) {
  const items = useMemo(() => OPPORTUNITIES.filter((o) => o.type === type).slice(0, 3), [type]);
  if (items.length === 0) return null;
  return (
    <section className="px-5 pt-6">
      <SectionHeader
        title={title}
        action={<Link to={to} search={search as never} className="text-xs font-semibold text-primary">View all</Link>}
      />
      <div className="flex flex-col gap-3">
        {items.map((o) => (
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
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button onClick={() => setOpen((v) => !v)} className="glass w-full rounded-2xl px-4 py-3 text-left">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold">{q}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </div>
      {open && <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{a}</p>}
    </button>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return toast.error("Enter a valid email");
    try {
      const list = JSON.parse(localStorage.getItem("cn-newsletter") ?? "[]") as string[];
      if (!list.includes(email)) list.push(email);
      localStorage.setItem("cn-newsletter", JSON.stringify(list));
    } catch { /* ignore */ }
    toast.success("You're on the list ✨");
    setEmail("");
  };
  return (
    <GlassCard>
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-hero text-white shadow-elegant">
          <Mail className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="font-display text-sm font-bold">Weekly opportunity digest</div>
          <div className="text-[11px] text-muted-foreground">Hand-picked roles and scholarships, every week.</div>
        </div>
      </div>
      <form onSubmit={submit} className="mt-3 flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="glass min-w-0 flex-1 rounded-full px-3 py-2 text-sm outline-none"
        />
        <button type="submit" className="rounded-full bg-cta px-4 py-2 text-xs font-semibold text-white shadow-elegant">
          Subscribe
        </button>
      </form>
    </GlassCard>
  );
}

function Home() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/jobs", search: { q, cat: "All" } });
  };

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
        <SectionHeader title="AI career tools" action={<Sparkles className="h-4 w-4 text-primary" />} />
        <div className="grid grid-cols-2 gap-3">
          {AI_TOOLS.map(({ to, label, desc, icon: Icon }) => (
            <Link key={to} to={to} className="glass-strong rounded-2xl p-4 transition-all hover:-translate-y-0.5 hover:shadow-elegant">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-hero text-white shadow-elegant">
                <Icon className="h-5 w-5" />
              </div>
              <div className="mt-2 font-display text-sm font-bold">{label}</div>
              <div className="mt-0.5 text-[11px] text-muted-foreground">{desc}</div>
            </Link>
          ))}
        </div>
      </section>

      <FeaturedRow type="job" title="Featured jobs" to="/jobs" search={{ q: "", cat: "All" }} />
      <FeaturedRow type="internship" title="Featured internships" to="/opportunities" search={{ tab: "internship", q: "" }} />
      <FeaturedRow type="scholarship" title="Featured scholarships" to="/opportunities" search={{ tab: "scholarship", q: "" }} />
      <FeaturedRow type="remote" title="Featured remote roles" to="/opportunities" search={{ tab: "remote", q: "" }} />

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
        <SectionHeader title="Why CareerNova AI" />
        <div className="flex flex-col gap-3">
          {WHY.map(({ icon: Icon, title, desc }) => (
            <GlassCard key={title}>
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-hero text-white shadow-elegant">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-display text-sm font-bold">{title}</div>
                  <div className="text-[11px] text-muted-foreground">{desc}</div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="px-5 pt-6">
        <SectionHeader title="FAQ" />
        <div className="flex flex-col gap-2">
          {FAQ.map((item) => <FaqItem key={item.q} {...item} />)}
        </div>
      </section>

      <section className="px-5 pt-6">
        <Newsletter />
      </section>
    </AppShell>
  );
}
