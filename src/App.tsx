import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Hero } from "./components/Hero";
import { DiagnosticVisual } from "./components/DiagnosticVisual";
import { LeadCapture } from "./components/LeadCapture";
import { FunnelVisual } from "./components/FunnelVisual";
import { AgentDemo } from "./components/AgentDemo";
import { SegmentComparison } from "./components/SegmentComparison";
import { ResultsSection } from "./components/ResultsSection";
import { HowItWorks } from "./components/HowItWorks";
import { ObjectionsSection } from "./components/ObjectionCard";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";
import { trackScrollDepth } from "./utils/analytics";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */
export default function App() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section reveals
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 44,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        });
      });

    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Scroll depth analytics (fires once per threshold)
  useEffect(() => {
    const fired = new Set<50 | 75 | 100>();
    let ticking = false;

    const check = () => {
      ticking = false;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const depth = window.scrollY / scrollable;
      ([50, 75, 100] as const).forEach((threshold) => {
        if (!fired.has(threshold) && depth * 100 >= threshold) {
          fired.add(threshold);
          trackScrollDepth(threshold);
        }
      });
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(check);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    check();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={rootRef} className="relative min-h-screen overflow-x-hidden bg-aima-950 text-white">
      <Nav />
      <main>
        <Hero />
        <DiagnosticVisual />
        <LeadCapture />
        <FunnelVisual />
        <AgentDemo />
        <SegmentComparison />
        <ResultsSection />
        <HowItWorks />
        <ObjectionsSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}