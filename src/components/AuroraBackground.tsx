import type { CSSProperties } from "react";

/** Layered animated mesh: gradient orbs + fine grid + grain. Pure CSS, zero JS. */
export default function AuroraBackground({
  tone = "light",
  image,
  className = "",
  dense = false,
}: {
  tone?: "light" | "dark" | "aurora";
  image?: string;
  className?: string;
  dense?: boolean;
}) {
  const dark = tone !== "light";
  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`} aria-hidden="true">
      <div
        className={`absolute inset-0 ${tone === "dark" ? "bg-[#080d24]" : "bg-[#f6f8ff]"}`}
      />
      {image && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-screen animate-kenburns"
          style={{ backgroundImage: `url(${image})` } as CSSProperties}
        />
      )}
      {tone === "aurora" && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-90"
          style={{ backgroundImage: "url(/images/aurora-bg.jpg)" } as CSSProperties}
        />
      )}
      <div className="absolute -left-[12%] -top-[35%] h-[34rem] w-[34rem] rounded-full bg-blue-400/35 blur-[110px] animate-blob" />
      <div
        className="absolute -right-[10%] top-[5%] h-[30rem] w-[30rem] rounded-full bg-violet-500/35 blur-[110px] animate-blob"
        style={{ animationDelay: "3s" } as CSSProperties}
      />
      <div
        className={`absolute bottom-[-30%] left-[28%] h-[32rem] w-[32rem] rounded-full blur-[110px] animate-blob ${dark ? "bg-cyan-400/25" : "bg-fuchsia-300/35"}`}
        style={{ animationDelay: "6s" } as CSSProperties}
      />
      {dense && (
        <div
          className="absolute left-[45%] top-[40%] h-[20rem] w-[20rem] rounded-full bg-cyan-300/25 blur-[90px] animate-blob"
          style={{ animationDelay: "9s" } as CSSProperties}
        />
      )}
      <div className={`absolute inset-0 grid-pattern ${dark ? "opacity-30" : "opacity-70"}`} />
      <div className={`absolute inset-0 noise ${dark ? "opacity-[.06]" : "opacity-[.035]"}`} />
      {tone !== "light" && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#080d24]/70 via-transparent to-[#080d24]/80" />
      )}
    </div>
  );
}
