import type { Testimonial } from "@/types";
import { Star } from "lucide-react";

export function TestimonialCard({ t, dark = false }: { t: Testimonial; dark?: boolean }) {
  const bg = dark ? "bg-espresso" : "bg-cream";
  const quoteColor = dark ? "text-cream/90" : "text-espresso/80";
  const nameColor = dark ? "text-cream" : "text-espresso";
  const roleColor = dark ? "text-amber-brand" : "text-mutedbrown";

  return (
    <div className={`${bg} p-8 lg:p-10 flex flex-col gap-6 h-full`}>
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-amber-brand text-amber-brand" />
        ))}
      </div>
      <p className={`font-accent italic text-xl lg:text-2xl leading-relaxed ${quoteColor}`}>
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3 mt-auto">
        <img
          src={t.avatar}
          alt={t.name}
          className="w-11 h-11 rounded-full object-cover"
          loading="lazy"
        />
        <div>
          <div className={`font-body font-semibold ${nameColor}`}>{t.name}</div>
          <div className={`text-xs ${roleColor}`}>{t.role}</div>
        </div>
      </div>
    </div>
  );
}
