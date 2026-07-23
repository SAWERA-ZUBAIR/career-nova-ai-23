import { createFileRoute } from "@tanstack/react-router";
import { Bell, FileText, Bookmark, Globe, Info, LogOut, ChevronRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { GlassCard, Badge } from "@/components/ui-bits";
import { ThemeToggle } from "@/components/AppShell";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — CareerNova AI" },
      { name: "description", content: "Manage your profile, resume, saved opportunities and preferences." },
      { property: "og:title", content: "Profile — CareerNova AI" },
      { property: "og:description", content: "Your CareerNova AI profile and settings." },
    ],
  }),
  component: ProfilePage,
});

function Row({ icon: Icon, label, value, action }: { icon: React.ComponentType<{ className?: string }>; label: string; value?: string; action?: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 py-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="truncate text-sm font-semibold">{label}</div>
        {value && <div className="truncate text-xs text-muted-foreground">{value}</div>}
      </div>
      {action ?? <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />}
    </div>
  );
}

function ProfilePage() {
  return (
    <AppShell>
      <PageHeader eyebrow="You" title="Profile" subtitle="Your CareerNova AI hub" />

      <div className="flex flex-col gap-4 px-5">
        <GlassCard>
          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-hero text-2xl font-black text-white shadow-elegant">
              AK
            </div>
            <div className="min-w-0">
              <h2 className="truncate font-display text-lg font-bold">Alex Kimani</h2>
              <p className="truncate text-xs text-muted-foreground">BSc Computer Science · Nairobi</p>
              <div className="mt-1 flex flex-wrap gap-1">
                <Badge tone="primary">React</Badge>
                <Badge tone="primary">Python</Badge>
                <Badge>SQL</Badge>
              </div>
            </div>
            <button className="shrink-0 rounded-full bg-hero px-3 py-2 text-xs font-semibold text-white shadow-elegant">
              Edit
            </button>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="font-display text-lg font-black">12</div>
              <div className="text-[10px] text-muted-foreground">Saved</div>
            </div>
            <div>
              <div className="font-display text-lg font-black">4</div>
              <div className="text-[10px] text-muted-foreground">Applied</div>
            </div>
            <div>
              <div className="font-display text-lg font-black">2</div>
              <div className="text-[10px] text-muted-foreground">Interviews</div>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="mb-1 font-display text-sm font-bold">Career</h3>
          <div className="divide-y divide-border">
            <Row icon={FileText} label="Resume" value="Upload or update your CV" />
            <Row icon={Bookmark} label="Saved opportunities" value="12 items" />
            <Row icon={Bell} label="Notifications" value="Job alerts, weekly digest" />
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="mb-1 font-display text-sm font-bold">Settings</h3>
          <div className="divide-y divide-border">
            <Row icon={Globe} label="Language" value="English" />
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/15 text-primary">🌗</div>
                <div>
                  <div className="text-sm font-semibold">Dark mode</div>
                  <div className="text-xs text-muted-foreground">Switch theme</div>
                </div>
              </div>
              <ThemeToggle />
            </div>
            <Row icon={Info} label="About CareerNova AI" value="v1.0" />
            <Row icon={LogOut} label="Log out" />
          </div>
        </GlassCard>

        <p className="pb-2 text-center text-[11px] text-muted-foreground">Made with ✨ by CareerNova AI</p>
      </div>
    </AppShell>
  );
}
