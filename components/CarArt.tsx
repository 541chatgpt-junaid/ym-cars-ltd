import type { CarShape } from "@/data/cars";

// Lightweight vector car illustration used until real vehicle photos are added.
const bodies: Record<CarShape, string> = {
  hatch:
    "M30 118 L34 92 Q38 80 52 76 L92 68 L122 42 Q130 36 142 36 L214 36 Q228 36 238 46 L262 72 L298 80 Q316 84 318 100 L320 118 Z",
  saloon:
    "M22 118 L26 96 Q30 84 44 80 L96 70 L128 44 Q136 38 148 38 L206 38 Q220 38 230 46 L258 70 L304 78 Q322 82 324 100 L326 118 Z",
  suv:
    "M26 118 L28 82 Q30 70 44 66 L84 60 L110 30 Q116 24 128 24 L236 24 Q250 24 258 34 L280 62 L304 68 Q320 72 320 90 L322 118 Z",
  mpv:
    "M24 118 L26 80 Q28 66 42 62 L76 56 L104 28 Q110 22 122 22 L250 22 Q264 22 272 34 L292 62 L308 68 Q322 74 322 92 L322 118 Z",
};

const windows: Record<CarShape, string> = {
  hatch: "M100 70 L126 46 Q132 42 142 42 L176 42 L176 70 Z M184 42 L212 42 Q222 42 230 50 L250 70 L184 70 Z",
  saloon: "M104 72 L132 48 Q138 44 148 44 L178 44 L178 72 Z M186 44 L204 44 Q216 44 224 50 L246 72 L186 72 Z",
  suv: "M92 62 L114 34 Q118 30 128 30 L178 30 L178 62 Z M186 30 L234 30 Q244 30 250 38 L270 62 L186 62 Z",
  mpv: "M86 58 L108 32 Q114 28 122 28 L170 28 L170 58 Z M178 28 L218 28 L218 58 Z M226 28 L250 28 Q260 28 266 38 L282 58 L226 58 Z",
};

export default function CarArt({
  shape,
  color = "blue",
  className,
}: {
  shape: CarShape;
  color?: "blue" | "green";
  className?: string;
}) {
  const id = `g-${shape}-${color}`;
  const [c1, c2] = color === "blue" ? ["#3b7bff", "#0b3f9e"] : ["#2fc15a", "#0b6e25"];
  return (
    <svg viewBox="0 0 350 150" className={className} role="img" aria-label={`${shape} car illustration`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c1} />
          <stop offset="1" stopColor={c2} />
        </linearGradient>
      </defs>
      <ellipse cx="175" cy="134" rx="150" ry="8" fill="rgba(0,0,0,.35)" />
      <path d={bodies[shape]} fill={`url(#${id})`} />
      <path d={windows[shape]} fill="rgba(200,225,255,.55)" />
      <rect x="300" y="92" width="16" height="7" rx="3" fill="#fff6c8" />
      <rect x="30" y="94" width="12" height="6" rx="3" fill="#ff5a5a" />
      {[86, 262].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="118" r="22" fill="#11161d" />
          <circle cx={cx} cy="118" r="11" fill="#c9d2dc" />
          <circle cx={cx} cy="118" r="4" fill="#11161d" />
        </g>
      ))}
    </svg>
  );
}
