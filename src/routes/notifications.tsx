import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { GlassCard, EmptyState } from "@/components/ui-bits";
import { useNotifications } from "@/lib/storage";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — CareerNova AI" },
      { name: "description", content: "Deadline reminders and career updates." },
      { property: "og:title", content: "Notifications — CareerNova AI" },
      { property: "og:description", content: "Your notification center." },
    ],
  }),
  component: NotifPage,
});

function NotifPage() {
  const { items, unread, markAllRead, markRead, clear } = useNotifications();
  return (
    <AppShell>
      <PageHeader eyebrow="Inbox" title="Notifications" subtitle={`${unread} unread`} />

      <div className="flex items-center justify-end gap-2 px-5">
        {items.length > 0 && (
          <>
            <button onClick={markAllRead} className="text-xs font-semibold text-primary">
              Mark all read
            </button>
            <button onClick={clear} className="text-xs font-semibold text-muted-foreground">
              Clear
            </button>
          </>
        )}
      </div>

      <div className="mt-3 flex flex-col gap-3 px-5">
        {items.length === 0 ? (
          <EmptyState title="You're all caught up" subtitle="New alerts and reminders will appear here." />
        ) : (
          items.map((n) => (
            <GlassCard key={n.id} className={n.read ? "opacity-70" : ""}>
              <button onClick={() => markRead(n.id)} className="w-full text-left">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-display text-sm font-bold">{n.title}</div>
                  {!n.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{n.body}</p>
                <p className="mt-1 text-[10px] text-muted-foreground">{new Date(n.createdAt).toLocaleString()}</p>
              </button>
            </GlassCard>
          ))
        )}
      </div>
    </AppShell>
  );
}
