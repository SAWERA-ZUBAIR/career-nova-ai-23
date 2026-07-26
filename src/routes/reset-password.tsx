import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Lock, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AppShell } from "@/components/AppShell";
import { GlassCard } from "@/components/ui-bits";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset password — CareerNova AI" },
      { name: "description", content: "Set a new password for your CareerNova AI account." },
      { property: "og:title", content: "Reset password — CareerNova AI" },
      { property: "og:description", content: "Set a new password." },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Supabase auto-parses the recovery hash into a session
    supabase.auth.getSession().then(({ data }) => {
      setReady(Boolean(data.session));
    });
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast.success("Password updated. You're signed in.");
      navigate({ to: "/" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <div className="px-5 pt-12">
        <h1 className="text-center font-display text-2xl font-black">Set a new password</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          {ready ? "Choose a strong new password." : "Open this page from the reset link in your email."}
        </p>
        <div className="mt-6">
          <GlassCard>
            <form onSubmit={submit} className="flex flex-col gap-3">
              <label className="glass flex items-center gap-2 rounded-2xl px-3 py-3">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New password"
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                />
              </label>
              <button
                type="submit"
                disabled={loading || !ready}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-cta px-4 py-3 text-sm font-semibold text-white shadow-elegant disabled:opacity-60"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                Update password
              </button>
            </form>
          </GlassCard>
        </div>
      </div>
    </AppShell>
  );
}
