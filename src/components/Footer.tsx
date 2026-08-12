import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { HexLogo } from "./HexLogo";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const footerLinks = {
  producto: [
    { label: "Captación omnicanal", href: "#embudo" },
    { label: "Precalificación IA", href: "#embudo" },
    { label: "Follow-up automático", href: "#embudo" },
    { label: "Handoff inteligente", href: "#embudo" },
    { label: "Dashboard en vivo", href: "#agente-demo" },
  ],
  empresa: [
    { label: "Nosotros", href: "#" },
    { label: "Casos de éxito", href: "#" },
    { label: "Blog RevOps", href: "#" },
    { label: "Calculadora ROI", href: "#" },
    { label: "Carreras", href: "#" },
  ],
  recursos: [
    { label: "Documentación API", href: "#" },
    { label: "Centro de ayuda", href: "#" },
    { label: "Comunidad", href: "#" },
    { label: "Webinars", href: "#" },
    { label: "Changelog", href: "#" },
  ],
};

export function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-col", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          once: true,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={containerRef} className="border-t border-white/10 bg-aima-950/50">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 lg:py-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-6">
          {/* Brand Column */}
          <div className="footer-col lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2.5">
              <HexLogo size={28} />
              <div>
                <p className="text-sm font-semibold tracking-wide">AIMA</p>
                <p className="text-xs text-white/45">Transformación Operativa Inteligente</p>
              </div>
            </div>
            <p className="text-sm text-white/50 max-w-xs leading-relaxed">
              CRM omnicanal con IA para inmobiliarias. Capturamos, calificamos y nutrimos leads 24/7.
              Tu equipo solo cierra.
            </p>
          </div>

          {/* Product Column */}
          <nav className="footer-col" aria-label="Producto">
            <h4 className="font-semibold text-white mb-4">Producto</h4>
            <ul className="space-y-3">
              {footerLinks.producto.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company Column */}
          <nav className="footer-col" aria-label="Empresa">
            <h4 className="font-semibold text-white mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources Column */}
          <nav className="footer-col lg:col-span-2" aria-label="Recursos">
            <h4 className="font-semibold text-white mb-4">Recursos</h4>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {footerLinks.recursos.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/35">
              © {new Date().getFullYear()} AIMA. Todos los derechos reservados.
            </p>

            <div className="flex flex-col items-center gap-4 text-xs text-white/40 sm:flex-row sm:gap-6">
              <span>Hecho con IA para inmobiliarias que quieren escalar</span>
              <a
                href="#contacto"
                className="group inline-flex items-center gap-2 rounded-xl bg-aima-purple px-4 py-2.5 text-sm font-semibold text-white hover:bg-aima-purple-light transition-colors"
              >
                Agendar demo gratis
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}