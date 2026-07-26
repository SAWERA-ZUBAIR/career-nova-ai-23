import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell, ThemeToggle } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { GlassCard } from "@/components/ui-bits";
import { useSettings, type Settings } from "@/lib/storage";
import { supabase } from "@/integrations/supabase/client";
import { ChevronRight, LogOut, LogIn, Sparkles, FileText, MessageSquare, Map } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — CareerNova AI" },
      { name: "description", content: "Theme, notifications, privacy and account preferences." },
      { property: "og:title", content: "Settings — CareerNova AI" },
      { property: "og:description", content: "Your preferences." },
    ],
  }),
  component: SettingsPage,
});

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? "bg-hero" : "bg-muted"}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-all ${
          checked ? "left-[calc(100%-1.375rem)]" : "left-0.5"
        }`}
      />
    </button>
  );
}

function Row({ label, hint, right }: { label: string; hint?: string; right: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-3">
      <div className="min-w-0">
        <div className="truncate text-sm font-semibold">{label}</div>
        {hint && <div className="truncate text-xs text-muted-foreground">{hint}</div>}
      </div>
      {right}
    </div>
  );
}

function SettingsPage() {
  const [s, setS] = useSettings();
  const update = <K extends keyof Settings>(k: K, v: Settings[K]) => setS({ ...s, [k]: v });
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setEmail(session?.user?.email ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) toast.error(error.message);
    else {
      toast.success("Signed out");
      navigate({ to: "/auth" });
    }
  };

  const aiTools = [
    { to: "/assistant", label: "AI Career Advisor", icon: Sparkles },
    { to: "/cover-letter", label: "Cover Letter Generator", icon: FileText },
    { to: "/interview-coach", label: "Interview Coach", icon: MessageSquare },
    { to: "/roadmap", label: "Career Roadmap", icon: Map },
  ] as const;

  return (
    <AppShell>
      <PageHeader eyebrow="Preferences" title="Settings" subtitle="Personalize your experience" />

      <div className="flex flex-col gap-4 px-5">
        <GlassCard>
          <h3 className="mb-1 font-display text-sm font-bold">Account</h3>
          <div className="divide-y divide-border">
            {email ? (
              <>
                <Row label="Signed in as" hint={email} right={<span />} />
                <button onClick={logout} className="mt-1 flex w-full items-center justify-center gap-2 rounded-full bg-cta px-4 py-2.5 text-sm font-semibold text-white shadow-elegant">
                  <LogOut className="h-4 w-4" /> Sign out
                </button>
              </>
            ) : (
              <Link to="/auth" className="mt-1 flex items-center justify-center gap-2 rounded-full bg-cta px-4 py-2.5 text-sm font-semibold text-white shadow-elegant">
                <LogIn className="h-4 w-4" /> Sign in / Create account
              </Link>
            )}
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="mb-1 font-display text-sm font-bold">AI Tools</h3>
          <div className="flex flex-col gap-1">
            {aiTools.map(({ to, label, icon: Icon }) => (
              <Link key={to} to={to} className="glass flex items-center justify-between rounded-2xl px-3 py-3 text-sm font-semibold">
                <span className="inline-flex items-center gap-2"><Icon className="h-4 w-4 text-primary" /> {label}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="mb-1 font-display text-sm font-bold">Appearance</h3>
          <div className="divide-y divide-border">
            <Row label="Dark mode" hint="Switch theme" right={<ThemeToggle />} />
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="mb-1 font-display text-sm font-bold">Notifications</h3>
          <div className="divide-y divide-border">
            <Row
              label="Job alerts"
              hint="New roles matching your profile"
              right={<Toggle checked={s.notifications.jobAlerts} onChange={(v) => update("notifications", { ...s.notifications, jobAlerts: v })} />}
            />
            <Row
              label="Weekly digest"
              hint="Weekly opportunities summary"
              right={<Toggle checked={s.notifications.weeklyDigest} onChange={(v) => update("notifications", { ...s.notifications, weeklyDigest: v })} />}
            />
            <Row
              label="Deadline reminders"
              hint="Reminders before deadlines"
              right={<Toggle checked={s.notifications.deadlines} onChange={(v) => update("notifications", { ...s.notifications, deadlines: v })} />}
            />
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="mb-1 font-display text-sm font-bold">Privacy</h3>
          <div className="divide-y divide-border">
            <Row
              label="Public profile"
              hint="Let recruiters find you"
              right={<Toggle checked={s.privacy.profilePublic} onChange={(v) => update("privacy", { ...s.privacy, profilePublic: v })} />}
            />
            <Row
              label="Usage analytics"
              hint="Help us improve CareerNova AI"
              right={<Toggle checked={s.privacy.analytics} onChange={(v) => update("privacy", { ...s.privacy, analytics: v })} />}
            />
          </div>
        </GlassCard>

        <Link to="/notifications" className="glass-strong flex items-center justify-between rounded-2xl p-4 text-sm font-semibold">
          Open notification center <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </AppShell>
  );
}
