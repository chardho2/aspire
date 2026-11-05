import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import AuroraBackground from "./AuroraBackground";

export type Crumb = { href?: string; label: string };

/** Consistent, animated hero for every inner page. */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  crumbs = [],
  tone = "light",
  image,
  children,
  compact = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  crumbs?: Crumb[];
  tone?: "light" | "dark" | "aurora";
  image?: string;
  children?: ReactNode;
  compact?: boolean;
}) {
  const dark = tone !== "light";
  return (
    <section className={`relative isolate overflow-hidden ${dark ? "text-white" : "text-slate-900"}`}>
      <AuroraBackground tone={tone} dense />
      <div className={`section-shell relative ${compact ? "py-14 lg:py-16" : "py-20 lg:py-28"}`}>
        {crumbs.length > 0 && (
          <nav className={`mb-6 flex flex-wrap items-center gap-1.5 text-xs font-semibold ${dark ? "text-white/60" : "text-slate-400"}`}>
            <Link href="/" className="hover:text-indigo-500">Home</Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-1.5">
                <span>/</span>
                {c.href ? (
                  <Link href={c.href} className="hover:text-indigo-500">{c.label}</Link>
                ) : (
                  <span className={dark ? "text-white/90" : "text-slate-700"}>{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <div className={`grid items-center gap-12 ${image ? "lg:grid-cols-[1.15fr_.85fr]" : ""}`}>
          <div className="animate-fadeup">
            {eyebrow && (
              <span className={`pill ${dark ? "border border-white/20 bg-white/10 text-cyan-200" : "border border-indigo-100 bg-white/80 text-indigo-700 shadow-sm"}`}>
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse-glow" />
                {eyebrow}
              </span>
            )}
            <h1 className="mt-5 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {subtitle && (
              <p className={`mt-5 max-w-2xl text-lg leading-relaxed ${dark ? "text-slate-300" : "text-slate-600"}`}>
                {subtitle}
              </p>
            )}
            {children && <div className="mt-8">{children}</div>}
          </div>
          {image && (
            <div className="relative animate-slideleft [animation-delay:200ms]">
              <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-indigo-500/20 to-cyan-400/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/40 shadow-2xl shadow-indigo-900/20">
                <Image
                  src={image}
                  alt=""
                  width={900}
                  height={620}
                  priority
                  className="h-64 w-full object-cover sm:h-80 lg:h-[22rem] animate-kenburns"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/35 to-transparent" />
              </div>
              <div className="absolute -bottom-5 -left-5 hidden animate-float rounded-2xl glass px-4 py-3 shadow-xl sm:block">
                <p className="text-xs font-bold text-slate-900">✨ Learn. Build. Get hired.</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t ${dark ? "from-[#080d24]" : "from-[#f6f8ff]"} to-transparent`} aria-hidden="true" />
    </section>
  );
}
