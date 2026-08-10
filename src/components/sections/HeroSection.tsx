import { useEffect } from "react";
import { motion } from "framer-motion";
import { BrandButton } from "@/components/ui/BrandButton";
import { Star } from "lucide-react";
import { useReservationModalStore } from "@/store/useReservationModalStore";
import { useHeroStore } from "@/store/useHeroStore";
import { useSettingsStore } from "@/store/useSettingsStore";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function HeroSection() {
  const openReservationModal = useReservationModalStore((state) => state.openModal);
  const hero = useHeroStore((state) => state.hero);
  const cafeSettings = useSettingsStore((state) => state.cafeSettings);

  useEffect(() => {
    useHeroStore.getState().loadHero().catch((err) => {
      console.error("Gagal memuat konten hero dari Supabase:", err);
    });
    useSettingsStore.getState().loadSettings().catch((err) => {
      console.error("Gagal memuat pengaturan kafe dari Supabase:", err);
    });
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-screen bg-espresso text-cream overflow-hidden flex items-center"
    >
      <img
        src={hero.imageUrl}
        alt="Kopi diseduh perlahan di KOFFIE café"
        className="absolute inset-0 w-full h-full object-cover opacity-70 lg:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-espresso via-espresso/85 lg:via-espresso/70 to-espresso/30 lg:to-transparent" />

      <div className="relative z-10 max-w-[1600px] mx-auto w-full px-6 lg:px-16 pt-32 pb-20">
        <div className="max-w-2xl flex flex-col gap-5">
          <motion.span
            custom={0}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="font-accent italic text-amber-brand text-base"
          >
            {hero.locationLabel || `Est. 2018 · ${cafeSettings.city}, Jawa Timur`}
          </motion.span>

          <h1 className="font-display font-black leading-[1.02] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">
            <motion.span custom={1} initial="hidden" animate="show" variants={fadeUp} className="block text-cream">
              {hero.title}
            </motion.span>
          </h1>

          {hero.subtitle && (
            <motion.p
              custom={4}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="font-accent italic text-cream/70 text-lg mt-2"
            >
              {hero.subtitle}
            </motion.p>
          )}

          <motion.p
            custom={5}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="text-cream/70 text-sm leading-relaxed max-w-md"
          >
            {hero.description}
          </motion.p>

          <motion.div
            custom={6}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 mt-6"
          >
            <BrandButton variant="filled" onClick={openReservationModal}>
              {hero.primaryCtaText || "Pesan Meja"}
            </BrandButton>
            <a href={hero.secondaryCtaLink || "#menu"}>
              <BrandButton variant="outlined">{hero.secondaryCtaText || "Jelajahi Menu"}</BrandButton>
            </a>
          </motion.div>

          <motion.div
            custom={7}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="flex flex-wrap items-end gap-8 mt-10"
          >
            <div className="bg-amber-brand text-espresso p-4 -rotate-3 shadow-lg">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-espresso" />
                <span className="text-[10px] font-body tracking-widest">GOOGLE</span>
              </div>
              <div className="font-display font-black text-3xl leading-none mt-1">
                {cafeSettings.ratingStat || "4.9"}
              </div>
            </div>
            <div className="border-l border-cream/20 pl-6">
              <div className="font-display font-bold text-3xl">{cafeSettings.yearsStat || "6+"}</div>
              <div className="text-[10px] tracking-widest text-cream/50 mt-1">TAHUN ROASTING</div>
            </div>
            <div className="border-l border-cream/20 pl-6">
              <div className="font-display font-bold text-3xl">{cafeSettings.originsStat || "12"}</div>
              <div className="text-[10px] tracking-widest text-cream/50 mt-1">ORIGIN BIJI</div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-10">
        <span className="text-[10px] tracking-[0.3em] text-cream/40">GULIR</span>
        <div className="w-px h-12 bg-cream/20 relative overflow-hidden">
          <div className="absolute inset-x-0 w-px h-6 bg-amber-brand animate-[scroll-down_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}
