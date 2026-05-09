import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ShieldCheck, ArrowLeft, CheckCircle2, BarChart3, Wallet, Activity, FileCheck2,
  Layers, Users, Lock, Smartphone, Zap, Globe2, HardHat, Building2,
  GraduationCap, Server, Sparkles, TrendingUp, MapPin, AlertTriangle,
} from "lucide-react";

type Section = {
  kicker: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  highlights: { label: string; value: string }[];
  body: { heading: string; text: string }[];
  bullets?: string[];
};

const SECTIONS: Record<string, Section> = {
  // Valores
  innovacion: {
    kicker: "Valor institucional",
    title: "Innovación",
    subtitle: "Aplicamos tecnología moderna para reinventar la transparencia en instituciones educativas y públicas.",
    icon: Zap,
    highlights: [
      { label: "Stack moderno", value: "Flutter · React · TanStack" },
      { label: "Despliegues por mes", value: "+18" },
      { label: "Tiempo de carga", value: "< 1.2 s" },
    ],
    body: [
      { heading: "Tecnología al servicio del ciudadano", text: "Adoptamos arquitecturas multiplataforma, IA aplicada y dashboards interactivos para que cualquier persona pueda entender la información pública sin barreras técnicas." },
      { heading: "Mejora continua", text: "Iteramos cada dos semanas con feedback real de estudiantes, docentes y padres de familia. Cada nueva versión es más rápida, accesible y precisa." },
    ],
    bullets: ["Integración con sistemas DGETI", "Componentes accesibles WCAG AA", "Notificaciones en tiempo real"],
  },
  honestidad: {
    kicker: "Valor institucional",
    title: "Honestidad",
    subtitle: "Mostramos los datos tal como son: sin filtros, sin maquillaje, con trazabilidad completa.",
    icon: ShieldCheck,
    highlights: [
      { label: "Documentos verificados", value: "3,402" },
      { label: "Auditorías externas", value: "4 / año" },
      { label: "Discrepancias reportadas", value: "0.2%" },
    ],
    body: [
      { heading: "Datos verificables", text: "Cada cifra publicada incluye su fuente oficial, fecha de captura y firma digital del responsable institucional." },
      { heading: "Errores corregidos en público", text: "Si encontramos un dato incorrecto, lo corregimos visiblemente con bitácora de cambios accesible para cualquier usuario." },
    ],
  },
  accesibilidad: {
    kicker: "Valor institucional",
    title: "Accesibilidad",
    subtitle: "Información pública diseñada para todos: lectores de pantalla, alto contraste, lenguaje claro.",
    icon: Globe2,
    highlights: [
      { label: "Cumplimiento", value: "WCAG 2.1 AA" },
      { label: "Plataformas", value: "iOS · Android · PC" },
      { label: "Idiomas", value: "Español · Inglés" },
    ],
    body: [
      { heading: "Diseño inclusivo", text: "Tipografías legibles, contraste alto, navegación por teclado y soporte para lectores de pantalla en cada componente." },
      { heading: "Compatible en todos lados", text: "Funciona en celulares de gama baja, tablets y computadoras antiguas. La conexión lenta no es excusa para no informar." },
    ],
  },
  participacion: {
    kicker: "Valor institucional",
    title: "Participación ciudadana",
    subtitle: "La transparencia no es ver, es opinar y exigir. Damos voz a la comunidad.",
    icon: Users,
    highlights: [
      { label: "Reportes ciudadanos", value: "1,847" },
      { label: "Tasa de respuesta", value: "92%" },
      { label: "Tiempo medio", value: "48 h" },
    ],
    body: [
      { heading: "Reportes públicos", text: "Cualquier estudiante o padre de familia puede reportar irregularidades, dar seguimiento y ver la respuesta oficial." },
      { heading: "Encuestas vinculantes", text: "Las decisiones sobre infraestructura escolar pasan por consultas digitales abiertas a la comunidad afiliada." },
    ],
  },
  "etica-digital": {
    kicker: "Valor institucional",
    title: "Ética digital",
    subtitle: "Protegemos la privacidad de cada usuario y manejamos los datos con responsabilidad.",
    icon: Lock,
    highlights: [
      { label: "Cifrado", value: "AES-256 / TLS 1.3" },
      { label: "Datos personales", value: "Mínimos necesarios" },
      { label: "Cumplimiento", value: "LFPDPPP" },
    ],
    body: [
      { heading: "Privacidad por diseño", text: "Sólo recopilamos lo indispensable y nunca compartimos información personal con terceros." },
      { heading: "Tú controlas tus datos", text: "Puedes exportar o eliminar tu cuenta en cualquier momento desde la app." },
    ],
  },

  // Funciones
  "consulta-presupuesto": {
    kicker: "Función",
    title: "Consulta de presupuesto",
    subtitle: "Desgloses claros del presupuesto institucional, partida por partida.",
    icon: Wallet,
    highlights: [
      { label: "Presupuesto anual 2026", value: "$ 28.4 M" },
      { label: "Partidas publicadas", value: "147" },
      { label: "Última actualización", value: "Hoy" },
    ],
    body: [
      { heading: "Origen del recurso", text: "Federal, estatal y propios — visualizado por porcentajes y montos exactos." },
      { heading: "Destino", text: "Infraestructura 38%, becas 22%, equipamiento 18%, mantenimiento 14%, administración 8%." },
    ],
    bullets: ["Comparativos año vs año", "Búsqueda por concepto", "Descarga en CSV / PDF"],
  },
  "seguimiento-proyectos": {
    kicker: "Función",
    title: "Seguimiento de proyectos",
    subtitle: "Avance verificable de cada proyecto institucional, con evidencia fotográfica y bitácora oficial.",
    icon: Activity,
    highlights: [
      { label: "Proyectos activos", value: "12" },
      { label: "Avance promedio", value: "64%" },
      { label: "Inversión en curso", value: "$ 8.8 M" },
    ],
    body: [
      { heading: "Bitácora abierta", text: "Cada hito incluye fecha, responsable, foto y porcentaje certificado por supervisión externa." },
      { heading: "Alertas automáticas", text: "Si un proyecto se atrasa más de 15 días, se notifica a la comunidad y al órgano de control interno." },
    ],
  },
  estadisticas: {
    kicker: "Función",
    title: "Visualización de estadísticas",
    subtitle: "Gráficos interactivos en tiempo real sobre matrícula, ejecución y desempeño institucional.",
    icon: BarChart3,
    highlights: [
      { label: "Indicadores activos", value: "42" },
      { label: "Datasets públicos", value: "120+" },
      { label: "Frecuencia", value: "Tiempo real" },
    ],
    body: [
      { heading: "Dashboards por categoría", text: "Académico, financiero, operativo y comunidad. Cada uno con filtros por plantel, ciclo escolar y área." },
      { heading: "Comparativos entre planteles", text: "Compara avances entre CBTis 118, 100, 306 y 236 con métricas estandarizadas." },
    ],
  },
  "rendicion-cuentas": {
    kicker: "Función",
    title: "Rendición de cuentas",
    subtitle: "Reportes oficiales auditables: ingresos, egresos, contratos y responsables.",
    icon: FileCheck2,
    highlights: [
      { label: "Reportes publicados", value: "318" },
      { label: "Contratos abiertos", value: "47" },
      { label: "Cobertura", value: "100% del ejercicio" },
    ],
    body: [
      { heading: "Trimestral y anual", text: "Documentos firmados digitalmente por la dirección del plantel y el órgano de control institucional." },
      { heading: "Acceso histórico", text: "Consulta los últimos 5 ejercicios fiscales completos." },
    ],
  },
  "verificacion-oficial": {
    kicker: "Función",
    title: "Verificación oficial",
    subtitle: "Cada documento lleva sello institucional verificable mediante hash y firma digital.",
    icon: ShieldCheck,
    highlights: [
      { label: "Documentos firmados", value: "3,402" },
      { label: "Tiempo de validación", value: "< 2 s" },
      { label: "Algoritmo", value: "SHA-256 + RSA-2048" },
    ],
    body: [
      { heading: "Cómo funciona", text: "Cada PDF emitido incluye un hash único registrado en nuestra cadena de custodia. Puedes validar su autenticidad desde la app." },
      { heading: "Anti-falsificación", text: "Si alguien modifica un documento, el sello se invalida automáticamente." },
    ],
  },
  "dashboard-interactivo": {
    kicker: "Función",
    title: "Dashboard interactivo",
    subtitle: "Toda la información institucional en un solo panel, personalizable por rol.",
    icon: Layers,
    highlights: [
      { label: "Widgets disponibles", value: "24" },
      { label: "Vistas guardadas", value: "Ilimitadas" },
      { label: "Exportación", value: "PDF · CSV · PNG" },
    ],
    body: [
      { heading: "Personalízalo", text: "Arrastra los widgets que más te interesan: presupuesto, proyectos, estadísticas, alertas." },
      { heading: "Modo presentación", text: "Ideal para reuniones de Consejo Técnico Escolar y comparecencias públicas." },
    ],
  },
  "reportes-ciudadanos": {
    kicker: "Función",
    title: "Reportes ciudadanos",
    subtitle: "La comunidad detecta, reporta y da seguimiento. Sin filtros intermedios.",
    icon: Users,
    highlights: [
      { label: "Reportes en 2026", value: "1,847" },
      { label: "Resueltos", value: "1,701 (92%)" },
      { label: "Tiempo promedio", value: "48 h" },
    ],
    body: [
      { heading: "Categorías", text: "Infraestructura, seguridad, servicios, administrativo, académico." },
      { heading: "Seguimiento público", text: "Cada reporte recibe folio, estado y respuesta oficial visible para todos." },
    ],
  },
  "seguridad-datos": {
    kicker: "Función",
    title: "Seguridad de datos",
    subtitle: "Cifrado de extremo a extremo y arquitectura zero-trust.",
    icon: Lock,
    highlights: [
      { label: "Cifrado en reposo", value: "AES-256" },
      { label: "Cifrado en tránsito", value: "TLS 1.3" },
      { label: "Auditoría", value: "Mensual" },
    ],
    body: [
      { heading: "Infraestructura", text: "Servidores redundantes con respaldos diarios cifrados y geográficamente distribuidos." },
      { heading: "Acceso", text: "Autenticación multifactor opcional, JWT con expiración corta y rotación automática." },
    ],
  },
  multiplataforma: {
    kicker: "Función",
    title: "Acceso multiplataforma",
    subtitle: "iOS, Android y PC. Misma información, misma experiencia, en cualquier lugar.",
    icon: Smartphone,
    highlights: [
      { label: "Plataformas", value: "iOS · Android · PC" },
      { label: "Versión PWA", value: "Disponible" },
      { label: "Modo offline", value: "Lectura completa" },
    ],
    body: [
      { heading: "Diseño responsive", text: "Funciona perfectamente en celular, tablet y computadora. Sin descargas obligatorias." },
      { heading: "Sincronización", text: "Tus filtros y vistas guardadas viajan contigo entre dispositivos." },
    ],
  },

  // Proyectos
  "remodelacion-laboratorios": {
    kicker: "Proyecto",
    title: "Remodelación de laboratorios",
    subtitle: "Modernización integral de laboratorios de electrónica, química y cómputo del CBTis 118.",
    icon: HardHat,
    highlights: [
      { label: "Avance", value: "78%" },
      { label: "Presupuesto", value: "$ 1,250,000" },
      { label: "Entrega", value: "Diciembre 2026" },
    ],
    body: [
      { heading: "Alcance", text: "Sustitución de mobiliario, instalación eléctrica, sistemas de seguridad y equipo nuevo en 4 laboratorios." },
      { heading: "Avance actual", text: "Obra civil al 100%, instalaciones al 85%, equipamiento en proceso de licitación pública." },
    ],
    bullets: ["Lab. de electrónica · 100%", "Lab. de química · 70%", "Lab. de cómputo · 60%", "Lab. de física · 80%"],
  },
  "areas-deportivas": {
    kicker: "Proyecto",
    title: "Construcción de áreas deportivas",
    subtitle: "Cancha multiusos techada, gimnasio al aire libre y pista de atletismo.",
    icon: Building2,
    highlights: [
      { label: "Avance", value: "42%" },
      { label: "Presupuesto", value: "$ 890,000" },
      { label: "Entrega", value: "Marzo 2027" },
    ],
    body: [
      { heading: "Alcance", text: "1,200 m² de superficie deportiva con iluminación LED, gradas y vestidores adaptados." },
      { heading: "Beneficiarios", text: "Aproximadamente 1,800 estudiantes de turno matutino y vespertino." },
    ],
  },
  "becas-estudiantiles": {
    kicker: "Proyecto",
    title: "Programa de becas estudiantiles",
    subtitle: "Apoyo económico mensual a estudiantes de escasos recursos y alto rendimiento.",
    icon: GraduationCap,
    highlights: [
      { label: "Avance", value: "95% (activo)" },
      { label: "Presupuesto", value: "$ 640,000" },
      { label: "Beneficiarios", value: "320 estudiantes" },
    ],
    body: [
      { heading: "Modalidades", text: "Excelencia académica, apoyo socioeconómico, transporte y alimentación." },
      { heading: "Convocatoria", text: "Abierta dos veces al año. Resultados publicados en este portal con folio público." },
    ],
  },
  "modernizacion-tecnologica": {
    kicker: "Proyecto",
    title: "Modernización tecnológica",
    subtitle: "Renovación de la red institucional, servidores y plataformas digitales.",
    icon: Server,
    highlights: [
      { label: "Avance", value: "61%" },
      { label: "Presupuesto", value: "$ 2,100,000" },
      { label: "Entrega", value: "Junio 2027" },
    ],
    body: [
      { heading: "Infraestructura", text: "Fibra óptica en todo el campus, 38 puntos de acceso WiFi 6 y nuevos servidores virtualizados." },
      { heading: "Plataformas", text: "Migración del sistema escolar a la nube y nuevo portal académico para estudiantes." },
    ],
  },
  "infraestructura-educativa": {
    kicker: "Proyecto",
    title: "Infraestructura educativa",
    subtitle: "Construcción de 6 aulas nuevas, biblioteca y centro de orientación educativa.",
    icon: Building2,
    highlights: [
      { label: "Avance", value: "30% (iniciando)" },
      { label: "Presupuesto", value: "$ 3,400,000" },
      { label: "Entrega", value: "Diciembre 2027" },
    ],
    body: [
      { heading: "Alcance", text: "Edificio de 2 niveles con 1,400 m² construidos, accesibilidad universal y eficiencia energética." },
      { heading: "Etapa actual", text: "Cimentación y estructura. Proceso licitatorio publicado en este portal." },
    ],
  },
  "aulas-digitales": {
    kicker: "Proyecto",
    title: "Equipamiento de aulas digitales",
    subtitle: "Pizarras interactivas, equipo de cómputo y conectividad para 12 aulas.",
    icon: Smartphone,
    highlights: [
      { label: "Avance", value: "88% (casi listo)" },
      { label: "Presupuesto", value: "$ 520,000" },
      { label: "Entrega", value: "Febrero 2027" },
    ],
    body: [
      { heading: "Equipamiento", text: "Pantalla interactiva 75'', laptop docente, sistema de audio y conectividad WiFi 6 por aula." },
      { heading: "Capacitación", text: "Programa de formación docente incluido. 48 profesores capacitados a la fecha." },
    ],
  },
};

