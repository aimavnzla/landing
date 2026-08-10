import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useKPICounter(
  endValue: number,
  suffix: string = '',
  prefix: string = '',
  options: { duration?: number; ease?: string; decimals?: number } = {}
) {
  const [displayValue, setDisplayValue] = useState(() => `${prefix}0${suffix}`);
  const elementRef = useRef<HTMLSpanElement>(null);
  const objRef = useRef({ v: 0 });
  const triggerRef = useRef<{ kill: () => void } | null>(null);

  const { duration = 1.6, ease = 'power2.out', decimals = 0 } = options;

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    objRef.current = { v: 0 };

    const tween = gsap.to(objRef.current, {
      v: endValue,
      duration,
      ease,
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          tween.play();
        },
      },
      onUpdate: () => {
        const val = decimals > 0
          ? objRef.current.v.toFixed(decimals)
          : Math.round(objRef.current.v).toString();
        setDisplayValue(`${prefix}${val}${suffix}`);
      },
    });

    triggerRef.current = tween.scrollTrigger ?? null;

    return () => {
      triggerRef.current?.kill();
      tween.kill();
    };
  }, [endValue, suffix, prefix, duration, ease, decimals]);

  return { ref: elementRef, displayValue };
}