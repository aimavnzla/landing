import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useKPICounter } from '../hooks/useKPICounter';
import type { KPI } from '../data/kpis';
import * as LucideIcons from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const IconComponents: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  TrendingUp: LucideIcons.TrendingUp,
  CheckCircle2: LucideIcons.CheckCircle2,
  Zap: LucideIcons.Zap,
  Clock: LucideIcons.Clock,
  Magnet: LucideIcons.Magnet,
  MoonStar: LucideIcons.MoonStar,
};

const colorClasses: Record<string, string> = {
  purple: 'text-aima-gradient',
  emerald: 'text-emerald-400',
  amber: 'text-amber-400',
  blue: 'text-blue-400',
  pink: 'text-pink-400',
};

interface KPICardProps {
  kpi: KPI;
  className?: string;
}

export function KPICard({ kpi, className = '' }: KPICardProps) {
  const IconComponent = IconComponents[kpi.icon || 'TrendingUp'];
  const colorClass = colorClasses[kpi.color || 'purple'];

  const { ref, displayValue } = useKPICounter(
    kpi.value,
    kpi.suffix,
    kpi.prefix,
    { duration: 1.6, ease: 'power2.out', decimals: kpi.id === 'ventas_extra' ? 1 : 0 }
  );

  return (
    <div
      className={`group relative double-bezel p-6 sm:p-8 transition-all duration-300 hover:border-aima-purple/30 hover:shadow-[0_20px_50px_rgba(123,63,228,0.15)] ${className}`}
      data-reveal
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 ${colorClass}`}>
          <IconComponent size={24} strokeWidth={1.8} />
        </div>
        {kpi.animate && (
          <div className="flex h-2 w-2 shrink-0 mt-1 rounded-full bg-aima-purple/50 animate-pulse" />
        )}
      </div>

      <div className="mb-2">
        <span ref={ref} className={`${colorClass} text-4xl sm:text-5xl font-bold tracking-tight`}>
          {displayValue}
        </span>
      </div>

      <h3 className="text-lg font-semibold tracking-tight text-white mb-2">
        {kpi.label}
      </h3>

      <p className="text-sm leading-relaxed text-white/55">
        {kpi.description}
      </p>
    </div>
  );
}