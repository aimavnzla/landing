import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as LucideIcons from "lucide-react";
import { HexLogo } from "./HexLogo";
import { CTAContextual } from "./CTAContextual";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const IconComponents: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  ArrowRight: LucideIcons.ArrowRight,
  MessageCircle: LucideIcons.MessageCircle,
  Smartphone: LucideIcons.Smartphone,
  Calendar: LucideIcons.Calendar,
  CheckCircle2: LucideIcons.CheckCircle2,
  Shield: LucideIcons.Shield,
  Clock: LucideIcons.Clock,
  Users: LucideIcons.Users,
};

export function FinalCTA() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".final-cta-glow", {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contacto" className="relative scroll-mt-24 py-24 sm:py-28" ref={containerRef} data-reveal>
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-aima-purple/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="hex-pattern relative overflow-hidden rounded-[2rem] border border-aima-purple/30 bg-gradient-to-br from-[#2a1650] via-aima-purple-dark to-[#1a0f30] px-6 py-20 text-center sm:px-12 final-cta-glow">
          <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[640px] -translate-x-1/2 rounded-full bg-aima-purple/30 blur-[100px]" />

          <div className="relative">
            <HexLogo size={52} className="mx-auto" />
            <h2 className="mx-auto mt-7 max-w-2xl text-3xl leading-tight font-semibold tracking-tight sm:text-5xl">
              ¿Listo para transformar tu inmobiliaria?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/70">
              Agenda una demo gratuita y mira cómo AIMA responde por ti desde el primer día. Sin riesgo, sin compromisos.
            </p>

            {/* Benefits row */}
            <div className="mt-10 grid gap-4 sm:grid-cols-3 text-center" data-reveal>
              <div className="flex items-center justify-center gap-2 text-sm text-white/70">
                <IconComponents.CheckCircle2 size={16} className="text-emerald-400" />
                <span>Implementación en 2 semanas</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-white/70">
                <IconComponents.Shield size={16} className="text-emerald-400" />
                <span>Onboarding dedicado incluido</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-white/70">
                <IconComponents.Clock size={16} className="text-emerald-400" />
                <span>Sin permanencia mínima</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-10" data-reveal>
              <CTAContextual variant="final" />
            </div>

            <p className="mt-6 text-sm text-white/50">
              Atención directa con nuestro equipo, en menos de 24 horas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}