import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as LucideIcons from "lucide-react";
import {
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useSegment } from "../hooks/useSegment";
import { getAllSegments, type SegmentData } from "../data/segments";

const NavIconComponents: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  Building: LucideIcons.Building,
  Crown: LucideIcons.Crown,
  Key: LucideIcons.Key,
  Menu: LucideIcons.Menu,
  X: LucideIcons.X,
  ChevronDown: LucideIcons.ChevronDown,
};

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { segment, setSegment } = useSegment();
  const segments = getAllSegments();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSegmentChange = (newSegment: typeof segment) => {
    setSegment(newSegment);
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-aima-950/90 backdrop-blur-md border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.3)]"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5" aria-label="AIMA - Inicio">
            <img
              src={`${import.meta.env.BASE_URL}aima-logo-icon.png`}
              alt="AIMA"
              width="32"
              height="32"
              className="h-8 w-8 object-contain"
              loading="eager"
            />
            <span className="text-sm font-semibold tracking-wide hidden sm:block">AIMA</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="#diagnostico" className="text-sm text-white/70 hover:text-white transition-colors">
              Diagnóstico
            </a>
            <a href="#embudo" className="text-sm text-white/70 hover:text-white transition-colors">
              El Embudo
            </a>
            <a href="#agente-demo" className="text-sm text-white/70 hover:text-white transition-colors">
              Demo IA
            </a>
            <a href="#segmentos" className="text-sm text-white/70 hover:text-white transition-colors">
              Segmentos
            </a>
            <a href="#resultados" className="text-sm text-white/70 hover:text-white transition-colors">
              Resultados
            </a>
            <a href="#objeciones" className="text-sm text-white/70 hover:text-white transition-colors">
              FAQ
            </a>

            {/* Segment Selector Desktop */}
            <div className="relative hidden md:block" role="group" aria-label="Seleccionar segmento">
              <label htmlFor="nav-segment-select" className="sr-only">Segmento</label>
              <div className="relative">
                <select
                  id="nav-segment-select"
                  value={segment}
                  onChange={(e) => handleSegmentChange(e.target.value as typeof segment)}
                  className="appearance-none cursor-pointer rounded-xl bg-white/5 py-2 pl-3 pr-9 text-sm font-medium text-white/80 hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-aima-purple/50"
                >
                  {segments.map((seg) => (
                    <option key={seg.id} value={seg.id} className="bg-aima-900 text-white">
                      {seg.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50" />
              </div>
            </div>

            <a
              href="#contacto"
              className="rounded-xl bg-aima-purple px-5 py-2.5 text-sm font-semibold text-white hover:bg-aima-purple-light transition-colors"
            >
              Agendar demo
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden overflow-hidden bg-aima-950/95 backdrop-blur-md border-t border-white/10"
            role="navigation"
          >
            <div className="px-5 py-4 space-y-3">
              <a href="#diagnostico" className="block py-2 text-sm text-white/70 hover:text-white" onClick={() => setMobileOpen(false)}>
                Diagnóstico
              </a>
              <a href="#embudo" className="block py-2 text-sm text-white/70 hover:text-white" onClick={() => setMobileOpen(false)}>
                El Embudo
              </a>
              <a href="#agente-demo" className="block py-2 text-sm text-white/70 hover:text-white" onClick={() => setMobileOpen(false)}>
                Demo IA
              </a>
              <a href="#segmentos" className="block py-2 text-sm text-white/70 hover:text-white" onClick={() => setMobileOpen(false)}>
                Segmentos
              </a>
              <a href="#resultados" className="block py-2 text-sm text-white/70 hover:text-white" onClick={() => setMobileOpen(false)}>
                Resultados
              </a>
              <a href="#objeciones" className="block py-2 text-sm text-white/70 hover:text-white" onClick={() => setMobileOpen(false)}>
                FAQ
              </a>

              {/* Segment Selector Mobile */}
              <div className="pt-2 border-t border-white/10">
                <label className="block text-xs text-white/40 mb-2">Segmento</label>
                <div className="flex flex-wrap gap-2">
                  {segments.map((seg) => (
                    <button
                      key={seg.id}
                      onClick={() => handleSegmentChange(seg.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        segment === seg.id
                          ? `bg-[${seg.color.primary}]/20 text-[${seg.color.primary}] border border-[${seg.color.primary}]/40`
                          : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                      }`}
                      style={{
                        backgroundColor: segment === seg.id ? `${seg.color.primary}33` : 'rgba(255,255,255,0.05)',
                        borderColor: segment === seg.id ? `${seg.color.primary}66` : 'transparent',
                        color: segment === seg.id ? seg.color.primary : 'rgba(255,255,255,0.6)',
                      }}
                    >
                      {(() => {
                        const Icon = NavIconComponents[seg.icon];
                        return <Icon size={10} className="inline mr-1" />;
                      })()}
                      {seg.label}
                    </button>
                  ))}
                </div>
              </div>

              <a
                href="#contacto"
                className="block mt-4 w-full text-center rounded-xl bg-aima-purple px-5 py-3 text-sm font-semibold text-white hover:bg-aima-purple-light transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Agendar demo
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}