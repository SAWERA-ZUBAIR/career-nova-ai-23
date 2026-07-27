import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Mail, Lock, User, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { AppShell } from "@/components/AppShell";
import { GlassCard } from "@/components/ui-bits";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — CareerNova AI" },
      { name: "description", content: "Log in or create your CareerNova AI account to save opportunities and unlock AI career tools." },
      { property: "og:title", content: "Sign in — CareerNova AI" },
      { property: "og:description", content: "Access your CareerNova AI dashboard." },
    ],
  }),
  component: AuthPage,
});

type Mode = "signin" | "signup" | "forgot";

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/" });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back!");
        navigate({ to: "/" });
      } else if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { full_name: name },
          },
        });
        if (error) throw error;
        toast.success("Account created — you can sign in now.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        toast.success("Password reset link sent. Check your inbox.");
        setMode("signin");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const google = async () => {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error(result.error.message ?? "Google sign-in failed");
      setLoading(false);
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/" });
  };

  const title =
    mode === "signin" ? "Welcome back" : mode === "signup" ? "Create your account" : "Reset password";
  const subtitle =
    mode === "signin"
      ? "Sign in to save jobs and unlock AI career tools"
      : mode === "signup"
        ? "Join CareerNova AI in seconds"
        : "We'll email you a reset link";

  return (
    <AppShell>
      <div className="px-5 pt-10">
        <div className="mb-6 text-center">
          <div className="mx-auto h-20 w-20 overflow-hidden rounded-3xl bg-white shadow-elegant">
            <img src="/logo.png" alt="CareerNova AI" className="h-full w-full object-cover" width={80} height={80} />
          </div>
          <h1 className="mt-3 font-display text-2xl font-black">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        </div>

        <GlassCard>
          <form onSubmit={submit} className="flex flex-col gap-3">
            {mode === "signup" && (
              <label className="glass flex items-center gap-2 rounded-2xl px-3 py-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                />
              </label>
            )}
            <label className="glass flex items-center gap-2 rounded-2xl px-3 py-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none"
              />
            </label>
            {mode !== "forgot" && (
              <label className="glass flex items-center gap-2 rounded-2xl px-3 py-3">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password (min 6 chars)"
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                />
              </label>
            )}
            <button
              type="submit"
              disabled={loading}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-cta px-4 py-3 text-sm font-semibold text-white shadow-elegant transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
              {mode === "signin" ? "Sign in" : mode === "signup" ? "Create account" : "Send reset link"}
            </button>
          </form>

          {mode !== "forgot" && (
            <>
              <div className="my-3 flex items-center gap-2 text-[11px] text-muted-foreground">
                <div className="h-px flex-1 bg-border" />
                or continue with
                <div className="h-px flex-1 bg-border" />
              </div>
              <button
                type="button"
                onClick={google}
                disabled={loading}
                className="glass-strong flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold disabled:opacity-60"
              >
                <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden>
                  <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.3 29.3 35.5 24 35.5c-6.4 0-11.5-5.1-11.5-11.5S17.6 12.5 24 12.5c2.9 0 5.6 1.1 7.7 2.9l5.7-5.7C33.7 6.4 29.1 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5c10.7 0 19.5-7.7 19.5-19.5 0-1.3-.1-2.3-.4-3.5z"/>
                  <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.6 19 12.5 24 12.5c2.9 0 5.6 1.1 7.7 2.9l5.7-5.7C33.7 6.4 29.1 4.5 24 4.5 16.3 4.5 9.7 8.9 6.3 14.7z"/>
                  <path fill="#4CAF50" d="M24 43.5c5 0 9.5-1.9 12.9-5.1l-6-4.9c-2 1.4-4.4 2.3-6.9 2.3-5.2 0-9.7-3.2-11.3-7.7l-6.5 5C9.6 39 16.2 43.5 24 43.5z"/>
                  <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6 4.9C40.9 35.7 43.5 30.2 43.5 24c0-1.3-.1-2.3-.4-3.5z"/>
                </svg>
                Continue with Google
              </button>
            </>
          )}

          <div className="mt-4 flex flex-col items-center gap-1 text-xs">
            {mode === "signin" && (
              <>
                <button onClick={() => setMode("forgot")} className="text-primary font-semibold">
                  Forgot your password?
                </button>
                <div className="text-muted-foreground">
                  New here?{" "}
                  <button onClick={() => setMode("signup")} className="text-primary font-semibold">
                    Create an account
                  </button>
                </div>
              </>
            )}
            {mode === "signup" && (
              <div className="text-muted-foreground">
                Already have an account?{" "}
                <button onClick={() => setMode("signin")} className="text-primary font-semibold">
                  Sign in
                </button>
              </div>
            )}
            {mode === "forgot" && (
              <button onClick={() => setMode("signin")} className="text-primary font-semibold">
                Back to sign in
              </button>
            )}
          </div>
        </GlassCard>

        <p className="mt-4 text-center text-[11px] text-muted-foreground">
          Authentication is required to use CareerNova AI. Sign up or log in to access every feature.
        </p>
      </div>
    </AppShell>
  );
}
