import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as LucideIcons from 'lucide-react';
import { getAllSegments, type SegmentData } from '../data/segments';
import { useSegment } from '../hooks/useSegment';
import { trackSegmentSelected, trackWhatsAppClick } from '../utils/analytics';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type IconProps = { size?: number; strokeWidth?: number; className?: string; style?: React.CSSProperties };

const IconComponents: Record<string, React.ComponentType<IconProps>> = {
  Building: LucideIcons.Building,
  Crown: LucideIcons.Crown,
  Key: LucideIcons.Key,
  CheckCircle2: LucideIcons.CheckCircle2,
  XCircle: LucideIcons.XCircle,
  ArrowRight: LucideIcons.ArrowRight,
  DollarSign: LucideIcons.DollarSign,
  Clock: LucideIcons.Clock,
  Users: LucideIcons.Users,
  TrendingUp: LucideIcons.TrendingUp,
  MessageCircle: LucideIcons.MessageCircle,
  Mail: LucideIcons.Mail,
  Phone: LucideIcons.Phone,
  Shield: LucideIcons.Shield,
  Target: LucideIcons.Target,
  Bot: LucideIcons.Bot,
};

interface SegmentComparisonProps {
  className?: string;
}

export function SegmentComparison({ className = '' }: SegmentComparisonProps) {
  const { segment, setSegment } = useSegment();
  const containerRef = useRef<HTMLDivElement>(null);
  const segments = getAllSegments();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.segment-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      gsap.from('.comparison-row', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: '.comparison-table',
          start: 'top 85%',
          once: true,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSegmentSelect = (seg: SegmentData) => {
    setSegment(seg.id);
    trackSegmentSelected(seg.id, 'comparison');
  };

  const comparisonRows = [
    { key: 'ticket', label: 'Ticket promedio', icon: 'DollarSign', getValue: (s: SegmentData) => s.ticket },
    { key: 'decisionTime', label: 'Tiempo de decisión', icon: 'Clock', getValue: (s: SegmentData) => s.decisionTime },
    { key: 'volume', label: 'Volumen leads/mes', icon: 'Users', getValue: (s: SegmentData) => s.volume },
    { key: 'kpi', label: 'KPI principal', icon: 'TrendingUp', getValue: (s: SegmentData) => s.kpi },
    { key: 'channels', label: 'Canales principales', icon: 'MessageCircle', getValue: (s: SegmentData) => s.channels.join(', ') },
    { key: 'objections', label: 'Objeciones típicas', icon: 'Shield', getValue: (s: SegmentData) => s.objections.slice(0, 2).join(' · ') },
    { key: 'roi', label: 'ROI esperado', icon: 'Target', getValue: (s: SegmentData) => s.roi },
  ];

  return (
    <section
      ref={containerRef}
      id="segmentos"
      className={`relative scroll-mt-24 section-cut py-16 sm:py-20 ${className}`}
      data-reveal
    >
      <div className="hex-pattern pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-aima-purple/30 bg-aima-purple/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-aima-purple-light">
            ¿Qué inmobiliaria eres?
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
            AIMA se adapta a tu
            <br className="hidden sm:block" />
            <span className="text-aima-gradient">modelo de negocio</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/60">
            No es lo mismo vender 5 apartamentos de $200K que una casa de $2M. Elige tu segmento y ve cómo cambia la estrategia.
          </p>
        </div>

        {/* Segment Cards */}
        <div className="grid gap-5 md:grid-cols-3 mb-10">
          {segments.map((seg, index) => (
            <article
              key={seg.id}
              className={`relative segment-card double-bezel overflow-hidden group ${
                segment === seg.id
                  ? 'ring-2 ring-aima-purple/50 shadow-[0_20px_50px_rgba(123,63,228,0.2)]'
                  : ''
              }`}
              style={{
                borderColor: segment === seg.id ? seg.color.primary : 'rgba(255,255,255,0.08)',
                background: segment === seg.id
                  ? `linear-gradient(180deg, rgba(30,30,30,0.95) 0%, rgba(18,18,18,0.95) 100%)`
                  : undefined,
              }}
              onClick={() => handleSegmentSelect(seg)}
            >
              {/* Glow accent */}
              <div
                className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${seg.color.primary}, transparent)` }}
              />

              <div className="p-6 sm:p-7 relative z-10">
                {/* Icon & Label */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${seg.color.primary}22` }}
                    >
                      {(() => {
                        const Icon = IconComponents[seg.icon];
                        return <Icon size={24} strokeWidth={1.8} style={{ color: seg.color.primary }} />;
                      })()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{seg.label}</h3>
                      <p className="text-xs text-white/50">{seg.tagline}</p>
                    </div>
                  </div>
                  {segment === seg.id && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full" style={{ backgroundColor: seg.color.primary }}>
                      {(() => {
                        const Icon = IconComponents.CheckCircle2;
                        return <Icon size={14} className="text-white" />;
                      })()}
                    </div>
                  )}
                </div>

                {/* Key Metrics */}
                <div className="space-y-3 mb-5">
                  <MetricRow label="Ticket" value={seg.ticket} icon={IconComponents.DollarSign} />
                  <MetricRow label="Decisión" value={seg.decisionTime} icon={IconComponents.Clock} />
                  <MetricRow label="Volumen" value={seg.volume} icon={IconComponents.Users} />
                </div>

                {/* KPI Highlight */}
                <div className="rounded-xl p-4 mb-5 text-center" style={{ backgroundColor: `${seg.color.primary}15`, border: `1px solid ${seg.color.primary}30` }}>
                  <p className="text-xs font-medium uppercase tracking-[0.1em] text-white/50 mb-1">KPI Principal</p>
                  <p className="font-semibold text-white" style={{ color: seg.color.primary }}>{seg.kpi}</p>
                </div>

                {/* CTA */}
                <button
                  onClick={(e) => { e.stopPropagation(); handleSegmentSelect(seg); }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all"
                  style={{
                    backgroundColor: segment === seg.id ? seg.color.primary : `${seg.color.primary}22`,
                    border: `1px solid ${segment === seg.id ? seg.color.primary : `${seg.color.primary}40`}`,
                    color: segment === seg.id ? '#fff' : seg.color.primary,
                  }}
                >
                  <span>{segment === seg.id ? 'Segmento seleccionado' : 'Seleccionar este segmento'}</span>
                  <IconComponents.ArrowRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="comparison-table double-bezel overflow-hidden" data-reveal>
          <div className="overflow-x-auto p-2 sm:p-3">
            <table className="w-full" role="table">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-5 sm:px-7 py-4 sm:py-5 font-medium text-white/60 uppercase tracking-[0.1em] text-xs">Criterio</th>
                  {segments.map((seg) => (
                    <th
                      key={seg.id}
                      className="text-center px-5 sm:px-7 py-4 sm:py-5 font-medium text-white"
                      style={{ color: seg.color.primary }}
                    >
                      <div className="flex items-center justify-center gap-2">
                        {(() => {
                          const Icon = IconComponents[seg.icon];
                          return <Icon size={18} strokeWidth={2} />;
                        })()}
                        <span>{seg.label}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, rowIndex) => (
                  <tr
                    key={row.key}
                    className={`comparison-row border-b border-white/5 ${rowIndex % 2 === 0 ? 'bg-white/5' : ''}`}
                  >
                    <td className="px-5 sm:px-7 py-4 sm:py-5">
                      <div className="flex items-center gap-3 text-sm">
                        {(() => {
                        const Icon = IconComponents[row.icon];
                        return <Icon size={16} className="text-white/40 shrink-0" />;
                      })()}
                        <span className="font-medium text-white">{row.label}</span>
                      </div>
                    </td>
                    {segments.map((seg) => (
                      <td key={seg.id} className="px-5 sm:px-7 py-4 sm:py-5 text-center">
                        <p className="text-sm text-white/80">{row.getValue(seg)}</p>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Segment Detail */}
        {segment && (
          <div className="mt-10 double-bezel p-6 sm:p-8" data-reveal>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <DetailCard
                title="Canales"
                icon={IconComponents.MessageCircle}
                items={getAllSegments().find(s => s.id === segment)?.channels || []}
                color={getAllSegments().find(s => s.id === segment)?.color.primary || '#8a5fd4'}
              />
              <DetailCard
                title="Objeciones clave"
                icon={IconComponents.Shield}
                items={getAllSegments().find(s => s.id === segment)?.objections || []}
                color={getAllSegments().find(s => s.id === segment)?.color.primary || '#8a5fd4'}
              />
              <DetailCard
                title="ROI esperado"
                icon={IconComponents.TrendingUp}
                items={[getAllSegments().find(s => s.id === segment)?.roi || '']}
                color={getAllSegments().find(s => s.id === segment)?.color.primary || '#8a5fd4'}
              />
              <DetailCard
                title="Agente IA"
                icon={IconComponents.Bot}
                items={[getAllSegments().find(s => s.id === segment)?.agentPersona || '']}
                color={getAllSegments().find(s => s.id === segment)?.color.primary || '#8a5fd4'}
              />
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#contacto"
                onClick={() => trackSegmentSelected(segment, 'comparison_cta')}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-aima-purple px-6 py-4 text-base font-semibold text-white hover:bg-aima-purple-light transition-colors"
              >
                Agendar demo para {getAllSegments().find(s => s.id === segment)?.label}
                {(() => {
                  const Icon = IconComponents.ArrowRight;
                  return <Icon size={18} className="transition-transform group-hover:translate-x-1" />;
                })()}
              </a>
              <a
                href="https://wa.me/573000000000"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(segment, 'comparison')}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-base font-medium text-white hover:border-white/40 hover:bg-white/10 transition-colors"
              >
                {(() => {
                  const Icon = IconComponents.MessageCircle;
                  return <Icon size={18} />;
                })()}
                Hablar por WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function MetricRow({ label, value, icon: IconComponent }: { label: string; value: string; icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }> }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <IconComponent size={16} className="text-white/40 shrink-0" />
      <div>
        <p className="text-[11px] text-white/40">{label}</p>
        <p className="font-medium text-white truncate">{value}</p>
      </div>
    </div>
  );
}

function DetailCard({ title, icon: IconComponent, items, color }: { title: string; icon: React.ComponentType<IconProps>; items: string[]; color: string }) {
  return (
    <div className="rounded-xl p-5" style={{ backgroundColor: `${color}10`, border: `1px solid ${color}30` }}>
      <div className="flex items-center gap-2 mb-3">
        <IconComponent size={18} strokeWidth={2} style={{ color }} />
        <h4 className="font-medium text-white">{title}</h4>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-white/70">
            {(() => {
              const Icon = IconComponents.CheckCircle2;
              return <Icon size={14} className="shrink-0 mt-0.5" style={{ color }} />;
            })()}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}