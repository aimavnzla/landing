import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as LucideIcons from 'lucide-react';
import { CTAContextual } from './CTAContextual';
import { useSegment } from '../hooks/useSegment';
import { trackCTAClick, trackWhatsAppClick } from '../utils/analytics';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const IconComponents: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  Zap: LucideIcons.Zap,
  CheckCircle2: LucideIcons.CheckCircle2,
  ArrowRight: LucideIcons.ArrowRight,
  MessageCircle: LucideIcons.MessageCircle,
  Calendar: LucideIcons.Calendar,
  Smartphone: LucideIcons.Smartphone,
  Building: LucideIcons.Building,
  Crown: LucideIcons.Crown,
  Key: LucideIcons.Key,
  Target: LucideIcons.Target,
  TrendingUp: LucideIcons.TrendingUp,
  MousePointer2: LucideIcons.MousePointer2,
};

interface HeroProps {
  className?: string;
}

export function Hero({ className = '' }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { segment, setSegment } = useSegment();
  const segments = [
    { id: 'tradicional' as const, label: 'Tradicional', icon: IconComponents.Building, color: '#8a5fd4' },
    { id: 'luxury' as const, label: 'Luxury', icon: IconComponents.Crown, color: '#d4a85f' },
    { id: 'admin' as const, label: 'Admin. Propiedades', icon: IconComponents.Key, color: '#4fd48a' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-eyebrow', { y: 24, opacity: 0, duration: 0.7 }, 0.1)
        .from('.hero-headline', { y: 40, opacity: 0, duration: 0.8 }, 0.22)
        .from('.hero-subtext', { y: 26, opacity: 0, duration: 0.7 }, 0.4)
        .from('.hero-cta', { y: 18, opacity: 0, duration: 0.6, stagger: 0.1 }, 0.55)
        .from('.hero-visual', { scale: 0.92, opacity: 0, duration: 1.0 }, 0.35)
        .from('.hero-chip', { y: 18, opacity: 0, duration: 0.5, stagger: 0.12 }, 0.85)
        .from('.hero-segment-picker', { y: 18, opacity: 0, duration: 0.5 }, 1.0);

      // Gentle floating bob on hero chips
      gsap.to('.chip-bob', {
        y: -9,
        duration: 2.6,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });

      // Floating particles in hero visual
      gsap.to('.hero-particle', {
        y: (i) => (i % 2 === 0 ? -30 : 30),
        x: (i) => (i % 3 === 0 ? 20 : i % 3 === 1 ? -20 : 0),
        rotation: 360,
        duration: (i) => 10 + i * 2,
        ease: 'none',
        repeat: -1,
        yoyo: true,
        stagger: 1.5,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handlePrimaryClick = () => {
    trackCTAClick('hero_primary', segment, 'hero');
  };

  const handleSecondaryClick = () => {
    trackCTAClick('hero_secondary', segment, 'hero');
  };

  const handleWhatsAppClick = () => {
    trackWhatsAppClick(segment, 'hero');
  };

  const handleSegmentChange = (newSegment: typeof segment) => {
    setSegment(newSegment);
  };

  return (
    <section
      ref={heroRef}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden bg-aima-950 text-white ${className}`}
      aria-labelledby="hero-headline"
    >
      {/* Background Aurora */}
      <div className="aurora pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* Hex Pattern */}
      <div className="hex-pattern pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      {/* Floating Particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="hero-particle absolute rounded-full bg-aima-purple/10 blur-sm"
            style={{
              width: `${6 + (i % 4) * 3}px`,
              height: `${6 + (i % 4) * 3}px`,
              top: `${5 + (i % 8) * 10}%`,
              left: `${3 + (i % 12) * 7}%`,
              animationDelay: `${i * 0.6}s`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-28">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-16 items-center">
          {/* Content Column */}
          <div className="relative z-10">
            {/* Eyebrow */}
            <p className="hero-eyebrow inline-flex items-center gap-2 rounded-full border border-aima-purple/30 bg-aima-purple/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-aima-purple-light">
              <IconComponents.Zap size={12} />
              Sistema Captación → Precalificación → Cierre
            </p>

            {/* Headline */}
            <h1
              id="hero-headline"
              className="hero-headline mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
            >
              Tus agentes pierden <span className="text-aima-gradient">70% del tiempo</span> en leads que nunca compran
            </h1>

            {/* Subtext */}
            <p className="hero-subtext mt-6 text-lg sm:text-xl leading-relaxed text-white/60 max-w-xl">
              AIMA captura, precalifica y nutre 24/7 → <span className="font-semibold text-white">2-3 ventas extra/mes</span> sin aumentar equipo ni ads.
            </p>

            {/* Segment Picker */}
            <div className="hero-segment-picker mt-8 flex flex-wrap items-center gap-2" role="group" aria-label="Seleccionar tipo de inmobiliaria">
              <span className="text-xs text-white/40 mr-2">Ver demo para:</span>
              {segments.map((seg) => (
                <button
                  key={seg.id}
                  onClick={() => handleSegmentChange(seg.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    segment === seg.id ? '' : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
                  style={{
                    backgroundColor: segment === seg.id ? `${seg.color}33` : 'rgba(255,255,255,0.05)',
                    borderColor: segment === seg.id ? `${seg.color}66` : 'transparent',
                    color: segment === seg.id ? seg.color : 'rgba(255,255,255,0.6)',
                  }}
                >
                  <seg.icon size={10} className="inline mr-1" />
                  {seg.label}
                </button>
              ))}
            </div>

            {/* CTAs */}
            <div className="hero-cta mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handlePrimaryClick}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-aima-purple px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_40px_rgba(123,63,228,0.35)] hover:bg-aima-purple-light transition-all focus:outline-none focus:ring-2 focus:ring-aima-purple/50 focus:ring-offset-2 focus:ring-offset-aima-950"
              >
                Ver demo interactiva
                <IconComponents.ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={handleSecondaryClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white hover:border-white/40 hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-aima-950"
              >
                <IconComponents.Calendar size={16} />
                Calcular mi ROI
              </button>
              <a
                href="https://wa.me/573000000000"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/80 hover:border-white/30 hover:bg-white/10 transition-colors"
              >
                <IconComponents.MessageCircle size={16} />
                WhatsApp
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-white/40">
              <div className="flex items-center gap-1.5">
                <IconComponents.CheckCircle2 size={14} className="text-emerald-400" />
                <span>Implementación en 2 semanas</span>
              </div>
              <div className="flex items-center gap-1.5">
                <IconComponents.CheckCircle2 size={14} className="text-emerald-400" />
                <span>Onboarding dedicado</span>
              </div>
              <div className="flex items-center gap-1.5">
                <IconComponents.CheckCircle2 size={14} className="text-emerald-400" />
                <span>Sin compromisos de permanencia</span>
              </div>
            </div>
          </div>

          {/* Visual Column */}
          <div className="relative hero-visual lg:order-first">
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Dashboard Mockup */}
              <div className="relative double-bezel rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 bg-white/5">
                  <div className="flex items-center gap-2">
                    <div className="flex h-3 w-3 rounded-full bg-red-500" />
                    <div className="flex h-3 w-3 rounded-full bg-amber-500" />
                    <div className="flex h-3 w-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs text-white/50 font-medium">Dashboard AIMA — Live</span>
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-aima-purple/20 text-aima-purple-light">
                    <IconComponents.Target size={12} />
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-4 space-y-4">
                  {/* Funnel Bar */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/50">EMBUDO EN VIVO</span>
                      <span className="text-aima-purple-light font-medium">Actualizado hace 3s</span>
                    </div>
                    <div className="space-y-2">
                      {[
                        { label: 'Captados hoy', value: '247', color: '#8a5fd4', progress: 100 },
                        { label: 'Calificados (score >70)', value: '112', color: '#7b3fe4', progress: 45 },
                        { label: 'En nurture activo', value: '68', color: '#d4a85f', progress: 27 },
                        { label: 'Listos para cerrar', value: '23', color: '#4fd48a', progress: 9 },
                      ].map((item, i) => (
                        <div key={i} className="group">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-white/70">{item.label}</span>
                            <span className="font-semibold text-white">{item.value}</span>
                          </div>
                          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-1000 ease-out"
                              style={{ width: `${item.progress}%`, backgroundColor: item.color }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Live Conversation Preview */}
                  <div className="border-t border-white/10 pt-4">
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="text-white/50">ÚLTIMA CONVERSACIÓN</span>
                      <span className="flex items-center gap-1 text-emerald-400">
                        <span className="relative flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Live</span>
                      </span>
                    </div>
                    <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                      {[
                        { from: 'lead', text: 'Hola, vi el apto en Chapinero. ¿Disponibilidad?', time: '10:23' },
                        { from: 'aima', text: '¡Hola! Tenemos 3 opciones. ¿Presupuesto y timeline?', time: '10:23' },
                        { from: 'lead', text: 'Inversión $250-280K, 2-3 sem', time: '10:25' },
                        { from: 'aima', text: 'Perfecto. Te envío fichas + proyección renta. ¿Jueves 10am?', time: '10:26' },
                        { from: 'lead', text: 'Jueves 10am perfecto ✅', time: '10:27' },
                      ].map((msg, i) => (
                        <div
                          key={i}
                          className={`flex ${msg.from === 'lead' ? 'justify-start' : 'justify-end'}`}
                        >
                          <div
                            className={`max-w-[70%] rounded-2xl px-3 py-2 text-xs ${
                              msg.from === 'lead'
                                ? 'rounded-tl-md bg-aima-700 text-white/85'
                                : 'rounded-tr-md bg-gradient-to-br from-aima-purple to-aima-purple-dark text-white'
                            }`}
                          >
                            <p className="leading-relaxed">{msg.text}</p>
                            <div className="flex items-center justify-end gap-1 mt-0.5 text-[10px] text-white/40">
                              <span>{msg.time}</span>
                              {msg.from === 'aima' && (
                                <>
                                  <IconComponents.CheckCircle2 size={8} className="text-aima-purple-light" />
                                  <IconComponents.CheckCircle2 size={8} className="text-aima-purple-light" />
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Metric Cards */}
              <div className="absolute -bottom-6 -left-4 lg:-left-6 hidden lg:block">
                <div className="chip-bob double-bezel p-3 shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                      <IconComponents.CheckCircle2 size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Lead capturado</p>
                      <p className="text-xs text-white/50">Registrado automáticamente</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-4 lg:-right-6 hidden lg:block">
                <div className="chip-bob double-bezel p-3 shadow-[0_15px_40px_rgba(0,0,0,0.5)]" style={{ animationDelay: '1.3s' }}>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-aima-purple/20 text-aima-purple-light">
                      <IconComponents.Zap size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Respuesta en 3s</p>
                      <p className="text-xs text-white/50">Incluso a las 3 a.m.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden lg:block">
                <div className="chip-bob double-bezel px-4 py-2 shadow-[0_15px_40px_rgba(0,0,0,0.5)]" style={{ animationDelay: '0.6s' }}>
                  <div className="flex items-center gap-2 text-center">
                    <IconComponents.TrendingUp size={16} className="text-amber-400" />
                    <span className="text-sm font-medium text-white">2.3 cierres</span>
                    <span className="text-xs text-white/50">extra este mes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <IconComponents.MousePointer2 size={24} className="text-white/30" />
      </div>
    </section>
  );
}