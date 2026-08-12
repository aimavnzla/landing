import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as LucideIcons from 'lucide-react';
import { funnelStages, funnelFlow } from '../data/funnel';
import { useFunnelAnimation } from '../hooks/useFunnelAnimation';
import { trackFunnelStepView } from '../utils/analytics';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const IconComponents: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  MessageCircle: LucideIcons.MessageCircle,
  Bot: LucideIcons.Bot,
  Repeat: LucideIcons.Repeat,
  TrendingUp: LucideIcons.TrendingUp,
  ArrowRight: LucideIcons.ArrowRight,
  User: LucideIcons.User,
};

interface FunnelVisualProps {
  className?: string;
}

export function FunnelVisual({ className = '' }: FunnelVisualProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useFunnelAnimation(containerRef);

  useEffect(() => {
    // Track funnel step views
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepId = entry.target.getAttribute('data-step-id');
            if (stepId) trackFunnelStepView(stepId);
          }
        });
      },
      { threshold: 0.5 }
    );

    const steps = containerRef.current?.querySelectorAll('[data-step-id]');
    steps?.forEach((step) => observer.observe(step));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      id="embudo"
      className={`relative scroll-mt-24 section-cut py-16 sm:py-20 ${className}`}
      data-reveal
    >
      {/* Background pattern */}
      <div className="hex-pattern pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-aima-purple/30 bg-aima-purple/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-aima-purple-light">
            El sistema completo
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
            Captar → Calificar → Nutrir → Cerrar
            <br className="hidden sm:block" />
            <span className="text-aima-gradient">en piloto automático</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/60">
            AIMA opera tu embudo comercial 24/7. Tu equipo solo recibe leads calientes listos para cerrar.
          </p>
        </div>

        {/* Funnel Visualization */}
        <div className="relative">
          {/* Desktop: Horizontal funnel */}
          <div className="hidden lg:block relative z-10">
            {/* KPI cards row — uniform width & aligned */}
            <div className="grid grid-cols-4 gap-5">
              {funnelStages.map((stage) => (
                <div key={`${stage.id}-kpi`} className="funnel-kpi">
                  <div className="double-bezel h-full p-5 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2.5">
                      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-aima-purple-light whitespace-nowrap">
                        {stage.label}
                      </span>
                      <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-aima-purple/50 animate-pulse" />
                    </div>
                    <div className="text-aima-gradient text-3xl sm:text-4xl font-bold tracking-tight leading-none">
                      {stage.kpi.value}
                    </div>
                    <p className="mt-1.5 text-sm font-medium text-white/75">{stage.kpi.label}</p>
                    <p className="mt-1 text-xs leading-snug text-white/50">{stage.kpi.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Steps row */}
            <div className="mt-10 flex items-start justify-between gap-4">
              {funnelStages.map((stage, index) => (
                <div
                  key={stage.id}
                  className="relative flex flex-col items-center funnel-step flex-1"
                  data-step-id={stage.id}
                >
                  {/* Step Circle */}
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] mb-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <div className="absolute inset-0 rounded-full border border-aima-purple/20 bg-aima-purple/5" />
                    {(() => {
                      const Icon = IconComponents[stage.icon];
                      return <Icon size={32} strokeWidth={1.6} className="text-aima-purple-light relative z-10" />;
                    })()}
                    <span className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-aima-purple text-sm font-bold text-white">
                      {index + 1}
                    </span>
                  </div>

                  {/* Step Content */}
                  <div className="w-full text-center">
                    <h3 className="text-lg font-semibold tracking-tight text-white mb-2">
                      {stage.label}
                    </h3>
                    <p className="text-sm text-white/55 mb-4">{stage.description}</p>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-center gap-2 text-white/60 bg-white/5 rounded-lg px-3 py-2">
                        <IconComponents.Bot size={14} className="shrink-0 text-aima-purple-light" />
                        <span>IA: {stage.aiAction}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-white/60 bg-white/5 rounded-lg px-3 py-2">
                        <IconComponents.User size={14} className="shrink-0 text-emerald-400" />
                        <span>Equipo: {stage.teamAction}</span>
                      </div>
                    </div>
                  </div>

                  {/* Connector to next step (aligned with circle center) */}
                  {index < funnelStages.length - 1 && (
                    <div className="funnel-connector absolute top-12 right-[-50%] w-full h-px bg-gradient-to-r from-transparent via-aima-purple/40 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: Vertical funnel */}
          <div className="lg:hidden space-y-8">
            {funnelStages.map((stage, index) => (
              <div
                key={stage.id}
                className="funnel-step relative"
                data-step-id={stage.id}
              >
                <div className="flex items-start gap-4">
                  {/* Step indicator */}
                  <div className="relative flex-shrink-0 flex items-center justify-center">
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
                      <div className="absolute inset-0 rounded-full border border-aima-purple/20 bg-aima-purple/5" />
                      {(() => {
                      const Icon = IconComponents[stage.icon];
                      return <Icon size={28} strokeWidth={1.6} className="text-aima-purple-light relative z-10" />;
                    })()}
                      <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-aima-purple text-xs font-bold text-white">
                        {index + 1}
                      </span>
                    </div>
                    {/* Vertical connector */}
                    {index < funnelStages.length - 1 && (
                      <div className="absolute top-full left-7 bottom-0 w-px bg-gradient-to-b from-aima-purple/40 to-transparent" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold tracking-tight text-white">{stage.label}</h3>
                        <span className="text-xs font-medium uppercase tracking-[0.1em] text-aima-purple-light bg-aima-purple/10 px-2 py-1 rounded">
                          KPI: {stage.kpi.value} {stage.kpi.label}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-white/55 mb-4">{stage.description}</p>

                    <div className="grid gap-2 sm:grid-cols-2">
                      <div className="flex items-center gap-2 text-xs text-white/60 bg-white/5 rounded-lg px-3 py-2">
                        <IconComponents.Bot size={14} className="text-aima-purple-light shrink-0" />
                        <span className="truncate">IA: {stage.aiAction}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white/60 bg-white/5 rounded-lg px-3 py-2">
                        <IconComponents.User size={14} className="text-emerald-400 shrink-0" />
                        <span className="truncate">Equipo: {stage.teamAction}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary bar */}
        <div className="mt-10 relative" data-reveal>
          <div className="double-bezel p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="text-center sm:border-r sm:border-white/10 sm:pr-6">
                <p className="text-aima-gradient text-3xl sm:text-4xl font-bold">100%</p>
                <p className="text-sm text-white/55">leads capturados</p>
              </div>
              <div className="text-center sm:border-r sm:border-white/10 sm:px-6">
                <p className="text-aima-gradient text-3xl sm:text-4xl font-bold">{'>'}40%</p>
                <p className="text-sm text-white/55">leads calificados</p>
              </div>
              <div className="text-center sm:pl-6">
                <p className="text-aima-gradient text-3xl sm:text-4xl font-bold">2-3</p>
                <p className="text-sm text-white/55">cierres extra/mes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="funnel-particle absolute rounded-full bg-aima-purple/10 blur-sm"
            style={{
              width: `${8 + (i % 3) * 4}px`,
              height: `${8 + (i % 3) * 4}px`,
              top: `${10 + (i % 5) * 15}%`,
              left: `${5 + (i % 7) * 12}%`,
              animationDelay: `${i * 0.7}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
}