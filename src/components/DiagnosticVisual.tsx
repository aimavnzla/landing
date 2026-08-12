import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as LucideIcons from 'lucide-react';
import type { DiagnosticItem } from '../data/diagnostic';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const IconComponents: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  Filter: LucideIcons.Filter,
  Clock: LucideIcons.Clock,
  Repeat: LucideIcons.Repeat,
  Magnet: LucideIcons.Magnet,
};

const colorClasses: Record<string, { icon: string; border: string; glow: string }> = {
  purple: { icon: 'text-aima-purple-light', border: 'border-aima-purple/30', glow: 'bg-aima-purple/10' },
  red: { icon: 'text-red-400', border: 'border-red-500/30', glow: 'bg-red-500/10' },
  amber: { icon: 'text-amber-400', border: 'border-amber-500/30', glow: 'bg-amber-500/10' },
  blue: { icon: 'text-blue-400', border: 'border-blue-500/30', glow: 'bg-blue-500/10' },
};

interface DiagnosticVisualProps {
  items?: DiagnosticItem[];
}

export function DiagnosticVisual({ items = [] }: DiagnosticVisualProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.diagnostic-card', {
        y: 50,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 82%',
          once: true,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Import diagnostic data if not provided
  const diagnosticData = items.length > 0 ? items : [
    { id: 'sin_filtro', title: 'Sin filtro previo', stat: '70%', statLabel: 'del tiempo comercial se va en curiosos sin presupuesto real', description: 'Tus agentes atienden por igual a quien compra y a quien solo pregunta. No hay triage automático antes de que un humano invierta su tiempo.', icon: 'Filter', color: 'red' as const },
    { id: 'tiempo_mal_invertido', title: 'Tiempo mal invertido', stat: '2-8 sem', statLabel: 'de decisión promedio mientras el lead caliente se enfría', description: 'Mientras un agente conversa con un curioso, un comprador real con urgencia y presupuesto ya está firmando con la competencia.', icon: 'Clock', color: 'amber' as const },
    { id: 'seguimiento_inconsistente', title: 'Seguimiento inconsistente', stat: '0%', statLabel: 'follow-up nocturno y festivos. Tibios se enfrían en 48h', description: 'Nadie retoma el contacto a tiempo. Los leads que no cierran en la primera conversación se pierden en el limbo sin nurture sistemático.', icon: 'Repeat', color: 'blue' as const },
    { id: 'cero_visibilidad_costo', title: 'Cero visibilidad de costo', stat: '?', statLabel: 'No sabes cuánto cuesta realmente un lead listo para cerrar', description: 'Inviertes en ads, portales, referidos... pero no tienes trazabilidad completa desde clic hasta comisión. CAC por lead calificado = desconocido.', icon: 'Magnet', color: 'purple' as const },
  ];

  return (
    <section
      ref={containerRef}
      id="diagnostico"
      className="relative scroll-mt-24 section-cut py-16 sm:py-20"
      data-reveal
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-aima-purple/30 bg-aima-purple/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-aima-purple-light">
            El diagnóstico real
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
            El problema no es falta de leads
            <br className="hidden sm:block" />
            <span className="text-aima-gradient">es cómo los gestionas</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/60">
            Las inmobiliarias pierden ventas porque sus agentes dedican hasta el 70% del tiempo a leads que nunca comprarán.
            Mientras tanto, los compradores reales se enfrían o los cierra la competencia.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {diagnosticData.map((item) => {
            const IconComponent = IconComponents[item.icon];
            const colors = colorClasses[item.color];

            return (
              <article
                key={item.id}
                className={`diagnostic-card relative double-bezel p-6 sm:p-7 group ${colors.border} overflow-hidden`}
              >
                {/* Glow accent */}
                <div className={`absolute inset-0 ${colors.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                <div className="relative z-10">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.icon} bg-white/5 mb-5`}>
                    <IconComponent size={24} strokeWidth={1.8} />
                  </div>

                  <div className="mb-3">
                    <span className="text-aima-gradient text-3xl sm:text-4xl font-bold tracking-tight">
                      {item.stat}
                    </span>
                    <p className="mt-1 text-xs text-white/50">{item.statLabel}</p>
                  </div>

                  <h3 className="text-lg font-semibold tracking-tight text-white mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-white/55">
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-white/45">
          ¿Te suena familiar? AIMA resuelve los 4 puntos automáticamente.
        </p>
      </div>
    </section>
  );
}