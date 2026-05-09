import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ShieldCheck, Mail, Lock, User, Loader2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Acceder · ClaroGob" },
      { name: "description", content: "Inicia sesión o crea una cuenta para acceder a la información institucional de ClaroGob." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/", replace: true });
    });
  }, [navigate]);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      if (mode === "signup") {
        if (username.trim().length < 3) throw new Error("El usuario debe tener al menos 3 caracteres.");
        if (password.length < 6) throw new Error("La contraseña debe tener al menos 6 caracteres.");
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: { username: username.trim() },
            emailRedirectTo: `${window.location.origin}/`,
          },
        });
        if (error) throw error;
        setInfo("Cuenta creada. Iniciando sesión…");
        const { error: signInErr } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (signInErr) throw signInErr;
        navigate({ to: "/", replace: true });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) throw error;
        navigate({ to: "/", replace: true });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Algo salió mal.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative gradient-hero text-white grid place-items-center px-4 py-16 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute -top-40 -left-40 size-[500px] rounded-full bg-brand/30 blur-3xl animate-blob" />
      <div className="absolute -bottom-40 -right-40 size-[500px] rounded-full bg-success/20 blur-3xl animate-blob" style={{ animationDelay: "3s" }} />

      <div className="relative w-full max-w-md">
        <Link to="/auth" className="flex items-center justify-center gap-2 mb-8">
          <div className="size-10 rounded-xl gradient-brand grid place-items-center shadow-glow">
            <ShieldCheck className="size-5 text-white" />
          </div>
          <span className="text-xl font-semibold tracking-tight">ClaroGob</span>
        </Link>

        <div className="glass rounded-3xl p-8 shadow-glow">
          <h1 className="text-3xl font-bold tracking-tight">
            {mode === "login" ? "Bienvenido de vuelta" : "Crea tu cuenta"}
          </h1>
          <p className="text-sm text-white/60 mt-2">
            {mode === "login"
              ? "Inicia sesión para acceder a la información institucional."
              : "Regístrate para explorar transparencia y rendición de cuentas."}
          </p>

          <form onSubmit={handle} className="mt-6 space-y-4">
            {mode === "signup" && (
              <Field icon={User} label="Nombre de usuario">
                <input
                  type="text"
                  required
                  minLength={3}
                  maxLength={40}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="ej. ana_perez"
                  className="w-full bg-transparent outline-none placeholder:text-white/30 text-white"
                />
              </Field>
            )}
            <Field icon={Mail} label="Correo electrónico">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="w-full bg-transparent outline-none placeholder:text-white/30 text-white"
              />
            </Field>
            <Field icon={Lock} label="Contraseña">
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="w-full bg-transparent outline-none placeholder:text-white/30 text-white"
              />
            </Field>

            {error && (
              <div className="text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
                {error}
              </div>
            )}
            {info && (
              <div className="text-sm text-success bg-success/10 border border-success/30 rounded-lg px-3 py-2">
                {info}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 gradient-brand text-white px-6 py-3 rounded-xl font-medium shadow-glow hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : <ArrowRight className="size-4" />}
              {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-white/60">
            {mode === "login" ? (
              <>
                ¿No tienes cuenta?{" "}
                <button onClick={() => { setMode("signup"); setError(null); }} className="text-brand-glow font-medium hover:underline">
                  Regístrate
                </button>
              </>
            ) : (
              <>
                ¿Ya tienes cuenta?{" "}
                <button onClick={() => { setMode("login"); setError(null); }} className="text-brand-glow font-medium hover:underline">
                  Inicia sesión
                </button>
              </>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-white/40 mt-6">
          Compatible con iOS, Android y PC.
        </p>
      </div>
    </div>
  );
}

function Field({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-white/50">{label}</span>
      <div className="mt-1.5 flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-3.5 py-3 focus-within:border-brand transition">
        <Icon className="size-4 text-white/50 flex-shrink-0" />
        {children}
      </div>
    </label>
  );
}