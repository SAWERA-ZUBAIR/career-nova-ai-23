import { ArrowUpRight, Bookmark } from "lucide-react";
import type { ReactNode } from "react";

export function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`glass-strong rounded-3xl p-4 ${className}`}>
      {children}
    </div>
  );
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
        active
          ? "bg-hero text-white shadow-elegant"
          : "glass text-foreground hover:scale-105"
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

export function OpportunityCard({
  logo,
  title,
  subtitle,
  meta,
  badges,
  deadline,
  onApply,
}: {
  logo: string;
  title: string;
  subtitle: string;
  meta?: string;
  badges?: ReactNode;
  deadline?: string;
  onApply?: () => void;
}) {
  return (
    <div className="glass-strong group rounded-3xl p-4 transition-all hover:-translate-y-0.5 hover:shadow-elegant animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-hero text-2xl shadow-elegant">
          {logo}
        </div>
        <div className="min-w-0">
          <h3 className="truncate font-display text-base font-bold">{title}</h3>
          <p className="truncate text-sm text-muted-foreground">{subtitle}</p>
          {meta && <p className="mt-0.5 truncate text-xs text-muted-foreground">{meta}</p>}
        </div>
        <button aria-label="Save" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary/15 hover:text-primary">
          <Bookmark className="h-4 w-4" />
        </button>
      </div>

      {badges && <div className="mt-3 flex flex-wrap gap-1.5">{badges}</div>}

      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="min-w-0 text-[11px] text-muted-foreground">
          {deadline && <>Deadline · <span className="font-semibold text-foreground">{deadline}</span></>}
        </div>
        <button
          onClick={onApply}
          className="inline-flex shrink-0 items-center gap-1 rounded-full bg-hero px-4 py-2 text-xs font-semibold text-white shadow-elegant transition-transform hover:scale-105 active:scale-95"
        >
          Apply <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
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
