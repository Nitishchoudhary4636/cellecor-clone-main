export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-1 font-display text-2xl font-bold tracking-tight ${className}`}>
      <span>VOLTORA</span>
      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
    </span>
  );
}
