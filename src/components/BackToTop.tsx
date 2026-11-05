"use client";

import { useEffect, useRef } from "react";

export default function BackToTop() {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const show = window.scrollY > 600;
      ref.current?.classList.toggle("pointer-events-none", !show);
      ref.current?.classList.toggle("translate-y-6", !show);
      ref.current?.classList.toggle("opacity-0", !show);
      ref.current?.classList.toggle("opacity-100", show);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      ref={ref}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-2xl text-lg text-white shadow-xl shadow-indigo-500/30 transition-all duration-500 brand-gradient hover:-translate-y-1 pointer-events-none translate-y-6 opacity-0"
    >
      ↑
    </button>
  );
}
