import type { ReactNode } from "react";

/** Seamless infinite loop built from two identical tracks. Pauses on hover via CSS. */
export default function Marquee({
  children,
  reverse = false,
  duration = 28,
  className = "",
  trackClassName = "",
}: {
  children: ReactNode;
  reverse?: boolean;
  duration?: number;
  className?: string;
  trackClassName?: string;
}) {
  return (
    <div className={`relative overflow-hidden marquee-mask ${className}`}>
      <div
        className={`flex w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ animationDuration: `${duration}s` }}
      >
        <div className={`flex shrink-0 items-center ${trackClassName}`}>{children}</div>
        <div className={`flex shrink-0 items-center ${trackClassName}`} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
