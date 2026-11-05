"use client";

import { useEffect, useRef } from "react";

export default function CountUp({ end, suffix = "", duration = 1800 }: { end: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const render = (v: number) => { node.textContent = `${v.toLocaleString("en-IN")}${suffix}`; };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      render(end);
      return;
    }

    const started = { current: false };
    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started.current) return;
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 4);
          render(Math.floor(eased * end));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.35 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [end, duration, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}
