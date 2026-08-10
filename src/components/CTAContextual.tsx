import { useSegment } from '../hooks/useSegment';
import { getAllSegments, type Segment } from '../data/segments';
import { trackCTAClick, trackSegmentSelected, trackWhatsAppClick } from '../utils/analytics';
import * as LucideIcons from 'lucide-react';

const IconComponents: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  ArrowRight: LucideIcons.ArrowRight,
  MessageCircle: LucideIcons.MessageCircle,
  Calendar: LucideIcons.Calendar,
  Smartphone: LucideIcons.Smartphone,
};

interface CTAContextualProps {
  variant?: 'hero' | 'funnel' | 'comparison' | 'final' | 'footer';
  className?: string;
  overrideSegment?: Segment;
}

export function CTAContextual({ variant = 'hero', className = '', overrideSegment }: CTAContextualProps) {
  const { segment, setSegment } = useSegment();
  const activeSegment = overrideSegment || segment;
  const segmentData = getAllSegments().find(s => s.id === activeSegment);
  const segments = getAllSegments();

  const getCTACopy = () => {
    switch (variant) {
      case 'hero':
        return {
          primary: `Ver demo para ${segmentData?.label || 'inmobiliarias'}`,
          secondary: 'Calcular mi ROI',
          whatsapp: 'Escríbenos por WhatsApp',
        };
      case 'funnel':
        return {
          primary: `Agendar demo ${segmentData?.label || ''}`,
          secondary: 'Ver cómo funciona en mi caso',
          whatsapp: 'Hablar por WhatsApp',
        };
      case 'comparison':
        return {
          primary: `Agendar demo para ${segmentData?.label || 'tu segmento'}`,
          secondary: 'Comparar con otro segmento',
          whatsapp: 'Hablar por WhatsApp',
        };
      case 'final':
        return {
          primary: `Empezar con ${segmentData?.label || 'AIMA'}`,
          secondary: 'Descargar checklist de calificación',
          whatsapp: 'Escríbenos por WhatsApp',
        };
      case 'footer':
        return {
          primary: 'Agendar demo gratis',
          secondary: 'Ver casos de éxito',
          whatsapp: 'WhatsApp',
        };
      default:
        return {
          primary: 'Agendar demo',
          secondary: 'Calcular ROI',
          whatsapp: 'WhatsApp',
        };
    }
  };

  const copy = getCTACopy();

  // Normalize variant → analytics source ("final" maps to "final_cta")
  const waSource: 'hero' | 'funnel' | 'comparison' | 'final_cta' | 'footer' =
    variant === 'final' ? 'final_cta' : variant;

  const handlePrimaryClick = () => {
    trackCTAClick(`primary_${variant}`, activeSegment, variant);
  };

  const handleSecondaryClick = () => {
    trackCTAClick(`secondary_${variant}`, activeSegment, variant);
  };

  const handleWhatsAppClick = () => {
    trackWhatsAppClick(activeSegment, waSource);
  };

  // Segment selector for non-final variants
  const showSegmentSelector = variant !== 'final' && variant !== 'footer';

  return (
    <div className={`cta-contextual ${className}`} data-variant={variant}>
      {showSegmentSelector && (
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Seleccionar segmento">
          <span className="text-xs text-white/40">Ver para:</span>
          {segments.map((seg) => (
            <button
              key={seg.id}
              onClick={() => {
                setSegment(seg.id);
                trackSegmentSelected(seg.id, 'cta');
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeSegment === seg.id
                  ? `bg-${seg.color.primary.replace('#', '')}/20 text-${seg.color.primary.replace('#', '')} border border-${seg.color.primary.replace('#', '')}/40`
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
              style={{
                backgroundColor: activeSegment === seg.id ? `${seg.color.primary}33` : 'rgba(255,255,255,0.05)',
                borderColor: activeSegment === seg.id ? `${seg.color.primary}66` : 'transparent',
                color: activeSegment === seg.id ? seg.color.primary : 'rgba(255,255,255,0.6)',
              }}
            >
              {seg.label.split(' ')[0]}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={handlePrimaryClick}
          className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-aima-purple px-6 py-4 text-base font-semibold text-white shadow-[0_12px_40px_rgba(123,63,228,0.35)] hover:bg-aima-purple-light transition-all focus:outline-none focus:ring-2 focus:ring-aima-purple/50 focus:ring-offset-2 focus:ring-offset-aima-950"
        >
          {copy.primary}
          <IconComponents.ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </button>

        <button
          onClick={handleSecondaryClick}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-base font-medium text-white hover:border-white/40 hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-aima-950"
        >
          <IconComponents.Calendar size={18} />
          {copy.secondary}
        </button>

        <a
          href="https://wa.me/573000000000"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsAppClick}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 hover:border-white/30 hover:bg-white/10 transition-colors"
        >
          <IconComponents.MessageCircle size={16} />
          {copy.whatsapp}
        </a>
      </div>

      <p className="mt-4 text-center text-sm text-white/40">
        {variant === 'final'
          ? 'Implementación en 2 semanas · Onboarding dedicado · Sin compromisos'
          : 'Respuesta en <24h · Sin spam · Solo info relevante'}
      </p>
    </div>
  );
}