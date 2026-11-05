"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function CourseImageSlider({
  images,
  alt,
  gradient,
  emoji,
  heightClass = "h-40",
  interval = 3200,
  rounded = "",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: {
  images: string[];
  alt: string;
  gradient: string;
  emoji: string;
  heightClass?: string;
  interval?: number;
  rounded?: string;
  sizes?: string;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (images.length <= 1 || paused) return;
    timer.current = setInterval(() => {
      setActive((i) => (i + 1) % images.length);
    }, interval);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [images.length, paused, interval]);

  if (images.length === 0) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br ${gradient} ${heightClass} ${rounded}`}>
        <span className="text-6xl drop-shadow-lg">{emoji}</span>
      </div>
    );
  }

  return (
    <div
      className={`group/slider relative overflow-hidden ${heightClass} ${rounded}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt={`${alt} — slide ${i + 1}`}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-700 ease-out group-hover/slider:scale-110"
          />
        </div>
      ))}
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${gradient} opacity-45 mix-blend-multiply`} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" />
      <span className="absolute bottom-3 left-3 text-3xl drop-shadow-lg">{emoji}</span>

      {images.length > 1 && (
        <div className="absolute bottom-3 right-3 flex gap-1">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActive(i);
              }}
              aria-label={`Show image ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-5 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
