"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export type Slide = {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  badge?: string;
};

export default function ImageSlider({
  slides,
  interval = 4500,
  heightClass = "h-64 sm:h-80",
}: {
  slides: Slide[];
  interval?: number;
  heightClass?: string;
}) {
  const [active, setActive] = useState(0);

  const next = useCallback(() => {
    setActive((i) => (i + 1) % slides.length);
  }, [slides.length]);

  const prev = () => setActive((i) => (i - 1 + slides.length) % slides.length);

  useEffect(() => {
    const t = setInterval(next, interval);
    return () => clearInterval(t);
  }, [next, interval]);

  return (
    <div className={`group relative w-full overflow-hidden rounded-3xl shadow-xl ${heightClass}`}>
      {slides.map((s, i) => (
        <div
          key={s.src}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === active ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            priority={i === 0}
            sizes="(max-width: 1024px) 100vw, 1152px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-7">
            {s.badge && (
              <span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur">
                {s.badge}
              </span>
            )}
            <h3 className="text-xl font-black leading-tight sm:text-2xl">{s.title}</h3>
            <p className="mt-1 text-sm text-slate-200 sm:text-base">{s.subtitle}</p>
          </div>
        </div>
      ))}

      {/* Controls */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur transition group-hover:opacity-100 hover:bg-white/35"
      >
        ‹
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur transition group-hover:opacity-100 hover:bg-white/35"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute right-4 top-4 flex gap-1.5">
        {slides.map((s, i) => (
          <button
            key={s.src}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
