import { Fragment, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as LucideIcons from 'lucide-react';
import { channelSources, marketingFunnel, type FunnelTier } from '../data/captacion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type IconProps = { size?: number; strokeWidth?: number; className?: string; style?: React.CSSProperties };

const IconComponents: Record<string, React.ComponentType<IconProps>> = {
  Instagram: LucideIcons.Instagram,
  Facebook: LucideIcons.Facebook,
  Chrome: LucideIcons.Chrome,
  Globe: LucideIcons.Globe,
  MessageCircle: LucideIcons.MessageCircle,
  Share2: LucideIcons.Share2,
  Mail: LucideIcons.Mail,
  Search: LucideIcons.Search,
  Megaphone: LucideIcons.Megaphone,
  Heart: LucideIcons.Heart,
  Target: LucideIcons.Target,
  CheckCircle2: LucideIcons.CheckCircle2,
  XCircle: LucideIcons.XCircle,
  ShieldCheck: LucideIcons.ShieldCheck,
  Zap: LucideIcons.Zap,
  ArrowRight: LucideIcons.ArrowRight,
  ArrowDown: LucideIcons.ArrowDown,
};

interface LeadCaptureProps {
  className?: string;
}

function TierCard({ tier }: { tier: FunnelTier }) {
  const Icon = IconComponents[tier.icon] ?? LucideIcons.Target;

  return (
    <div className="double-bezel relative h-full overflow-hidden">
      {/* Accent bar on top */}
      <div className="absolute inset-x-0 top-0 h-0.5" style={{ background: `linear-gradient(90deg, ${tier.color}, transparent)` }} />
      <div className="p-5 sm:p-6">
        {/* Badge + icon */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-[0.14em]"
            style={{ color: tier.color, backgroundColor: `${tier.color}1a`, border: `1px solid ${tier.color}40` }}
          >
            {tier.label}
          </span>
          <Icon size={22} strokeWidth={1.8} style={{ color: tier.color }} />
        </div>

        <h3 className="text-lg font-semibold tracking-tight text-white mb-2">{tier.name}</h3>
        <p className="text-sm leading-relaxed text-white/55 mb-4">{tier.description}</p>

        {/* What the lead does in this stage */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {tier.examples.map((ex) => (
            <span key={ex} className="rounded-md border border-white/5 bg-white/5 px-2 py-1 text-[11px] text-white/60">
              {ex}
            </span>
          ))}
        </div>

        {/* Stat */}
        <div className="border-t border-white/10 pt-3">
          <div className="text-2xl font-bold tracking-tight" style={{ color: tier.color }}>
            {tier.stat.value}
          </div>
          <div className="text-xs text-white/50">{tier.stat.label}</div>
        </div>
      </div>
    </div>
  );
}

export function LeadCapture({ className = '' }: LeadCaptureProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Channels stagger in from the top
      gsap.from('.capture-channel', {
        y: 16,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 72%', once: true },
      });

      // Funnel tiers cascade down
      gsap.from('.capture-tier', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.capture-funnel', start: 'top 80%', once: true },
      });

      // Capture bar pops in
      gsap.from('.capture-bar', {
        scale: 0.96,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.capture-bar', start: 'top 88%', once: true },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="captacion"
      className={`relative scroll-mt-24 py-16 sm:py-20 ${className}`}
      data-reveal
    >
      {/* Background */}
      <div className="hex-pattern pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-aima-purple/30 bg-aima-purple/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-aima-purple-light">
            <IconComponents.Zap size={12} />
            Captación de leads
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
            Tu embudo de marketing ya trae los leads.
            <br className="hidden sm:block" />
            <span className="text-aima-gradient">AIMA los captura todos.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/60">
            TOFU → MOFU → BOFU. Cada canal de ads y redes es una puerta de entrada. AIMA se conecta a
            todas y el <span className="font-semibold text-white">100% de tus leads</span> entra al
            sistema para calificarse.
          </p>
        </div>

        {/* Channel sources */}
        <div className="mx-auto max-w-4xl mb-10">
          <p className="mb-5 text-center text-xs font-medium uppercase tracking-[0.16em] text-white/40">
            Todas tus fuentes, una sola bandeja
          </p>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
            {channelSources.map((ch) => (
              <div
                key={ch.label}
                className="capture-channel flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white/75 transition-colors hover:border-aima-purple/40 hover:bg-aima-purple/10"
              >
                {(() => {
                  const Icon = IconComponents[ch.icon];
                  return <Icon size={15} className="shrink-0 text-aima-purple-light" />;
                })()}
                <span className="truncate">{ch.label}</span>
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <IconComponents.ArrowDown size={20} className="animate-bounce text-aima-purple-light/60" />
          </div>
        </div>

        {/* Funnel tiers */}
        <div className="capture-funnel mx-auto max-w-5xl">
          {/* Desktop: horizontal narrowing tiers */}
          <div className="hidden items-stretch gap-3 lg:grid lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
            {marketingFunnel.map((tier, i) => (
              <Fragment key={tier.id}>
                <div className="capture-tier min-w-0">
                  <TierCard tier={tier} />
                </div>
                {i < marketingFunnel.length - 1 && (
                  <div className="capture-tier flex items-center justify-center self-center px-0.5 pt-6">
                    <IconComponents.ArrowRight size={22} className="text-aima-purple-light/50" />
                  </div>
                )}
              </Fragment>
            ))}
          </div>

          {/* Mobile: vertical funnel with narrowing widths */}
          <div className="flex flex-col items-center lg:hidden">
            {marketingFunnel.map((tier, i) => (
              <Fragment key={tier.id}>
                <div
                  className="capture-tier w-full"
                  style={{ maxWidth: i === 0 ? '100%' : i === 1 ? '92%' : '85%' }}
                >
                  <TierCard tier={tier} />
                </div>
                {i < marketingFunnel.length - 1 && (
                  <div className="capture-tier flex justify-center py-3">
                    <IconComponents.ArrowDown size={20} className="text-aima-purple-light/50" />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>

        {/* Capture point */}
        <div className="capture-bar mx-auto mt-10 max-w-4xl">
          <div className="double-bezel flex flex-col items-center gap-4 p-5 sm:flex-row sm:p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
              <IconComponents.ShieldCheck size={24} />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="font-semibold text-white">AIMA captura el 100% de esos leads</p>
              <p className="text-sm leading-relaxed text-white/55">
                Respuesta instantánea en todos los canales, antes de que el lead toque a tu asesor.
                Cero leads perdidos entre canal y sistema.
              </p>
            </div>
            <div className="text-center">
              <p className="text-aima-gradient text-3xl font-bold">100%</p>
              <p className="text-xs text-white/50">capturados</p>
            </div>
          </div>
        </div>

        {/* Contrast strip */}
        <div className="mx-auto mt-6 grid max-w-4xl gap-4 sm:grid-cols-2">
          <div className="double-bezel border-l-2 p-5" style={{ borderColor: '#ef4444' }}>
            <div className="mb-2 flex items-center gap-2">
              <IconComponents.XCircle size={16} className="text-red-400" />
              <p className="font-semibold text-white">Sin AIMA</p>
            </div>
            <p className="text-sm leading-relaxed text-white/55">
              El 70% de esos leads se enfría en 48h: nadie responde el WhatsApp a las 11pm, nadie hace
              follow-up al día 3. El dinero de tus ads se va con ellos.
            </p>
          </div>
          <div className="double-bezel border-l-2 p-5" style={{ borderColor: '#4fd48a' }}>
            <div className="mb-2 flex items-center gap-2">
              <IconComponents.CheckCircle2 size={16} className="text-emerald-400" />
              <p className="font-semibold text-white">Con AIMA</p>
            </div>
            <p className="text-sm leading-relaxed text-white/55">
              El 100% entra al sistema: se califica, se puntúa y se nutre hasta que esté listo para
              cerrar. Tu inversión en captación por fin rinde.
            </p>
          </div>
        </div>

        {/* Bridge CTA into the AIMA funnel */}
        <div className="mt-10 text-center">
          <a
            href="#embudo"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/85 transition-colors hover:border-aima-purple/50 hover:bg-aima-purple/10"
          >
            Ver cómo AIMA los califica
            <IconComponents.ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
