"use client";

import { BrandButton } from "@/components/ui/BrandButton";
import { MenuCard } from "@/components/ui/MenuCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useMenuStore } from "@/store/useMenuStore";
import { AnimatePresence, motion } from "framer-motion";
import { Coffee, Cookie, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const icons = { Coffee, Sun, Moon, Cookie } as const;

export function MenuSection() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [active, setActive] = useState("");

  useEffect(() => {
    useMenuStore
      .getState()
      .loadItems()
      .catch((error) => {
        console.error("Gagal memuat menu dari Supabase", error);
      });

    // Only call the store hook after mount on client
    const items = useMenuStore.getState().items.filter((item) => item.isActive);
    setMenuItems(items);

    // Subscribe to store updates
    const unsubscribe = useMenuStore.subscribe((state) => {
      const filtered = state.items.filter((item) => item.isActive);
      setMenuItems(filtered);
    });

    return unsubscribe;
  }, []);

  // Group by category
  const categories = Array.from(new Set(menuItems.map((item) => item.category)));

  // Set initial category if not already set
  if (!active && categories.length > 0) {
    setActive(categories[0]);
  }

  const activeItems = menuItems.filter((item) => item.category === active);
  const featured = activeItems.filter((i) => i.badge); // Items with badge are featured
  const rest = activeItems.filter((i) => !i.badge);

  return (
    <section id="menu" className="bg-espresso text-cream py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-10 items-end">
          <div>
            <SectionLabel>Apa Yang Kami Sajikan</SectionLabel>
            <h2 className="font-display font-black text-4xl lg:text-6xl mt-3 leading-tight">
              Menu Yang Layak{" "}
              <em className="not-italic italic font-display text-amber-brand">Dinikmati</em>
            </h2>
          </div>
          <div className="flex flex-col items-start lg:items-end gap-4">
            <p className="font-accent italic text-cream/60">
              &ldquo;Setiap hidangan adalah tindakan perhatian yang sengaja.&rdquo;
            </p>
            <BrandButton variant="outlined">Unduh Menu Lengkap</BrandButton>
          </div>
        </div>

        <div className="flex gap-8 mt-14 border-b border-cream/10 overflow-x-auto snap-x">
          {categories.map((cat) => {
            const Icon = icons[cat as keyof typeof icons] || Coffee;
            const isActive = active === cat;
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`flex items-center gap-2 pb-4 px-1 text-xs tracking-[0.25em] uppercase whitespace-nowrap snap-start border-b-2 transition-colors ${
                  isActive
                    ? "text-cream border-amber-brand"
                    : "text-cream/40 border-transparent hover:text-cream/70"
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.25 }}
            className="mt-12"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((it) => (
                <MenuCard
                  key={it.id}
                  item={
                    {
                      ...it,
                      featured: true,
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    } as any
                  }
                />
              ))}
            </div>

            {rest.length > 0 && (
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-1 mt-16">
                {rest.map((it) => (
                  <div
                    key={it.id}
                    className="flex items-start justify-between py-5 border-b border-cream/10 gap-4"
                  >
                    <div>
                      <h4 className="font-display text-lg text-cream font-bold">{it.name}</h4>
                      <p className="text-cream/50 text-xs mt-1">{it.description}</p>
                    </div>
                    <span className="text-amber-brand font-display font-bold whitespace-nowrap">
                      Rp {it.price.toLocaleString("id-ID")}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
