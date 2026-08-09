"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { useGalleryStore } from "@/store/useGalleryStore";
import { GalleryPhoto } from "@/types";
import { useEffect, useState } from "react";

export function OurSpaceSection() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);

  useEffect(() => {
    useGalleryStore
      .getState()
      .loadItems()
      .catch((error) => {
        console.error("Gagal memuat galeri dari Supabase", error);
      });

    // Dapatkan inisial state
    const storePhotos = useGalleryStore.getState().items.filter((p) => p.isActive);
    setPhotos(storePhotos);

    // Subscribe pada perubahan store
    const unsubscribe = useGalleryStore.subscribe((state) => {
      const filtered = state.items.filter((p) => p.isActive);
      setPhotos(filtered);
    });

    return unsubscribe;
  }, []);

  const heroPhoto = photos.find((p) => p.isHero) || photos[0];
  const otherPhotos = photos.filter((p) => p !== heroPhoto).slice(0, 4);

  return (
    <section id="ruang" className="bg-ivory py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        <SectionLabel>Suasana</SectionLabel>
        <div className="grid lg:grid-cols-2 gap-10 mt-3">
          <h2 className="font-display font-black text-4xl lg:text-6xl text-espresso leading-tight">
            Ruang Kami, <em className="not-italic italic font-display text-amber-brand">Sudutmu</em>
          </h2>
          <p className="text-mutedbrown lg:pt-6">
            Cahaya menembus tirai linen. Aroma kopi yang baru digiling. Kursi yang terasa dibuat
            khusus untukmu. Enam puluh kursi, seribu cerita. Inilah KOFFIE.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[150px] sm:auto-rows-[190px] lg:auto-rows-[220px] gap-4 mt-12">
          {heroPhoto && (
            <div className="col-span-2 row-span-2 overflow-hidden bg-espresso/5">
              <img
                src={heroPhoto.url}
                alt={heroPhoto.caption || "Interior KOFFIE"}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          )}
          {otherPhotos.map((p, i) => (
            <div key={p.id || i} className="overflow-hidden bg-espresso/5">
              <img
                src={p.url}
                alt={p.caption || `Detail kafe ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        <a
          href="#"
          className="inline-block mt-8 text-amber-brand text-xs tracking-[0.25em] uppercase hover:underline"
        >
          Lihat Galeri Lengkap →
        </a>
      </div>
    </section>
  );
}
