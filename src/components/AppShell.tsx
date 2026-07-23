import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Briefcase, GraduationCap, Sparkles, User, Moon, Sun } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

const TABS = [
  { to: "/", label: "Home", icon: Home },
  { to: "/jobs", label: "Jobs", icon: Briefcase },
  { to: "/opportunities", label: "Opps", icon: GraduationCap },
  { to: "/assistant", label: "AI", icon: Sparkles },
  { to: "/profile", label: "Profile", icon: User },
] as const;

function useDarkMode() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("cn-theme");
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefers;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  const toggle = () => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("cn-theme", next ? "dark" : "light");
      return next;
    });
  };
  return { dark, toggle };
}

export function ThemeToggle() {
  const { dark, toggle } = useDarkMode();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="glass grid h-10 w-10 shrink-0 place-items-center rounded-full text-foreground transition-transform hover:scale-105 active:scale-95"
    >
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-[520px] flex-col bg-background bg-mesh">
      <main className="flex-1 pb-28">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[520px] px-4 pb-4">
        <div className="glass-strong flex items-center justify-around rounded-3xl px-2 py-2">
          {TABS.map(({ to, label, icon: Icon }) => {
            const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className="group relative flex min-w-0 flex-1 flex-col items-center gap-1 rounded-2xl px-2 py-2 transition-colors"
              >
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-all ${
                    active
                      ? "bg-hero text-white shadow-elegant scale-105"
                      : "text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span
                  className={`text-[10px] font-medium transition-colors ${
                    active ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
