import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as LucideIcons from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const IconComponents: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  MessageCircle: LucideIcons.MessageCircle,
  Bot: LucideIcons.Bot,
  Repeat: LucideIcons.Repeat,
  TrendingUp: LucideIcons.TrendingUp,
  Shield: LucideIcons.Shield,
  Zap: LucideIcons.Zap,
  Users: LucideIcons.Users,
  Target: LucideIcons.Target,
  BarChart: LucideIcons.BarChart,
  Smartphone: LucideIcons.Smartphone,
  Mail: LucideIcons.Mail,
  Crown: LucideIcons.Crown,
  Key: LucideIcons.Key,
  Building: LucideIcons.Building,
  Check: LucideIcons.Check,
};

interface Feature {
  id: string;
  icon: keyof typeof IconComponents;
  title: string;
  description: string;
  highlight?: string;
  category: 'core' | 'new';
}

const features: Feature[] = [
  // Core features (existing)
  {
    id: 'omnichannel',
    icon: 'MessageCircle',
    title: 'Captación omnicanal 24/7',
    description: 'WhatsApp, Instagram, Facebook Messenger y Webchat unificados. AIMA responde al instante, a cualquier hora, en el canal que prefiera tu cliente.',
    highlight: '100% leads capturados',
    category: 'core',
  },
  {
    id: 'precalificacion',
    icon: 'Bot',
    title: 'Precalificación inteligente',
    description: 'IA hace las preguntas clave (presupuesto, timeline, zona, motivación) y asigna score 0-100. Solo leads >70 llegan a tu equipo.',
    highlight: '>40% leads calificados',
    category: 'core',
  },
  {
    id: 'nutricion',
    icon: 'Repeat',
    title: 'Nurture automático adaptativo',
    description: 'Secuencias día 1, 3, 7, 14, 30... personalizadas según score y comportamiento. Reactiva leads fríos sin que tu equipo levante el dedo.',
    highlight: '35%+ reactivación',
    category: 'core',
  },
  {
    id: 'cierre',
    icon: 'TrendingUp',
    title: 'Handoff listo para cerrar',
    description: 'Tu asesor recibe: conversación completa, score, objeciones detectadas, property interest y next action sugerida. Cero tiempo en calificar.',
    highlight: '2-3 cierres extra/mes',
    category: 'core',
  },
  // NEW features (from proposals)
  {
    id: 'segmentacion',
    icon: 'Target',
    title: 'Segmentación Tradicional / Luxury / Admin',
    description: 'Tres motores IA distintos: volumen y velocidad (Tradicional), relación long-term y discreción (Luxury), rentabilidad y ocupación (Admin. Propiedades).',
    highlight: 'Lógica distinta por segmento',
    category: 'new',
  },
  {
    id: 'pipeline',
    icon: 'BarChart',
    title: 'Pipeline visible en tiempo real',
    description: 'Dashboard live: leads captados → calificados → en nurture → listos para cerrar. CAC por lead calificado 100% visible. Sin cajas negras.',
    highlight: 'CAC 100% trazable',
    category: 'new',
  },
  {
    id: 'integracion',
    icon: 'Shield',
    title: 'Integración nativa con tu CRM',
    description: 'Webhook/API a HubSpot, Pipedrive, Salesforce, Zoho, Bitrix, custom. Lead calificado entra a tu pipeline con ficha completa. También funciona standalone.',
    highlight: 'Setup en <2 semanas',
    category: 'new',
  },
  {
    id: 'analytics',
    icon: 'Users',
    title: 'RevOps analytics incluido',
    description: 'Métricas de coste por lead calificado, tiempo de ciclo, win rate por asesor, atribución de canal, forecast de cierre. Customer Success mensual.',
    highlight: 'Decisiones con datos',
    category: 'new',
  },
];

export function FeaturesBento() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".bento-cell", {
        y: 56,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".bento-grid", start: "top 82%", once: true },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="soluciones" className="relative scroll-mt-24 py-24 sm:py-28" ref={containerRef} data-reveal>
      <div className="hex-pattern pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-aima-purple/30 bg-aima-purple/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-aima-purple-light">
            Qué hace AIMA
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
            Tu embudo comercial
            <br className="hidden sm:block" />
            <span className="text-aima-gradient">completamente automatizado</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/60">
            Cuatro pilares core + cuatro capacidades nuevas que marcan la diferencia. Todo en una sola plataforma.
          </p>
        </div>

        <div className="bento-grid grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <article
              key={feature.id}
              className={`bento-cell group relative overflow-hidden ${feature.category === 'new' ? 'ring-1 ring-aima-purple/20' : ''}`}
            >
              {/* New badge */}
              {feature.category === 'new' && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-flex items-center gap-1 rounded-full bg-aima-purple/20 text-aima-purple-light text-[10px] font-medium uppercase tracking-[0.1em] px-2 py-0.5">
                    <span className="relative flex h-1.5 w-1.5 rounded-full bg-aima-purple animate-pulse" />
                    Nuevo
                  </span>
                </div>
              )}

              <div className="p-6 sm:p-7 h-full flex flex-col">
                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-aima-purple-light mb-5 group-hover:bg-aima-purple/10 transition-colors">
                  {(() => {
                    const Icon = IconComponents[feature.icon];
                    return <Icon size={26} strokeWidth={1.6} />;
                  })()}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold tracking-tight text-white mb-2">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-white/55 mb-4">{feature.description}</p>

                  {feature.highlight && (
                    <div className="flex items-center gap-1.5 text-xs font-medium text-aima-purple-light bg-aima-purple/10 px-2 py-1 rounded">
                      <LucideIcons.Check size={10} />
                      <span>{feature.highlight}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Glow accent on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-aima-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </article>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm text-white/50">
          <div className="flex items-center gap-2">
            <div className="flex h-3 w-3 rounded bg-aima-purple/20" />
            <span>Nuevas capacidades (v2.0)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-3 w-3 rounded bg-white/5" />
            <span>Pilares core</span>
          </div>
        </div>
      </div>
    </section>
  );
}