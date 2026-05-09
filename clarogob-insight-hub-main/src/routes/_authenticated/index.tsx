import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import heroMockup from "@/assets/hero-mockup.png";
import {
  ShieldCheck, BarChart3, Eye, Wallet, Building2, Users, Lock, Smartphone,
  FileCheck2, Zap, Globe2, Database, Server, KeyRound, ArrowRight,
  Star, MapPin, CheckCircle2, AlertTriangle, TrendingUp, Activity, Layers,
  GraduationCap, HardHat, Sparkles, Mail, Twitter, Github, Linkedin, LogOut,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/_authenticated/")({
  head: () => ({
    meta: [
      { title: "ClaroGob — Transparencia Institucional Digital" },
      { name: "description", content: "Plataforma multiplataforma que convierte la información pública en datos claros, accesibles y verificables." },
      { property: "og:title", content: "ClaroGob — Transparencia Institucional" },
      { property: "og:description", content: "Datos públicos claros, accesibles y verificables." },
    ],
  }),
  component: Index,
});

function useCounter(target: number, duration = 1800) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            setVal(Math.floor(target * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.3 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return { ref, val };
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const { ref, val } = useCounter(to);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

function Nav() {
  const links = [
    ["Sobre", "#about"],
    ["Funciones", "#features"],
    ["Proyectos", "#projects"],
    ["Tecnología", "#tech"],
    ["Contacto", "#contact"],
  ];
  const navigate = useNavigate();
  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-4">
        <nav className="glass rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 text-white">
            <div className="size-8 rounded-lg gradient-brand grid place-items-center shadow-glow">
              <ShieldCheck className="size-4 text-white" />
            </div>
            <span className="font-semibold tracking-tight">ClaroGob</span>
          </a>
          <div className="hidden md:flex items-center gap-7 text-sm text-white/70">
            {links.map(([label, href]) => (
              <a key={href} href={href} className="hover:text-white transition">{label}</a>
            ))}
          </div>
          <button onClick={signOut} className="inline-flex items-center gap-2 text-sm font-medium gradient-brand text-white px-4 py-2 rounded-xl shadow-glow hover:opacity-90 transition">
            <LogOut className="size-4" /> Salir
          </button>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative gradient-hero text-white pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute -top-40 -left-40 size-[500px] rounded-full bg-brand/30 blur-3xl animate-blob" />
      <div className="absolute top-40 -right-40 size-[500px] rounded-full bg-success/20 blur-3xl animate-blob" style={{ animationDelay: "4s" }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-white/80 mb-6">
            <span className="size-2 rounded-full bg-success animate-pulse-glow" />
            Transparencia institucional en tiempo real
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
            Transformando la <span className="text-gradient-brand">Transparencia</span> Institucional
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-xl">
            ClaroGob convierte información pública compleja en datos claros, accesibles y verificables para estudiantes, padres de familia y ciudadanía.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="inline-flex items-center gap-2 gradient-brand text-white px-6 py-3 rounded-xl font-medium shadow-glow hover:opacity-90 transition">
              Ver proyectos <ArrowRight className="size-4" />
            </a>
            <a href="#features" className="inline-flex items-center gap-2 glass text-white px-6 py-3 rounded-xl font-medium hover:bg-white/10 transition">
              <Eye className="size-4" /> Explorar transparencia
            </a>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
            {[
              { n: 12500, s: "+", l: "Usuarios activos" },
              { n: 98, s: "%", l: "Satisfacción" },
              { n: 45, s: "+", l: "Proyectos" },
            ].map((it) => (
              <div key={it.l}>
                <div className="text-3xl font-bold text-gradient-brand">
                  <Counter to={it.n} suffix={it.s} />
                </div>
                <div className="text-xs text-white/60 mt-1">{it.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-brand/20 blur-3xl rounded-full animate-pulse-glow" />
          <img
            src={heroMockup}
            alt="App ClaroGob mostrando dashboard de transparencia"
            width={1024} height={1024}
            className="relative w-full max-w-lg mx-auto animate-float drop-shadow-2xl"
          />
          {/* Floating cards */}
          <div className="hidden md:block absolute top-10 -left-4 glass rounded-2xl p-4 shadow-glow animate-float" style={{ animationDelay: "1s" }}>
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-success/20 grid place-items-center"><TrendingUp className="size-5 text-success" /></div>
              <div>
                <div className="text-xs text-white/60">Ejecución</div>
                <div className="text-sm font-semibold">+ 24.8%</div>
              </div>
            </div>
          </div>
          <div className="hidden md:block absolute bottom-10 -right-4 glass rounded-2xl p-4 shadow-glow animate-float" style={{ animationDelay: "2s" }}>
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-brand/20 grid place-items-center"><FileCheck2 className="size-5 text-brand-glow" /></div>
              <div>
                <div className="text-xs text-white/60">Verificado</div>
                <div className="text-sm font-semibold">3,402 docs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ kicker, title, desc }: { kicker: string; title: string; desc?: string }) {
  return (
    <div className="max-w-2xl mx-auto text-center mb-14">
      <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-brand font-semibold mb-4">
        <Sparkles className="size-3" /> {kicker}
      </div>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">{title}</h2>
      {desc && <p className="mt-4 text-muted-foreground text-lg">{desc}</p>}
    </div>
  );
}

function About() {
  const timeline = [
    { y: "2024", t: "Concepto", d: "Investigación de necesidades de transparencia." },
    { y: "2025", t: "Prototipo", d: "Primera versión multiplataforma." },
    { y: "2025", t: "Piloto", d: "Implementación en CBTis No. 118." },
    { y: "2026", t: "Expansión", d: "Plataforma para instituciones públicas." },
  ];
  return (
    <section id="about" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader kicker="Sobre la marca" title="¿Qué es ClaroGob?" desc="Plataforma digital multiplataforma diseñada para democratizar el acceso a la información institucional mediante herramientas visuales intuitivas." />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-2 gap-4">
            {[
              { i: Eye, l: "Información clara", n: "+1,200 reportes" },
              { i: Users, l: "Comunidad activa", n: "+12K usuarios" },
              { i: ShieldCheck, l: "Datos verificados", n: "100% auditados" },
              { i: Globe2, l: "Multiplataforma", n: "iOS · Android · Web" },
            ].map((s) => (
              <div key={s.l} className="bg-card border border-border rounded-2xl p-5 shadow-card hover-lift">
                <s.i className="size-6 text-brand mb-3" />
                <div className="text-sm text-muted-foreground">{s.l}</div>
                <div className="font-semibold text-foreground mt-1">{s.n}</div>
              </div>
            ))}
          </div>

          <div className="relative pl-8">
            <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-brand to-success/50" />
            {timeline.map((t) => (
              <div key={t.t} className="relative mb-8 last:mb-0">
                <div className="absolute -left-[22px] size-3 rounded-full gradient-brand shadow-glow" />
                <div className="text-xs text-brand font-semibold">{t.y}</div>
                <div className="font-semibold text-foreground">{t.t}</div>
                <div className="text-sm text-muted-foreground">{t.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MissionVision() {
  const values = [
    { i: Zap, t: "Innovación", slug: "innovacion" },
    { i: ShieldCheck, t: "Honestidad", slug: "honestidad" },
    { i: Globe2, t: "Accesibilidad", slug: "accesibilidad" },
    { i: Users, t: "Participación", slug: "participacion" },
    { i: Lock, t: "Ética digital", slug: "etica-digital" },
  ];
  return (
    <section className="py-24 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader kicker="Visión y Misión" title="Lo que nos mueve" />
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="rounded-3xl p-8 bg-primary text-primary-foreground shadow-elegant relative overflow-hidden">
            <div className="absolute -top-20 -right-20 size-60 bg-brand/30 rounded-full blur-3xl" />
            <div className="text-xs uppercase tracking-[0.2em] text-brand-glow mb-2">Misión</div>
            <p className="text-2xl font-display font-medium leading-snug">
              Facilitar el acceso transparente a la información institucional mediante tecnología moderna, accesible y visualmente comprensible.
            </p>
          </div>
          <div className="rounded-3xl p-8 bg-card border border-border shadow-card relative overflow-hidden">
            <div className="absolute -top-20 -right-20 size-60 bg-success/20 rounded-full blur-3xl" />
            <div className="text-xs uppercase tracking-[0.2em] text-success mb-2">Visión</div>
            <p className="text-2xl font-display font-medium leading-snug text-foreground">
              Convertirse en la plataforma líder de transparencia digital en instituciones educativas y públicas de México.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {values.map((v) => (
            <Link key={v.t} to="/seccion/$slug" params={{ slug: v.slug }} className="bg-card border border-border rounded-2xl p-6 text-center hover-lift block">
              <div className="mx-auto size-12 rounded-xl gradient-brand grid place-items-center mb-3 shadow-glow">
                <v.i className="size-6 text-white" />
              </div>
              <div className="font-semibold text-foreground">{v.t}</div>
              <div className="text-xs text-brand mt-2 inline-flex items-center gap-1">Ver detalle <ArrowRight className="size-3" /></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProblemSolution() {
  const problems = ["Opacidad institucional", "Información difícil de entender", "Portales antiguos", "Falta de acceso rápido", "Desconfianza ciudadana"];
  const solutions = ["Aplicación móvil moderna", "Datos visuales e intuitivos", "Acceso multiplataforma", "Transparencia en tiempo real", "Participación ciudadana"];
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader kicker="Problema · Solución" title="De la opacidad a la claridad" />
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl p-8 bg-destructive/5 border border-destructive/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="size-12 rounded-xl bg-destructive/10 grid place-items-center">
                <AlertTriangle className="size-6 text-destructive" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">El problema</h3>
            </div>
            <ul className="space-y-3">
              {problems.map((p) => (
                <li key={p} className="flex items-start gap-3 text-foreground">
                  <span className="mt-2 size-1.5 rounded-full bg-destructive flex-shrink-0" /> {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl p-8 bg-success/5 border border-success/30 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 size-60 bg-success/20 rounded-full blur-3xl" />
            <div className="flex items-center gap-3 mb-6 relative">
              <div className="size-12 rounded-xl bg-success/15 grid place-items-center">
                <CheckCircle2 className="size-6 text-success" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">La solución</h3>
            </div>
            <ul className="space-y-3 relative">
              {solutions.map((s) => (
                <li key={s} className="flex items-start gap-3 text-foreground">
                  <CheckCircle2 className="mt-0.5 size-5 text-success flex-shrink-0" /> {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { i: Wallet, t: "Consulta de presupuestos", d: "Acceso instantáneo a desgloses claros.", slug: "consulta-presupuesto" },
    { i: Activity, t: "Seguimiento de proyectos", d: "Avances medibles y verificables.", slug: "seguimiento-proyectos" },
    { i: BarChart3, t: "Visualización de estadísticas", d: "Gráficos interactivos en tiempo real.", slug: "estadisticas" },
    { i: FileCheck2, t: "Rendición de cuentas", d: "Reportes oficiales auditables.", slug: "rendicion-cuentas" },
    { i: ShieldCheck, t: "Verificación oficial", d: "Sello institucional verificado.", slug: "verificacion-oficial" },
    { i: Layers, t: "Dashboard interactivo", d: "Control completo en un solo lugar.", slug: "dashboard-interactivo" },
    { i: Users, t: "Reportes ciudadanos", d: "Voz directa de la comunidad.", slug: "reportes-ciudadanos" },
    { i: Lock, t: "Seguridad de datos", d: "Cifrado de extremo a extremo.", slug: "seguridad-datos" },
    { i: Smartphone, t: "Acceso multiplataforma", d: "iOS, Android y web.", slug: "multiplataforma" },
  ];
  return (
    <section id="features" className="py-24 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader kicker="Funciones" title="Todo lo que necesitas para la transparencia" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <Link key={f.t} to="/seccion/$slug" params={{ slug: f.slug }} className="group bg-card border border-border rounded-2xl p-6 hover-lift relative overflow-hidden block">
              <div className="absolute -top-10 -right-10 size-32 bg-brand/0 group-hover:bg-brand/10 rounded-full blur-2xl transition" />
              <div className="size-12 rounded-xl gradient-brand grid place-items-center shadow-glow mb-4">
                <f.i className="size-6 text-white" />
              </div>
              <div className="font-semibold text-lg text-foreground">{f.t}</div>
              <div className="text-sm text-muted-foreground mt-1">{f.d}</div>
              <div className="text-xs text-brand mt-3 inline-flex items-center gap-1">Ver detalle <ArrowRight className="size-3" /></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const projects = [
    { t: "Remodelación de laboratorios", p: 78, b: "$1,250,000", d: "Dic 2026", s: "En progreso", i: HardHat, slug: "remodelacion-laboratorios" },
    { t: "Construcción de áreas deportivas", p: 42, b: "$890,000", d: "Mar 2027", s: "En progreso", i: Building2, slug: "areas-deportivas" },
    { t: "Programa de becas estudiantiles", p: 95, b: "$640,000", d: "Activo", s: "Completado", i: GraduationCap, slug: "becas-estudiantiles" },
    { t: "Modernización tecnológica", p: 61, b: "$2,100,000", d: "Jun 2027", s: "En progreso", i: Server, slug: "modernizacion-tecnologica" },
    { t: "Infraestructura educativa", p: 30, b: "$3,400,000", d: "Dic 2027", s: "Iniciando", i: Building2, slug: "infraestructura-educativa" },
    { t: "Equipamiento aulas digitales", p: 88, b: "$520,000", d: "Feb 2027", s: "Casi listo", i: Smartphone, slug: "aulas-digitales" },
  ];
  return (
    <section id="projects" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader kicker="Proyectos" title="Avance institucional verificable" desc="Galería en tiempo real de proyectos con presupuesto, avance y estado." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <Link key={p.t} to="/seccion/$slug" params={{ slug: p.slug }} className="bg-card border border-border rounded-2xl overflow-hidden shadow-card hover-lift block">
              <div className="h-36 gradient-hero relative overflow-hidden grid-bg">
                <div className="absolute inset-0 grid place-items-center">
                  <div className="size-16 rounded-2xl glass grid place-items-center shadow-glow">
                    <p.i className="size-8 text-white" />
                  </div>
                </div>
                <div className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full glass text-white">
                  {p.s}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-foreground">{p.t}</h3>
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">Avance</span>
                    <span className="font-semibold text-brand">{p.p}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full gradient-brand rounded-full transition-all duration-1000" style={{ width: `${p.p}%` }} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-border text-xs">
                  <div>
                    <div className="text-muted-foreground">Presupuesto</div>
                    <div className="font-semibold text-foreground">{p.b}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Entrega</div>
                    <div className="font-semibold text-foreground">{p.d}</div>
                  </div>
                </div>
                <div className="text-xs text-brand mt-4 inline-flex items-center gap-1">Ver detalle del proyecto <ArrowRight className="size-3" /></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { q: "Una plataforma increíblemente clara y fácil de usar.", a: "Padre de familia" },
    { q: "Ahora entendemos mejor cómo se utilizan los recursos.", a: "Estudiante CBTis 118" },
    { q: "El diseño es moderno y transmite mucha confianza.", a: "Docente" },
  ];
  return (
    <section className="py-24 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader kicker="Comunidad" title="Lo que opinan los usuarios" />
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {items.map((it) => (
            <div key={it.a} className="bg-card border border-border rounded-2xl p-6 shadow-card hover-lift">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-success text-success" />
                ))}
              </div>
              <p className="text-foreground italic">"{it.q}"</p>
              <div className="mt-4 text-sm text-muted-foreground">— {it.a}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto text-center">
          {[
            { l: "Calificación", v: <>4.9<span className="text-2xl">/5</span></> },
            { l: "Satisfacción", v: <><Counter to={98} suffix="%" /></> },
            { l: "Usuarios", v: <><Counter to={12500} suffix="+" /></> },
          ].map((s, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-5">
              <div className="text-3xl font-bold text-gradient-brand">{s.v}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Institutions() {
  const insts = [
    {
      n: "CBTis No. 118",
      sub: "Josefa Ortiz de Domínguez",
      a: "Av. Paseo Constituyentes S/N, Corregidora, Querétaro",
      cct: "22DCT0419N",
      c: "cbtis118.edu.mx",
      st: "Querétaro",
      s: "Activo",
    },
    {
      n: "CBTis No. 100",
      sub: "DGETI Nayarit",
      a: "Av. México S/N, Col. Francisco I. Madero, Tepic, Nayarit",
      cct: "18DCT0340E",
      c: "cbtis100.edu.mx",
      st: "Nayarit",
      s: "Activo",
    },
    {
      n: "CBTis No. 306",
      sub: "DGETI Nayarit",
      a: "Tepic, Nayarit",
      cct: "18DCT0049K",
      c: "dgeti.sep.gob.mx",
      st: "Nayarit",
      s: "Activo",
    },
    {
      n: "CBTis No. 236",
      sub: "DGETI Tamaulipas",
      a: "Reynosa, Tamaulipas",
      cct: "28DCT0050H",
      c: "cbtis236.edu.mx",
      st: "Tamaulipas",
      s: "Activo",
    },
    {
      n: "CETis No. 100",
      sub: "DGETI Nayarit",
      a: "Tepic, Nayarit",
      cct: "18DCT0001J",
      c: "dgeti.sep.gob.mx",
      st: "Nayarit",
      s: "En integración",
    },
    {
      n: "CECyTE Nayarit",
      sub: "Bachillerato Tecnológico",
      a: "Múltiples planteles, Nayarit",
      cct: "18ETC0001S",
      c: "cecytenay.edu.mx",
      st: "Nayarit",
      s: "Próximo",
    },
  ];
  const states = [
    { n: "Querétaro", c: 1 },
    { n: "Nayarit", c: 4 },
    { n: "Tamaulipas", c: 1 },
  ];
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader kicker="Red institucional" title="Planteles afiliados" desc="Centros de bachillerato tecnológico DGETI integrados a la red ClaroGob." />

        <div className="grid lg:grid-cols-3 gap-4 mb-10">
          {states.map((s) => (
            <div key={s.n} className="rounded-2xl gradient-hero p-6 text-white relative overflow-hidden grid-bg">
              <div className="absolute -bottom-10 -right-10 size-40 bg-brand/20 rounded-full blur-3xl" />
              <div className="relative flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-brand-glow">Estado</div>
                  <div className="text-2xl font-semibold mt-1">{s.n}</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gradient-brand">
                    <Counter to={s.c} />
                  </div>
                  <div className="text-xs text-white/60">planteles</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {insts.map((i) => (
            <article key={i.n} className="bg-card border border-border rounded-2xl p-6 shadow-card hover-lift">
              <div className="flex items-start justify-between mb-4">
                <div className="size-12 rounded-xl gradient-brand grid place-items-center shadow-glow">
                  <Building2 className="size-6 text-white" />
                </div>
                <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-full ${
                  i.s === "Activo" ? "bg-success/15 text-success"
                  : i.s === "En integración" ? "bg-brand/10 text-brand"
                  : "bg-muted text-muted-foreground"
                }`}>
                  {i.s}
                </span>
              </div>
              <h3 className="font-semibold text-foreground">{i.n}</h3>
              <div className="text-xs text-muted-foreground">{i.sub}</div>
              <div className="mt-4 flex items-start gap-2 text-sm text-foreground">
                <MapPin className="size-4 text-brand mt-0.5 flex-shrink-0" />
                <span>{i.a}</span>
              </div>
              <div className="mt-3 pt-3 border-t border-border grid grid-cols-2 gap-2 text-xs">
                <div>
                  <div className="text-muted-foreground">CCT</div>
                  <div className="font-semibold text-foreground font-mono">{i.cct}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Estado</div>
                  <div className="font-semibold text-foreground">{i.st}</div>
                </div>
              </div>
              <div className="mt-3 text-xs text-brand font-medium">{i.c}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Tech() {
  const stack = [
    { i: Smartphone, t: "Flutter" },
    { i: Layers, t: "React Native" },
    { i: Server, t: "APIs REST" },
    { i: KeyRound, t: "JWT" },
    { i: Lock, t: "HTTPS" },
    { i: Database, t: "DB seguras" },
    { i: Globe2, t: "Multiplataforma" },
    { i: ShieldCheck, t: "Arquitectura moderna" },
  ];
  return (
    <section id="tech" className="py-24 gradient-hero text-white relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-brand-glow font-semibold mb-4">
            <Sparkles className="size-3" /> Stack tecnológico
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Construido con tecnología <span className="text-gradient-brand">de vanguardia</span></h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stack.map((s) => (
            <div key={s.t} className="glass rounded-2xl p-6 text-center hover-lift">
              <s.i className="size-8 mx-auto mb-3 text-brand-glow" />
              <div className="font-semibold">{s.t}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Security() {
  const items = [
    { i: Lock, t: "Cifrado de datos", d: "AES-256 en reposo y TLS en tránsito." },
    { i: ShieldCheck, t: "Información verificada", d: "Sello institucional auditable." },
    { i: Server, t: "Servidores seguros", d: "Infraestructura redundante y monitoreada." },
    { i: KeyRound, t: "Privacidad del usuario", d: "Cumplimiento con normativas vigentes." },
  ];
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader kicker="Seguridad y ética" title="Confianza por diseño" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it) => (
            <div key={it.t} className="bg-card border border-border rounded-2xl p-6 hover-lift">
              <div className="size-12 rounded-xl bg-success/10 grid place-items-center mb-4">
                <it.i className="size-6 text-success" />
              </div>
              <div className="font-semibold text-foreground">{it.t}</div>
              <div className="text-sm text-muted-foreground mt-1">{it.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground pt-20 pb-10 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 size-[600px] bg-brand/20 blur-3xl rounded-full" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="size-8 rounded-lg gradient-brand grid place-items-center shadow-glow">
                <ShieldCheck className="size-4 text-white" />
              </div>
              <span className="font-semibold tracking-tight">ClaroGob</span>
            </div>
            <p className="text-sm text-white/60">Plataforma de transparencia institucional para una ciudadanía informada.</p>
          </div>
          <div>
            <div className="font-semibold mb-3">Plataforma</div>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#features" className="hover:text-white transition">Funciones</a></li>
              <li><a href="#projects" className="hover:text-white transition">Proyectos</a></li>
              <li><a href="#tech" className="hover:text-white transition">Tecnología</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Contacto</div>
            <ul className="space-y-2 text-sm text-white/60">
              <li className="flex items-center gap-2"><Mail className="size-4" /> hola@clarogob.mx</li>
              <li>CBTis No. 118 — Nayarit, MX</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Síguenos</div>
            <div className="flex gap-3">
              {[Twitter, Github, Linkedin].map((I, i) => (
                <a key={i} href="#" className="size-10 rounded-xl glass grid place-items-center hover:bg-white/10 transition">
                  <I className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row gap-4 justify-between items-center text-sm text-white/50">
          <div>© 2026 ClaroGob. Todos los derechos reservados.</div>
          <div className="text-center md:text-right italic text-white/70">
            "Transformando el derecho a saber en el derecho a entender."
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition">Términos</a>
            <a href="#" className="hover:text-white transition">Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Nav />
      <main>
        <Hero />
        <About />
        <MissionVision />
        <ProblemSolution />
        <Features />
        <Projects />
        <Testimonials />
        <Institutions />
        <Tech />
        <Security />
      </main>
      <Footer />
    </div>
  );
}
