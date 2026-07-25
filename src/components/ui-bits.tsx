import { ArrowUpRight, Bookmark } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useApplications, useSaved } from "@/lib/storage";
import type { Opportunity } from "@/lib/sample-data";

export function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`glass-strong rounded-3xl p-4 ${className}`}>{children}</div>;
}

export function SectionHeader({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="font-display text-lg font-bold tracking-tight">{title}</h2>
      {action}
    </div>
  );
}

export function Chip({ children, active = false, onClick }: { children: ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
        active ? "bg-hero text-white shadow-elegant" : "glass text-foreground hover:scale-105"
      }`}
    >
      {children}
    </button>
  );
}

export function Badge({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "success" | "warning" | "primary" }) {
  const tones = {
    default: "bg-muted text-muted-foreground",
    primary: "bg-primary/15 text-primary",
    success: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    warning: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function OpportunityCard({ opportunity, badges }: { opportunity: Opportunity; badges?: ReactNode }) {
  const { isSaved, toggle } = useSaved();
  const { record } = useApplications();
  const saved = isSaved(opportunity.id);
  const available = Boolean(opportunity.applyUrl && /^https?:\/\//.test(opportunity.applyUrl));

  const onApply = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!available) return;
    record(opportunity.id);
    window.open(opportunity.applyUrl, "_blank", "noopener,noreferrer");
  };
  const onSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(opportunity.id);
  };

  return (
    <Link
      to="/opportunity/$type/$id"
      params={{ type: opportunity.type, id: opportunity.id }}
      className="glass-strong group block rounded-3xl p-4 transition-all hover:-translate-y-0.5 hover:shadow-elegant animate-in fade-in slide-in-from-bottom-2 duration-500"
    >
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-hero text-2xl shadow-elegant">
          {opportunity.logo}
        </div>
        <div className="min-w-0">
          <h3 className="truncate font-display text-base font-bold">{opportunity.title}</h3>
          <p className="truncate text-sm text-muted-foreground">
            {opportunity.organization} · {opportunity.location}
          </p>
          {opportunity.meta && <p className="mt-0.5 truncate text-xs text-muted-foreground">{opportunity.meta}</p>}
        </div>
        <button
          onClick={onSave}
          aria-label={saved ? "Remove from saved" : "Save"}
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors ${
            saved ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground hover:bg-primary/15 hover:text-primary"
          }`}
        >
          <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {badges}
        <Badge tone="success">Free to Apply</Badge>
        {opportunity.officialSource && <Badge tone="primary">Official</Badge>}
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="min-w-0 text-[11px] text-muted-foreground">
          Deadline · <span className="font-semibold text-foreground">{opportunity.deadline}</span>
        </div>
        {available ? (
          <button
            onClick={onApply}
            className="inline-flex shrink-0 items-center gap-1 rounded-full bg-cta px-4 py-2 text-xs font-semibold text-white shadow-elegant transition-transform hover:scale-105 active:scale-95"
          >
            Apply <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        ) : (
          <button
            disabled
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            className="inline-flex shrink-0 cursor-not-allowed items-center gap-1 rounded-full bg-muted px-4 py-2 text-xs font-semibold text-muted-foreground"
          >
            Application Currently Unavailable
          </button>
        )}
      </div>
    </Link>
  );
}

export function EmptyState({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="glass-strong rounded-3xl p-8 text-center">
      <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-hero text-2xl">✨</div>
      <h3 className="font-display text-base font-bold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}
