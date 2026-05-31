import { Calendar, MapPin, Phone } from "lucide-react";

const items = [
  { icon: Calendar, label: "PESAN", href: "#lokasi" },
  { icon: MapPin, label: "LOKASI", href: "#lokasi" },
  { icon: Phone, label: "TELEPON", href: "#lokasi" },
];

export function FloatingActionBar() {
  return (
    <aside className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 flex-col bg-espresso border border-cream/10">
      {items.map((it, i) => (
        <a
          key={it.label}
          href={it.href}
          className={`flex flex-col items-center gap-3 px-3 py-6 hover:bg-amber-brand/10 transition-colors ${
            i > 0 ? "border-t border-cream/10" : ""
          }`}
          aria-label={it.label}
        >
          <it.icon className="w-4 h-4 text-amber-brand" />
          <span className="text-[9px] tracking-[0.3em] text-cream/60 font-body [writing-mode:vertical-rl] rotate-180">
            {it.label}
          </span>
        </a>
      ))}
    </aside>
  );
}
