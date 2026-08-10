import { useEffect } from "react";
import { useMarqueeStore } from "@/store/useMarqueeStore";

export function MarqueeBar() {
  const { settings } = useMarqueeStore();

  useEffect(() => {
    useMarqueeStore.getState().loadItems().catch((err) => {
      console.error("Gagal memuat marquee items dari Supabase:", err);
    });
  }, []);

  const items = [...settings.items, ...settings.items];

  const speedDuration =
    settings.speed === "slow"
      ? "40s"
      : settings.speed === "fast"
      ? "15s"
      : "25s";

  return (
    <div
      className="py-4 overflow-hidden border-y border-espresso/10 transition-colors duration-300"
      style={{ backgroundColor: settings.backgroundColor }}
    >
      <div
        className="flex gap-12 whitespace-nowrap animate-marquee"
        style={{ animationDuration: speedDuration }}
      >
        {items.map((label, i) => (
          <div
            key={i}
            className="flex items-center gap-12 text-xs tracking-[0.3em] font-body uppercase font-medium transition-colors duration-300"
            style={{ color: settings.textColor }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full opacity-60"
              style={{ backgroundColor: settings.textColor }}
            />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

