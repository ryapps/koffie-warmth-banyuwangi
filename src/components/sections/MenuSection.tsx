import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MenuCard } from "@/components/ui/MenuCard";
import { BrandButton } from "@/components/ui/BrandButton";
import { menu } from "@/data/menu";
import { Coffee, Sun, Moon, Cookie } from "lucide-react";

const icons = { Coffee, Sun, Moon, Cookie } as const;

export function MenuSection() {
  const [active, setActive] = useState(menu[0].id);
  const cat = menu.find((m) => m.id === active)!;
  const featured = cat.items.filter((i) => i.featured);
  const rest = cat.items.filter((i) => !i.featured);

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
          {menu.map((m) => {
            const Icon = icons[m.icon as keyof typeof icons];
            const isActive = active === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setActive(m.id)}
                className={`flex items-center gap-2 pb-4 px-1 text-xs tracking-[0.25em] uppercase whitespace-nowrap snap-start border-b-2 transition-colors ${
                  isActive ? "text-cream border-amber-brand" : "text-cream/40 border-transparent hover:text-cream/70"
                }`}
              >
                <Icon className="w-4 h-4" />
                {m.label}
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
              {featured.map((it) => <MenuCard key={it.name} item={it} />)}
            </div>

            {rest.length > 0 && (
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-1 mt-16">
                {rest.map((it) => (
                  <div key={it.name} className="flex items-start justify-between py-5 border-b border-cream/10 gap-4">
                    <div>
                      <h4 className="font-display text-lg text-cream font-bold">{it.name}</h4>
                      <p className="text-cream/50 text-xs mt-1">{it.description}</p>
                    </div>
                    <span className="text-amber-brand font-display font-bold whitespace-nowrap">{it.price}</span>
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
