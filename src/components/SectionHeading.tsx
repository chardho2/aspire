import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
  children,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  light?: boolean;
  children?: ReactNode;
  className?: string;
}) {
  const centered = align === "center";
  return (
    <Reveal className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}>
      {eyebrow && (
        <span
          className={`pill ${
            light
              ? "border border-white/20 bg-white/10 text-cyan-200"
              : "border border-indigo-100 bg-white/80 text-indigo-700 shadow-sm"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse-glow" />
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12] ${
          light ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-base leading-relaxed ${light ? "text-slate-300" : "text-slate-500"}`}>
          {subtitle}
        </p>
      )}
      {centered && (
        <div className="mx-auto mt-5 h-1 w-16 rounded-full aurora-gradient" aria-hidden="true" />
      )}
      {children}
    </Reveal>
  );
}
