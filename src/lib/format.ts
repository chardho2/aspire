export function formatINR(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}

export function discountPct(price: number, offer: number): number {
  if (!price || offer >= price) return 0;
  return Math.round(((price - offer) / price) * 100);
}

export function formatCount(n: number): string {
  if (n >= 100000) return (n / 100000).toFixed(1).replace(/\.0$/, "") + "L";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return String(n);
}

export function modeLabel(mode: string | null | undefined): string {
  switch (mode) {
    case "online":
      return "💻 Online";
    case "offline":
      return "🏫 Offline";
    default:
      return "💻🏫 Online & Offline";
  }
}
