export default function TickStrip({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`h-2 w-full ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, var(--line-light) 0 1px, transparent 1px 10px)",
      }}
    />
  );
}
