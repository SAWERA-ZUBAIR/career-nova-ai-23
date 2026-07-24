import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Bell, FileText, Bookmark, ClipboardList, Settings as SettingsIcon, Camera, Save, ChevronRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { GlassCard, Badge } from "@/components/ui-bits";
import { useApplications, useProfile, useSaved } from "@/lib/storage";

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

function Row({ icon: Icon, label, value, to, onClick }: { icon: React.ComponentType<{ className?: string }>; label: string; value?: string; to?: string; onClick?: () => void }) {
  const inner = (
    <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 py-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="truncate text-sm font-semibold">{label}</div>
        {value && <div className="truncate text-xs text-muted-foreground">{value}</div>}
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
    </div>
  );
  if (to) return <Link to={to}>{inner}</Link>;
  return <button onClick={onClick} className="w-full text-left">{inner}</button>;
}

function ProfilePage() {
  const [profile, setProfile] = useProfile();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile);
  const { ids } = useSaved();
  const { apps } = useApplications();
  const fileRef = useRef<HTMLInputElement>(null);
  const resumeRef = useRef<HTMLInputElement>(null);

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const onPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setProfile({ ...profile, photoDataUrl: String(reader.result) });
    reader.readAsDataURL(f);
  };

  const onResume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setProfile({ ...profile, resumeName: f.name });
  };

  const save = () => {
    setProfile(draft);
    setEditing(false);
  };

  const interviews = apps.filter((a) => a.status === "interviewing" || a.status === "offer").length;

  return (
    <AppShell>
      <PageHeader eyebrow="You" title="Profile" subtitle="Your CareerNova AI hub" />

      <div className="flex flex-col gap-4 px-5">
        <GlassCard>
          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4">
            <button onClick={() => fileRef.current?.click()} className="relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl bg-hero text-2xl font-black text-white shadow-elegant">
              {profile.photoDataUrl ? (
                <img src={profile.photoDataUrl} alt="Avatar" className="h-full w-full object-cover" />
              ) : (
                initials || "You"
              )}
              <span className="absolute bottom-0 right-0 grid h-5 w-5 place-items-center rounded-full bg-white text-primary shadow">
                <Camera className="h-3 w-3" />
              </span>
            </button>
            <input ref={fileRef} type="file" accept="image/*" onChange={onPhoto} className="hidden" />
            <div className="min-w-0">
              <h2 className="truncate font-display text-lg font-bold">{profile.name}</h2>
              <p className="truncate text-xs text-muted-foreground">{profile.education} · {profile.location ?? "—"}</p>
              <div className="mt-1 flex flex-wrap gap-1">
                {profile.skills.split(",").slice(0, 3).map((s) => (
                  <Badge key={s.trim()} tone="primary">{s.trim()}</Badge>
                ))}
              </div>
            </div>
            <button
              onClick={() => {
                setDraft(profile);
                setEditing((e) => !e);
              }}
              className="shrink-0 rounded-full bg-hero px-3 py-2 text-xs font-semibold text-white shadow-elegant"
            >
              {editing ? "Cancel" : "Edit"}
            </button>
          </div>

          {editing && (
            <div className="mt-4 flex flex-col gap-3">
              {(["name", "email", "education", "skills", "experience", "location"] as const).map((k) => (
                <label key={k} className="block">
                  <span className="mb-1 block text-xs font-semibold capitalize text-muted-foreground">{k}</span>
                  <input
                    value={(draft[k] as string | undefined) ?? ""}
                    onChange={(e) => setDraft({ ...draft, [k]: e.target.value })}
                    className="glass w-full rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </label>
              ))}
              <button onClick={save} className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-hero px-4 py-3 text-sm font-semibold text-white shadow-elegant">
                <Save className="h-4 w-4" /> Save changes
              </button>
            </div>
          )}
        </GlassCard>

        <GlassCard>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="font-display text-lg font-black">{ids.length}</div>
              <div className="text-[10px] text-muted-foreground">Saved</div>
            </div>
            <div>
              <div className="font-display text-lg font-black">{apps.length}</div>
              <div className="text-[10px] text-muted-foreground">Applied</div>
            </div>
            <div>
              <div className="font-display text-lg font-black">{interviews}</div>
              <div className="text-[10px] text-muted-foreground">Interviews</div>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="mb-1 font-display text-sm font-bold">Career</h3>
          <div className="divide-y divide-border">
            <Row icon={FileText} label="Resume" value={profile.resumeName ?? "Upload your CV"} onClick={() => resumeRef.current?.click()} />
            <input ref={resumeRef} type="file" accept=".pdf,.doc,.docx" onChange={onResume} className="hidden" />
            <Row icon={Bookmark} label="Saved opportunities" value={`${ids.length} items`} to="/saved" />
            <Row icon={ClipboardList} label="Applications" value={`${apps.length} tracked`} to="/applications" />
            <Row icon={Bell} label="Notifications" value="Job alerts, weekly digest" to="/notifications" />
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="mb-1 font-display text-sm font-bold">More</h3>
          <div className="divide-y divide-border">
            <Row icon={SettingsIcon} label="Settings" value="Theme, language, privacy" to="/settings" />
          </div>
        </GlassCard>

        <p className="pb-2 text-center text-[11px] text-muted-foreground">Made with ✨ by CareerNova AI</p>
      </div>
    </AppShell>
  );
}
