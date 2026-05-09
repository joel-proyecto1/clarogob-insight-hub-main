import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/_authenticated")({
  component: AuthGate,
});

function AuthGate() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    let mounted = true;
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!mounted) return;
      const ok = !!session;
      setAuthed(ok);
      setReady(true);
      if (!ok) navigate({ to: "/auth", replace: true });
    });
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      const ok = !!data.session;
      setAuthed(ok);
      setReady(true);
      if (!ok) navigate({ to: "/auth", replace: true });
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  if (!ready || !authed) {
    return (
      <div className="min-h-screen grid place-items-center bg-background">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <div className="size-12 rounded-2xl gradient-brand grid place-items-center shadow-glow animate-pulse">
            <ShieldCheck className="size-6 text-white" />
          </div>
          <p className="text-sm">Verificando acceso…</p>
        </div>
      </div>
    );
  }

  return <Outlet />;
}