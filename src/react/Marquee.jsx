const WORDS = ["CONCEPT", "MODEL", "CAD", "PRINT"];

function Row({ hidden }) {
  return (
    <span aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {WORDS.map((w) => (
        <span key={w} className="flex shrink-0 items-center">
          <span className="px-6 font-[family-name:var(--font-display)] text-sm tracking-wide text-[var(--paper)]">
            {w}
          </span>
          <span aria-hidden="true" className="text-[var(--paper)] opacity-70">
            -
          </span>
        </span>
      ))}
    </span>
  );
}

export default function Marquee({ className = "" }) {
  return (
    <div
      className={`catred-marquee overflow-hidden py-3 ${className}`}
      style={{ background: "var(--red-deep, var(--red))" }}
    >
      <style>{`
        .catred-marquee-track { display: flex; width: max-content; animation: catred-marquee 18s linear infinite; }
        .catred-marquee:hover .catred-marquee-track { animation-play-state: paused; }
        @keyframes catred-marquee { to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .catred-marquee-track { animation: none; } }
      `}</style>
      <div className="catred-marquee-track">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
