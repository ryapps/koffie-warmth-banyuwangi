import { Calendar, MapPin, Phone } from "lucide-react";
import { useReservationModalStore } from "@/store/useReservationModalStore";
import { config } from "@/data/config";

export function FloatingActionBar() {
  const openReservationModal = useReservationModalStore((state) => state.openModal);

  const phoneHref = `tel:${config.contact.phone.replace(/\s+/g, "")}`;

  const items = [
    { icon: Calendar, label: "PESAN", onClick: openReservationModal, href: undefined },
    { icon: MapPin, label: "LOKASI", onClick: undefined, href: "#lokasi" },
    { icon: Phone, label: "TELEPON", onClick: undefined, href: phoneHref },
  ];

  return (
    <aside className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 flex-col bg-espresso border border-cream/10">
      {items.map((it, i) => {
        const content = (
          <>
            <it.icon className="w-4 h-4 text-amber-brand" />
            <span className="text-[9px] tracking-[0.3em] text-cream/60 font-body [writing-mode:vertical-rl] rotate-180">
              {it.label}
            </span>
          </>
        );

        if (it.onClick) {
          return (
            <button
              key={it.label}
              onClick={it.onClick}
              className={`flex flex-col items-center gap-3 px-3 py-6 hover:bg-amber-brand/10 transition-colors cursor-pointer ${
                i > 0 ? "border-t border-cream/10" : ""
              }`}
              aria-label={it.label}
            >
              {content}
            </button>
          );
        }

        return (
          <a
            key={it.label}
            href={it.href}
            className={`flex flex-col items-center gap-3 px-3 py-6 hover:bg-amber-brand/10 transition-colors ${
              i > 0 ? "border-t border-cream/10" : ""
            }`}
            aria-label={it.label}
          >
            {content}
          </a>
        );
      })}
    </aside>
  );
}

