import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, ThemeToggle } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { GlassCard } from "@/components/ui-bits";
import { useSettings, type Settings } from "@/lib/storage";
import { ChevronRight } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — CareerNova AI" },
      { name: "description", content: "Theme, language, notifications and privacy preferences." },
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

  return (
    <AppShell>
      <PageHeader eyebrow="Preferences" title="Settings" subtitle="Personalize your experience" />

      <div className="flex flex-col gap-4 px-5">
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
