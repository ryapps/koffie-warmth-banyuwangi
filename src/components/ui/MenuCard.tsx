import type { MenuItem } from "@/types";

export function MenuCard({ item }: { item: MenuItem }) {
  return (
    <div className="group relative overflow-hidden bg-espresso/50 border border-cream/10">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/30 to-transparent" />
      </div>
      {item.badge && (
        <span className="absolute top-4 left-4 border border-cream/40 text-cream/80 text-[9px] tracking-[0.2em] px-2 py-1 font-body uppercase backdrop-blur-sm">
          {item.badge}
        </span>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
        <div>
          <h3 className="font-display text-cream text-xl font-bold leading-tight">{item.name}</h3>
          <p className="font-body text-cream/60 text-xs mt-1 max-w-[80%]">{item.description}</p>
        </div>
        <span className="font-display text-amber-brand text-lg font-bold whitespace-nowrap">
          {item.price}
        </span>
      </div>
    </div>
  );
}
