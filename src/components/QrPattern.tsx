function hashSeed(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return h;
}

function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type ReactCell = { x: number; y: number };

function renderFinder(x: number, y: number, cellSize: number, color: string) {
  return (
    <g key={`finder-${x}-${y}`} transform={`translate(${x * cellSize}, ${y * cellSize})`}>
      <rect width={cellSize * 3} height={cellSize * 3} fill={color} rx={2} />
      <rect x={cellSize * 0.5} y={cellSize * 0.5} width={cellSize * 2} height={cellSize * 2} fill="white" rx={1} />
      <rect x={cellSize} y={cellSize} width={cellSize} height={cellSize} fill={color} />
    </g>
  );
}

/** Deterministic, decorative QR-style pattern (not a scannable real QR). */
export default function QrPattern({
  seed,
  size = 96,
  cells = 10,
  className = "",
  color = "#0f172a",
}: {
  seed: string;
  size?: number;
  cells?: number;
  className?: string;
  color?: string;
}) {
  const rand = mulberry32(hashSeed(seed));
  const cellSize = size / cells;
  const rects: ReactCell[] = [];

  for (let y = 0; y < cells; y++) {
    for (let x = 0; x < cells; x++) {
      const isFinder =
        (x < 3 && y < 3) || (x >= cells - 3 && y < 3) || (x < 3 && y >= cells - 3);
      if (isFinder) continue;
      if (rand() > 0.56) {
        rects.push({ x, y });
      }
    }
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className} role="img" aria-label="Verification code">
      <rect width={size} height={size} fill="white" rx={8} />
      {renderFinder(0, 0, cellSize, color)}
      {renderFinder(cells - 3, 0, cellSize, color)}
      {renderFinder(0, cells - 3, cellSize, color)}
      {rects.map((r) => (
        <rect
          key={`${r.x}-${r.y}`}
          x={r.x * cellSize}
          y={r.y * cellSize}
          width={cellSize}
          height={cellSize}
          fill={color}
        />
      ))}
    </svg>
  );
}
