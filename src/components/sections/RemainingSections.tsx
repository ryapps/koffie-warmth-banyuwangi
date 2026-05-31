import { SectionLabel } from "@/components/ui/SectionLabel";
import { EventCard } from "@/components/ui/EventCard";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { BrandButton } from "@/components/ui/BrandButton";
import { events } from "@/data/events";
import { testimonials } from "@/data/testimonials";
import { config } from "@/data/config";
import { Star, MapPin, Phone, Mail } from "lucide-react";

export function EventsSection() {
  return (
    <section id="jurnal" className="bg-ivory py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        <SectionLabel>Jurnal Komunitas</SectionLabel>
        <div className="grid lg:grid-cols-2 gap-8 mt-3 items-end">
          <h2 className="font-display font-black text-4xl lg:text-6xl text-espresso leading-tight">
            Hidup di{" "}
            <em className="not-italic italic font-display text-amber-brand">KOFFIE</em>
          </h2>
          <p className="text-mutedbrown text-sm">
            Ikuti keseharian kami di{" "}
            <a href="#" className="text-amber-brand font-medium">{config.contact.instagram}</a>
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {events.map((e) => <EventCard key={e.id} event={e} />)}
        </div>
      </div>
    </section>
  );
}

export function PrivateHireSection() {
  const features = [
    "Kapasitas hingga 60 tamu, buyout penuh tersedia",
    "Menu katering khusus dari tim dapur kami",
    "Peralatan AV & playlist pilihan sudah termasuk",
    "Koordinator acara khusus dari awal sampai selesai",
    "Tambahan workshop kopi untuk acara tim",
  ];
  return (
    <section id="acara" className="bg-espresso text-cream py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionLabel>Sewa Privat</SectionLabel>
          <h2 className="font-display font-black text-4xl lg:text-6xl leading-tight mt-3">
            Rayakan Momen{" "}
            <em className="not-italic italic font-display text-amber-brand">Spesial</em>mu{" "}
            di KOFFIE
          </h2>
          <p className="font-accent italic text-amber-brand text-lg mt-5">
            &ldquo;Dari brunch intim sampai brand launch—kami siapkan suasananya.&rdquo;
          </p>
          <p className="text-cream/70 mt-3 max-w-lg">
            Ruangan ini milikmu. Kami yang urus kopi, setup, dan suasananya. Kamu cukup bawa orang-orangmu.
          </p>
          <ul className="mt-8 flex flex-col gap-3">
            {features.map((f) => (
              <li key={f} className="flex gap-4 text-cream/90 text-sm">
                <span className="text-amber-brand">—</span>{f}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <BrandButton variant="outlined">Tanyakan Acaramu →</BrandButton>
          </div>
        </div>
        <div className="relative h-[500px]">
          <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80" alt="Acara privat" className="absolute top-0 left-0 w-2/3 h-72 object-cover shadow-2xl" />
          <img src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=900&q=80" alt="Workshop kopi" className="absolute bottom-0 right-0 w-2/3 h-80 object-cover shadow-2xl" />
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="bg-ivory py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        <SectionLabel>Cerita Tamu</SectionLabel>
        <div className="grid lg:grid-cols-2 gap-6 items-end mt-3">
          <h2 className="font-display font-black text-4xl lg:text-6xl text-espresso leading-tight">
            Kata Para{" "}
            <em className="not-italic italic font-display text-amber-brand">Pelanggan</em> Kami
          </h2>
          <div className="flex items-center gap-2 lg:justify-end">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-brand text-amber-brand" />
            ))}
            <span className="font-display font-bold text-espresso ml-2">4.9</span>
            <span className="text-mutedbrown text-sm">· 847 Ulasan Google</span>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} dark={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function FindUsSection() {
  return (
    <section id="lokasi" className="bg-cream py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        <SectionLabel>Datanglah Berkunjung</SectionLabel>
        <h2 className="font-display font-black text-4xl lg:text-6xl text-espresso leading-tight mt-3">
          Temukan Jalanmu ke{" "}
          <em className="not-italic italic font-display text-amber-brand">KOFFIE</em>
        </h2>

        <div className="grid lg:grid-cols-2 gap-10 mt-12">
          <div className="aspect-[4/3] border-2 border-amber-brand/40 overflow-hidden">
            <iframe
              title="Lokasi KOFFIE Banyuwangi"
              src="https://www.google.com/maps?q=Banyuwangi,Jawa+Timur&output=embed"
              className="w-full h-full"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <div className="text-xs tracking-[0.25em] text-mutedbrown uppercase">Alamat</div>
              <div className="font-display text-2xl lg:text-3xl text-espresso mt-2 leading-snug">
                {config.contact.address}
              </div>
              <a href="#" className="inline-flex items-center gap-2 text-amber-brand text-xs tracking-widest uppercase mt-3">
                <MapPin className="w-4 h-4" /> Petunjuk Arah →
              </a>
            </div>
            <hr className="border-espresso/10" />
            <div>
              <div className="text-xs tracking-[0.25em] text-mutedbrown uppercase mb-3">Jam Buka</div>
              {config.hours.map((h) => (
                <div key={h.day} className="flex justify-between py-2 border-b border-espresso/10 text-espresso">
                  <span>{h.day}</span>
                  <span className="text-mutedbrown">{h.time}</span>
                </div>
              ))}
            </div>
            <div>
              <div className="text-xs tracking-[0.25em] text-mutedbrown uppercase mb-3">Kontak</div>
              <div className="flex flex-col gap-2 text-espresso text-sm">
                <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-amber-brand" /> {config.contact.phone}</span>
                <span className="flex items-center gap-2"><Mail className="w-4 h-4 text-amber-brand" /> {config.contact.email}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <BrandButton variant="dark">Pesan Meja</BrandButton>
              <BrandButton variant="outlined" className="!text-espresso !border-espresso hover:!bg-espresso hover:!text-cream">
                WhatsApp Kami
              </BrandButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function NewsletterSection() {
  return (
    <section className="bg-amber-brand py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <span className="font-accent italic text-espresso/80 text-base">Tetap Terhubung</span>
          <h2 className="font-display font-black text-4xl lg:text-6xl text-espresso leading-tight mt-2">
            Tanda Tangan Buku Tamu.
          </h2>
          <p className="font-accent italic text-espresso/80 text-lg mt-4">
            &ldquo;Surat bulanan dari dapur kami—tanpa noise, hanya kehangatan.&rdquo;
          </p>
          <p className="text-espresso/70 mt-3 max-w-md">
            Menu musiman, acara mendatang, dan cerita dari balik meja barista.
          </p>
        </div>
        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col sm:flex-row gap-3 border-b-2 border-espresso pb-3">
            <input
              type="email"
              required
              placeholder="Alamat emailmu"
              className="flex-1 bg-transparent text-espresso placeholder:text-espresso/50 outline-none py-2"
            />
            <BrandButton type="submit" variant="dark">Gabung Sekarang</BrandButton>
          </div>
          <p className="text-espresso/50 italic text-xs">Tanpa spam. Berhenti berlangganan kapan saja.</p>
        </form>
      </div>
    </section>
  );
}
