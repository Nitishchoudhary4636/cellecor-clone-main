export function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="bg-foreground text-background py-2 text-xs font-medium overflow-hidden">
      <div className="marquee">
        <div className="marquee-track">
          {doubled.map((t, i) => (
            <span key={i} className="whitespace-nowrap">
              ⚡ {t}
            </span>
          ))}
        </div>
        <div className="marquee-track" aria-hidden>
          {doubled.map((t, i) => (
            <span key={i} className="whitespace-nowrap">
              ⚡ {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
