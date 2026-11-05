import type { ReactNode } from "react";

/** Crisp vector emblem — no external asset required. */
export function LogoMark({
  size = 44,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="aspire-mark" x1="4" y1="4" x2="60" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2563EB" />
          <stop offset=".5" stopColor="#6D28D9" />
          <stop offset="1" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="18" fill="url(#aspire-mark)" />
      <path d="M32 13 51 49H41.4l-3.6-6.7H26.2L22.6 49H13L32 13Zm0 14.4-5 9.3h10l-5-9.3Z" fill="white" />
      <circle cx="47.5" cy="17.5" r="4.5" fill="white" fillOpacity=".9" />
    </svg>
  );
}

export default function BrandLogo({
  size = 44,
  light = false,
  showTagline = true,
  className = "",
  children,
}: {
  size?: number;
  light?: boolean;
  showTagline?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} className="shrink-0 drop-shadow-sm" />
      <span className="leading-tight">
        <span className={`block text-[15px] font-extrabold tracking-tight ${light ? "text-white" : "text-slate-900"}`}>
          Chardho <span className={light ? "text-cyan-300" : "text-gradient"}>Aspire</span>
        </span>
        {showTagline && (
          <span className={`block text-[9px] font-bold tracking-[.18em] ${light ? "text-slate-400" : "text-slate-400"}`}>
            AMBITION · GROWTH · DREAMS
          </span>
        )}
        {children}
      </span>
    </span>
  );
}
