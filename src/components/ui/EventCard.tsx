import type { Event } from "@/types";
import { ArrowRight } from "lucide-react";

const getEventStyle = (type: Event["type"]) => {
  const styleMap: Record<Event["type"], { bg: string; text: string; sub: string; dot: string }> = {
    mendatang: {
      bg: "bg-espresso",
      text: "text-cream",
      sub: "text-cream/70",
      dot: "bg-amber-brand",
    },
    workshop: {
      bg: "bg-amber-brand",
      text: "text-espresso",
      sub: "text-espresso/80",
      dot: "bg-espresso",
    },
    gratis: {
      bg: "bg-cream",
      text: "text-espresso",
      sub: "text-espresso/60",
      dot: "bg-amber-brand",
    },
    rutin: { bg: "bg-espresso", text: "text-cream", sub: "text-cream/70", dot: "bg-amber-brand" },
  };
  return styleMap[type];
};

export function EventCard({ event }: { event: Event }) {
  const s = getEventStyle(event.type);
  const schedule = `${event.date} · ${event.startTime}`;

  return (
    <article className="flex flex-col overflow-hidden h-full group">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className={`${s.bg} ${s.text} p-7 flex flex-col gap-3 flex-1`}>
        <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] font-body uppercase">
          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
          {event.badge}
        </div>
        <h3 className="font-display text-2xl font-bold leading-tight">{event.title}</h3>
        <p className={`text-sm leading-relaxed ${s.sub}`}>{event.description}</p>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-current/20 text-xs tracking-widest">
          <span className={s.sub}>{schedule}</span>
          <button className="flex items-center gap-1 font-semibold hover:gap-2 transition-all">
            {event.cta} <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </article>
  );
}
