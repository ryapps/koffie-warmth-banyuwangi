import { SectionLabel } from "@/components/ui/SectionLabel";

const blocks = [
  {
    num: "01",
    title: "Sumber Beretika,",
    accent: "Selalu.",
    body: "Hubungan langsung dengan petani kecil di Jawa Timur, Aceh, dan Toraja. Kami bayar di atas harga fair-trade—selalu. Kami kunjungi setiap kebun setahun sekali dan publikasikan laporan sumber secara terbuka.",
    bullets: ["3 daerah asal, 12 kemitraan petani aktif", "40% di atas harga minimum fair-trade", "Program kunjungan tahunan oleh head roaster kami"],
    img: "https://images.unsplash.com/photo-1746623691149-daeff6c67335?auto=format&fit=crop&w=1200&q=80",
    bg: "bg-ivory",
    reverse: false,
  },
  {
    num: "02",
    title: "Roasting Tangan,",
    accent: "Batch Kecil.",
    body: "Head roaster kami, dengan pengalaman lebih dari 15 tahun, memanggang setiap batch di bawah 10kg. Ini bukan efisiensi—ini dedikasi. Setiap profil dikembangkan selama berminggu-minggu sebelum sampai ke cangkirmu.",
    bullets: ["Batch di bawah 10kg dipanggang setiap minggu", "Sesi cupping terbuka untuk umum setiap Jumat", "Profil roast terdokumentasi sejak 2018"],
    img: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&w=1200&q=80",
    bg: "bg-cream",
    reverse: true,
  },
  {
    num: "03",
    title: "Komunitas",
    accent: "di Hati Kami.",
    body: "KOFFIE lebih dari sekadar kafe—ini tempat berkumpul. Dari pelanggan pagi yang punya kursi favorit hingga kreator malam yang bertahan sampai lampu redup. Semua punya tempat di meja kami.",
    bullets: ["Malam jazz & kreatif setiap bulan", "Workshop roasting mingguan untuk semua", "Showcase seniman lokal setiap kuartal"],
    img: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1200&q=80",
    bg: "bg-ivory",
    reverse: false,
  },
];

export function PhilosophySection() {
  return (
    <section id="cerita" className="bg-ivory">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 py-24">
        <SectionLabel>Filosofi Kami</SectionLabel>
        <div className="grid lg:grid-cols-2 gap-12 mt-4">
          <h2 className="font-display font-black text-4xl lg:text-6xl text-espresso leading-tight">
            Kerajinan di Balik Setiap{" "}
            <em className="not-italic italic font-display text-amber-brand">Cangkir</em>
          </h2>
          <div className="flex flex-col gap-5 lg:pt-6">
            <p className="font-accent italic text-espresso/70 text-xl leading-snug">
              &ldquo;Kami percaya kopi yang baik adalah percakapan antara petani, roaster, dan barista.&rdquo;
            </p>
            <p className="text-mutedbrown text-sm leading-relaxed">
              Setiap detail penting—dari ketinggian kebun sampai suhu cangkirmu. Ini bukan kopi cepat saji.
              Ini sebuah praktik.
            </p>
          </div>
        </div>
      </div>

      {blocks.map((b) => (
        <div key={b.num} className={`${b.bg}`}>
          <div className="max-w-[1400px] mx-auto px-6 lg:px-16 py-20 grid lg:grid-cols-2 gap-12 items-center">
            <div className={b.reverse ? "lg:order-2" : ""}>
              <img src={b.img} alt={b.title} loading="lazy" className="w-full aspect-[4/5] object-cover" />
            </div>
            <div className={`relative ${b.reverse ? "lg:order-1" : ""}`}>
              <span className="absolute -top-12 -left-2 font-display font-black text-[10rem] text-espresso/5 leading-none select-none">
                {b.num}
              </span>
              <div className="relative">
                <span className="font-display text-amber-brand/80 text-2xl block mb-4">{b.num}</span>
                <h3 className="font-display font-black text-4xl lg:text-5xl text-espresso leading-tight">
                  {b.title}{" "}
                  <em className="not-italic italic font-display text-amber-brand">{b.accent}</em>
                </h3>
                <p className="text-mutedbrown text-base leading-relaxed mt-6 max-w-lg">{b.body}</p>
                <ul className="mt-8 flex flex-col gap-3 max-w-lg">
                  {b.bullets.map((bl) => (
                    <li key={bl} className="flex gap-4 text-espresso text-sm">
                      <span className="text-amber-brand">—</span>
                      {bl}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
