export type AccentKey =
  | "blue"
  | "purple"
  | "teal"
  | "orange"
  | "pink"
  | "cyan"
  | "emerald"
  | "rose"
  | "amber"
  | "indigo"
  | "fuchsia"
  | "lime";

type AccentTheme = {
  badge: string;
  text: string;
  ring: string;
  dot: string;
  chipBg: string;
  glow: string;
};

export const ACCENTS: Record<AccentKey, AccentTheme> = {
  blue: {
    badge: "bg-blue-50 text-blue-700",
    text: "text-blue-600",
    ring: "ring-blue-200",
    dot: "bg-blue-500",
    chipBg: "bg-blue-100",
    glow: "shadow-blue-500/30",
  },
  purple: {
    badge: "bg-purple-50 text-purple-700",
    text: "text-purple-600",
    ring: "ring-purple-200",
    dot: "bg-purple-500",
    chipBg: "bg-purple-100",
    glow: "shadow-purple-500/30",
  },
  teal: {
    badge: "bg-teal-50 text-teal-700",
    text: "text-teal-600",
    ring: "ring-teal-200",
    dot: "bg-teal-500",
    chipBg: "bg-teal-100",
    glow: "shadow-teal-500/30",
  },
  orange: {
    badge: "bg-orange-50 text-orange-700",
    text: "text-orange-600",
    ring: "ring-orange-200",
    dot: "bg-orange-500",
    chipBg: "bg-orange-100",
    glow: "shadow-orange-500/30",
  },
  pink: {
    badge: "bg-pink-50 text-pink-700",
    text: "text-pink-600",
    ring: "ring-pink-200",
    dot: "bg-pink-500",
    chipBg: "bg-pink-100",
    glow: "shadow-pink-500/30",
  },
  cyan: {
    badge: "bg-cyan-50 text-cyan-700",
    text: "text-cyan-600",
    ring: "ring-cyan-200",
    dot: "bg-cyan-500",
    chipBg: "bg-cyan-100",
    glow: "shadow-cyan-500/30",
  },
  emerald: {
    badge: "bg-emerald-50 text-emerald-700",
    text: "text-emerald-600",
    ring: "ring-emerald-200",
    dot: "bg-emerald-500",
    chipBg: "bg-emerald-100",
    glow: "shadow-emerald-500/30",
  },
  rose: {
    badge: "bg-rose-50 text-rose-700",
    text: "text-rose-600",
    ring: "ring-rose-200",
    dot: "bg-rose-500",
    chipBg: "bg-rose-100",
    glow: "shadow-rose-500/30",
  },
  amber: {
    badge: "bg-amber-50 text-amber-700",
    text: "text-amber-600",
    ring: "ring-amber-200",
    dot: "bg-amber-500",
    chipBg: "bg-amber-100",
    glow: "shadow-amber-500/30",
  },
  indigo: {
    badge: "bg-indigo-50 text-indigo-700",
    text: "text-indigo-600",
    ring: "ring-indigo-200",
    dot: "bg-indigo-500",
    chipBg: "bg-indigo-100",
    glow: "shadow-indigo-500/30",
  },
  fuchsia: {
    badge: "bg-fuchsia-50 text-fuchsia-700",
    text: "text-fuchsia-600",
    ring: "ring-fuchsia-200",
    dot: "bg-fuchsia-500",
    chipBg: "bg-fuchsia-100",
    glow: "shadow-fuchsia-500/30",
  },
  lime: {
    badge: "bg-lime-50 text-lime-700",
    text: "text-lime-600",
    ring: "ring-lime-200",
    dot: "bg-lime-500",
    chipBg: "bg-lime-100",
    glow: "shadow-lime-500/30",
  },
};

export function getAccent(key: string | null | undefined): AccentTheme {
  if (key && key in ACCENTS) return ACCENTS[key as AccentKey];
  return ACCENTS.blue;
}
