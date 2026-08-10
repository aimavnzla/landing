import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as LucideIcons from 'lucide-react';
import { objections, type Objection } from '../data/objections';
import { trackObjectionExpanded } from '../utils/analytics';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const IconComponents: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  HelpCircle: LucideIcons.HelpCircle,
  ChevronDown: LucideIcons.ChevronDown,
  MessageCircle: LucideIcons.MessageCircle,
};

const categoryIcons: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  producto: LucideIcons.Box,
  implementacion: LucideIcons.Rocket,
  equipo: LucideIcons.Users,
  costos: LucideIcons.DollarSign,
  tecnico: LucideIcons.Cpu,
};

const categoryLabels: Record<string, string> = {
  producto: 'Producto',
  implementacion: 'Implementación',
  equipo: 'Equipo',
  costos: 'Costos',
  tecnico: 'Técnico',
};

interface ObjectionCardProps {
  objection: Objection;
}

export function ObjectionCard({ objection }: ObjectionCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const CategoryIcon = categoryIcons[objection.category] || LucideIcons.HelpCircle;

  useEffect(() => {
    if (isOpen && contentRef.current) {
      gsap.fromTo(contentRef.current,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
    } else if (!isOpen && contentRef.current) {
      gsap.to(contentRef.current, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' });
    }
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      trackObjectionExpanded(objection.id);
    }
  };

  return (
    <article className="objection-card double-bezel overflow-hidden">
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left focus:outline-none focus:ring-2 focus:ring-aima-purple/50 focus:ring-offset-2 focus:ring-offset-aima-950"
        aria-expanded={isOpen}
        aria-controls={`objection-content-${objection.id}`}
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-aima-purple/15 text-aima-purple-light">
            <CategoryIcon size={20} strokeWidth={1.8} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium uppercase tracking-[0.1em] text-white/40 px-2 py-0.5 rounded bg-white/5">
                {categoryLabels[objection.category]}
              </span>
            </div>
            <h3 className="text-lg font-semibold tracking-tight text-white pr-8">
              {objection.question}
            </h3>
          </div>
        </div>
        <div className="flex shrink-0 items-center justify-center">
          <IconComponents.ChevronDown
            size={20}
            className={`text-white/50 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </div>
      </button>

      <div
        ref={contentRef}
        id={`objection-content-${objection.id}`}
        role="region"
        aria-labelledby={`objection-${objection.id}`}
        className="overflow-hidden"
        style={{ height: isOpen ? 'auto' : 0 }}
      >
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 border-t border-white/10">
          <div className="prose prose-invert max-w-none text-white/70 text-sm leading-relaxed">
            {objection.answer.split('\n').map((paragraph, i) => (
              <p key={i} className="mb-3 last:mb-0">{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

interface ObjectionsSectionProps {
  className?: string;
}

export function ObjectionsSection({ className = '' }: ObjectionsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.objection-card', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="objeciones"
      className={`relative scroll-mt-24 py-24 sm:py-28 ${className}`}
      data-reveal
    >
      <div className="hex-pattern pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-aima-purple/30 bg-aima-purple/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-aima-purple-light">
            Preguntas frecuentes
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
            Lo que suelen preguntar
            <br className="hidden sm:block" />
            <span className="text-aima-gradient">antes de empezar</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/60">
            Respuestas directas, sin letra pequeña. Si tienes otra duda, escríbenos por WhatsApp.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {objections.map((objection) => (
            <ObjectionCard key={objection.id} objection={objection} />
          ))}
        </div>

        <div className="mt-12 text-center" data-reveal>
          <p className="text-white/60 mb-4">¿No encontraste tu respuesta?</p>
          <a
            href="https://wa.me/573000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-base font-medium text-white hover:border-white/40 hover:bg-white/10 transition-colors"
          >
            <IconComponents.MessageCircle size={18} />
            Preguntar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}