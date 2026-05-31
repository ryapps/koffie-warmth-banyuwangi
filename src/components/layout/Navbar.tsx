import { useState } from "react";
import { Menu, X } from "lucide-react";
import { config } from "@/data/config";
import { useScrolled } from "@/hooks/useScrolled";
import { BrandButton } from "@/components/ui/BrandButton";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(20);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 bg-espresso transition-shadow duration-300",
        scrolled && "shadow-2xl shadow-black/40",
      )}
    >
      <nav className="max-w-[1600px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <a href="#top" className="flex items-baseline gap-1.5">
          <span className="font-display font-bold text-cream text-2xl tracking-tight">
            {config.brand.name}
          </span>
          <span className="font-accent italic text-amber-brand text-sm">
            {config.brand.suffix}
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-10">
          {config.nav.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-cream/80 hover:text-cream text-[11px] tracking-[0.25em] font-body uppercase transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <BrandButton variant="outlined" className="hidden sm:inline-flex">
            Pesan Meja
          </BrandButton>
          <button
            aria-label="Buka menu"
            onClick={() => setOpen(true)}
            className="lg:hidden text-cream p-2"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 bg-espresso z-50 flex flex-col p-8 lg:hidden">
          <div className="flex justify-between items-center">
            <span className="font-display text-cream text-2xl font-bold">KOFFIE</span>
            <button aria-label="Tutup menu" onClick={() => setOpen(false)} className="text-cream">
              <X className="w-7 h-7" />
            </button>
          </div>
          <ul className="flex flex-col gap-6 mt-16">
            {config.nav.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-cream text-3xl"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <BrandButton variant="outlined" className="mt-auto w-full">
            Pesan Meja
          </BrandButton>
        </div>
      )}
    </header>
  );
}
