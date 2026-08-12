import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as LucideIcons from "lucide-react";
import { CTAContextual } from "./CTAContextual";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const IconComponents: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  MessageCircle: LucideIcons.MessageCircle,
  Bot: LucideIcons.Bot,
  Repeat: LucideIcons.Repeat,
  TrendingUp: LucideIcons.TrendingUp,
  User: LucideIcons.User,
};

interface Step {
  icon: keyof typeof IconComponents;
  title: string;
  aiAction: string;
  teamAction: string;
  kpi: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: "MessageCircle",
    title: "Conecta tus canales",
    aiAction: "Omnichannel WA/IG/FB/Webchat activo 24/7",
    teamAction: "Cero configuración técnica — lo hacemos nosotros",
    kpi: "100% leads capturados",
    description: "Vincula WhatsApp Business, Instagram y Facebook en minutos. Sin instalaciones complejas ni cambios en tu forma de trabajar.",
  },
  {
    icon: "Bot",
    title: "AIMA califica y responde",
    aiAction: "Pregunta presupuesto, timeline, zona, motivación → Score 0-100",
    teamAction: "Recibe lead con ficha completa y next action",
    kpi: ">40% leads calificados",
    description: "Cada mensaje recibe respuesta al instante, a cualquier hora. El lead queda registrado con toda su información y score de intención.",
  },
  {
    icon: "Repeat",
    title: "Follow-up automático inteligente",
    aiAction: "Secuencias adaptativas día 1, 3, 7, 14, 30... según comportamiento",
    teamAction: "Notificación solo cuando lead está listo para cerrar",
    kpi: "35%+ reactivación de fríos",
    description: "AIMA reaviva conversaciones frías en el momento justo y le avisa a tu equipo cuándo un lead está listo para comprar. Ningún cliente se enfría.",
  },
  {
    icon: "TrendingUp",
    title: "Tu equipo cierra",
    aiAction: "Handoff con resumen ejecutivo: score, objeciones, property interest, next action",
    teamAction: "100% foco en cerrar, no en calificar",
    kpi: "2-3 cierres extra/mes",
    description: "Tu asesor recibe el lead caliente, con la conversación completa, y se enfoca en vender. No en responder lo mismo una y otra vez.",
  },
];

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Connector line animation
      gsap.from(".how-connector", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".how-steps",
          start: "top 80%",
          once: true,
        },
      });

      // Step cards stagger
      gsap.from(".how-step", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".how-steps",
          start: "top 80%",
          once: true,
        },
      });

      // Circle number pulse
      gsap.to(".how-step-number", {
        scale: 1.1,
        duration: 1.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="como-funciona" className="relative scroll-mt-24 section-cut py-16 sm:py-20" ref={containerRef} data-reveal>
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-aima-purple/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div data-reveal className="mx-auto max-w-2xl text-center mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-aima-purple/30 bg-aima-purple/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-aima-purple-light">
            Sin complicaciones
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
            Empieza a vender más
            <br className="hidden sm:block" />
            en cuatro pasos
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/60">
            AIMA automatiza el embudo completo. Tu equipo solo entra en el último paso: cerrar.
          </p>
        </div>

        <div className="relative how-steps">
          {/* Connector line */}
          <div className="absolute top-16 right-[16%] left-[16%] hidden h-px bg-gradient-to-r from-transparent via-aima-purple/40 to-transparent lg:block how-connector" />

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((s, i) => (
              <article key={s.title} className="how-step group relative text-center">
                <div className="relative mx-auto flex h-32 w-32 items-center justify-center">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 rounded-2xl border border-aima-purple/20 bg-aima-purple/5 transition-all duration-300 group-hover:border-aima-purple/50 group-hover:bg-aima-purple/10" />
                  {/* Inner border */}
                  <div className="absolute inset-[3px] rounded-[0.9rem] border border-white/10" />
                  {/* Icon */}
                  {(() => {
                    const Icon = IconComponents[s.icon];
                    return <Icon size={34} strokeWidth={1.6} className="text-aima-purple-light relative z-10" />;
                  })()}
                  {/* Step number */}
                  <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-aima-purple text-sm font-bold text-white how-step-number">
                    {i + 1}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-semibold tracking-tight text-white">{s.title}</h3>
                <p className="mx-auto mt-3 max-w-xs text-[15px] leading-relaxed text-white/55">{s.description}</p>

                <div className="mt-5 space-y-3 text-sm">
                  <div className="flex items-center justify-center gap-2 rounded-lg bg-white/5 px-3 py-2">
                    <LucideIcons.Bot size={14} className="text-aima-purple-light shrink-0" />
                    <span className="text-white/70"><strong>IA:</strong> {s.aiAction}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 rounded-lg bg-white/5 px-3 py-2">
                    <LucideIcons.User size={14} className="text-emerald-400 shrink-0" />
                    <span className="text-white/70"><strong>Equipo:</strong> {s.teamAction}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 rounded-lg bg-aima-purple/10 border border-aima-purple/20 px-3 py-2">
                    <LucideIcons.TrendingUp size={14} className="text-aima-purple-light shrink-0" />
                    <span className="font-medium text-aima-purple-light"><strong>KPI:</strong> {s.kpi}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div data-reveal className="mt-12">
          <CTAContextual variant="comparison" />
        </div>
      </div>
    </section>
  );
}