export const Route = createFileRoute("/_authenticated/seccion/$slug")({
  head: ({ params }) => {
    const sec = SECTIONS[params.slug];
    const title = sec ? `${sec.title} · ClaroGob` : "Sección · ClaroGob";
    const description = sec ? sec.subtitle : "Información detallada en ClaroGob.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  loader: ({ params }) => {
    if (!SECTIONS[params.slug]) throw notFound();
    return { slug: params.slug };
  },
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center bg-background px-4">
      <div className="text-center">
        <AlertTriangle className="size-10 text-destructive mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-foreground">Sección no encontrada</h1>
        <p className="text-muted-foreground mt-2">El apartado que buscas no existe.</p>
        <Link to="/" className="mt-6 inline-flex items-center gap-2 gradient-brand text-white px-5 py-2.5 rounded-xl shadow-glow">
          <ArrowLeft className="size-4" /> Volver al inicio
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="min-h-screen grid place-items-center bg-background px-4">
      <div className="text-center max-w-md">
        <p className="text-sm text-muted-foreground">{error.message}</p>
        <button onClick={reset} className="mt-4 px-4 py-2 rounded-xl bg-primary text-primary-foreground">Reintentar</button>
      </div>
    </div>
  ),
  component: SectionPage,
});

function SectionPage() {
  const { slug } = Route.useParams();
  const sec = SECTIONS[slug];
  if (!sec) return null;
  const Icon = sec.icon;

  return (
    <div className="min-h-screen bg-background">
      <header className="relative gradient-hero text-white pt-16 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute -top-20 -right-20 size-[400px] bg-brand/30 blur-3xl rounded-full animate-blob" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition mb-8">
            <ArrowLeft className="size-4" /> Volver al inicio
          </Link>
          <div className="flex items-start gap-5">
            <div className="size-14 rounded-2xl gradient-brand grid place-items-center shadow-glow flex-shrink-0">
              <Icon className="size-7 text-white" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-brand-glow font-semibold mb-2">
                <Sparkles className="size-3" /> {sec.kicker}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{sec.title}</h1>
              <p className="mt-3 text-white/70 text-lg max-w-2xl">{sec.subtitle}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-16">
        {/* Highlights */}
        <div className="grid sm:grid-cols-3 gap-4 -mt-32 relative z-10 mb-12">
          {sec.highlights.map((h) => (
            <div key={h.label} className="bg-card border border-border rounded-2xl p-5 shadow-card">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{h.label}</div>
              <div className="text-2xl font-bold text-gradient-brand mt-1">{h.value}</div>
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {sec.body.map((b) => (
            <article key={b.heading} className="bg-card border border-border rounded-2xl p-6 shadow-card">
              <h2 className="text-xl font-semibold text-foreground">{b.heading}</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{b.text}</p>
            </article>
          ))}
        </div>

        {sec.bullets && (
          <div className="bg-card border border-border rounded-2xl p-6 shadow-card mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">Detalles clave</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {sec.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-foreground">
                  <CheckCircle2 className="mt-0.5 size-5 text-success flex-shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer info */}
        <div className="rounded-3xl p-8 bg-primary text-primary-foreground shadow-elegant relative overflow-hidden">
          <div className="absolute -top-20 -right-20 size-60 bg-brand/30 rounded-full blur-3xl" />
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-brand-glow font-semibold mb-2">
                <ShieldCheck className="size-3" /> Verificado
              </div>
              <h3 className="text-xl font-semibold">Información oficial ClaroGob</h3>
              <p className="text-sm text-white/70 mt-1">
                Datos auditables · Última actualización en tiempo real · Plantel CBTis 118
              </p>
            </div>
            <Link to="/" className="inline-flex items-center justify-center gap-2 gradient-brand text-white px-5 py-3 rounded-xl shadow-glow font-medium">
              <ArrowLeft className="size-4" /> Volver al inicio
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}