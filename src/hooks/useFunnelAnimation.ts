import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useFunnelAnimation(containerRef: React.RefObject<HTMLDivElement | null>) {
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    ctxRef.current = gsap.context(() => {
      // Animate funnel steps sequentially
      const steps = gsap.utils.toArray<HTMLElement>('.funnel-step', container);
      const connectors = gsap.utils.toArray<HTMLElement>('.funnel-connector', container);
      const kpiCards = gsap.utils.toArray<HTMLElement>('.funnel-kpi', container);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          once: true,
        },
      });

      // Entrance animation for steps
      steps.forEach((step, i) => {
        tl.from(step, {
          y: 60,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
        }, i * 0.15);

        // Connector animation after step
        if (connectors[i]) {
          tl.from(connectors[i], {
            scaleY: 0,
            transformOrigin: 'top center',
            duration: 0.5,
            ease: 'power2.out',
          }, `-=${0.4}`);
        }

        // KPI card animation
        if (kpiCards[i]) {
          tl.from(kpiCards[i], {
            x: i % 2 === 0 ? -40 : 40,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out',
          }, `-=${0.45}`);
        }
      });

      // Floating particles in background
      gsap.to('.funnel-particle', {
        y: -20,
        x: (i) => (i % 2 === 0 ? 15 : -15),
        rotation: 360,
        duration: 8,
        ease: 'none',
        repeat: -1,
        yoyo: true,
        stagger: 1.2,
      });
    }, container);

    return () => {
      ctxRef.current?.revert();
    };
  }, [containerRef]);
}