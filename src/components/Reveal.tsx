"use client";

import { useEffect, useRef, type ReactNode, type Ref } from "react";

type Direction = "up" | "left" | "right" | "zoom" | "none";

/** IntersectionObserver-driven scroll reveal with stagger support (DOM-only, no re-renders). */
export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
  as?: "div" | "section" | "span" | "li" | "article";
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -50px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const dirClass =
    direction === "left" ? "from-left" : direction === "right" ? "from-right" : direction === "zoom" ? "zoom" : "";

  const Component = Tag as "div";
  return (
    <Component
      ref={ref as unknown as Ref<HTMLDivElement>}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${dirClass} ${className}`}
    >
      {children}
    </Component>
  );
}
