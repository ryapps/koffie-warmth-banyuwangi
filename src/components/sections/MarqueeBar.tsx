import { config } from "@/data/config";

export function MarqueeBar() {
  const items = [...config.marquee, ...config.marquee];
  return (
    <div className="bg-amber-brand py-4 overflow-hidden border-y border-espresso/10">
      <div className="flex gap-12 whitespace-nowrap animate-marquee">
        {items.map((label, i) => (
          <div key={i} className="flex items-center gap-12 text-espresso text-xs tracking-[0.3em] font-body uppercase font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-espresso/60" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
