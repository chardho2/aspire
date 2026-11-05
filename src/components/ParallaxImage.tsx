"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/** Slow scroll parallax + gentle Ken Burns drift on any local image. */
export default function ParallaxImage({
  src,
  alt,
  className = "",
  speed = 0.08,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 50vw",
}: {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  priority?: boolean;
  sizes?: string;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!outer.current || !inner.current) return;
      const rect = outer.current.getBoundingClientRect();
      const offset = (window.innerHeight / 2 - (rect.top + rect.height / 2)) * speed;
      inner.current.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0) scale(1.12)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [speed]);

  return (
    <div ref={outer} className={`relative overflow-hidden ${className}`}>
      <div ref={inner} className="absolute -inset-[8%] will-change-transform">
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      </div>
    </div>
  );
}
