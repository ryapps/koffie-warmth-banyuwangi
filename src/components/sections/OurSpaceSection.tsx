import { SectionLabel } from "@/components/ui/SectionLabel";

const photos = [
  "https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=800&q=80",
];

export function OurSpaceSection() {
  return (
    <section id="ruang" className="bg-ivory py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        <SectionLabel>Suasana</SectionLabel>
        <div className="grid lg:grid-cols-2 gap-10 mt-3">
          <h2 className="font-display font-black text-4xl lg:text-6xl text-espresso leading-tight">
            Ruang Kami,{" "}
            <em className="not-italic italic font-display text-amber-brand">Sudutmu</em>
          </h2>
          <p className="text-mutedbrown lg:pt-6">
            Cahaya menembus tirai linen. Aroma kopi yang baru digiling. Kursi yang terasa dibuat khusus
            untukmu. Enam puluh kursi, seribu cerita. Inilah KOFFIE.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          <img src={photos[0]} alt="Interior KOFFIE" loading="lazy" className="col-span-2 row-span-2 w-full h-full object-cover aspect-[3/4] hover:scale-[1.02] transition-transform duration-500" />
          {photos.slice(1).map((p, i) => (
            <img key={i} src={p} alt="Detail kafe" loading="lazy" className="w-full aspect-square object-cover hover:scale-[1.02] transition-transform duration-500" />
          ))}
        </div>

        <a href="#" className="inline-block mt-8 text-amber-brand text-xs tracking-[0.25em] uppercase hover:underline">
          Lihat Galeri Lengkap →
        </a>
      </div>
    </section>
  );
}
