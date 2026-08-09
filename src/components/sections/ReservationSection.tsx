import { SectionLabel } from "@/components/ui/SectionLabel";
import { ReservationForm } from "@/components/ui/ReservationForm";

export function ReservationSection() {
  return (
    <section id="reservasi" className="bg-espresso text-cream py-24 relative overflow-hidden">
      {/* Decorative Background Image */}
      <img
        src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1600&q=80"
        alt="KOFFIE Cafe Seating Area"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-espresso via-espresso/90 to-espresso" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Heading & Information */}
          <div className="lg:col-span-5 space-y-6">
            <SectionLabel>Reservasi Meja</SectionLabel>
            
            <h2 className="font-display font-black text-4xl lg:text-6xl text-cream leading-tight">
              Pesan Meja <br />
              <em className="not-italic italic font-display text-amber-brand">Favoritmu</em> Sekarang
            </h2>

            <p className="text-cream/70 text-sm leading-relaxed">
              Ingin mengadakan pertemuan bisnis, santai bersama teman, atau sekadar menikmati sore berkualitas? Amankan meja pilihanmu dengan mudah dan cepat.
            </p>

            <div className="bg-cream/5 border border-cream/10 rounded-2xl p-6 space-y-4">
              <h4 className="font-display font-bold text-amber-brand text-lg">Keuntungan Reservasi</h4>
              <ul className="space-y-2.5 text-xs text-cream/80">
                <li className="flex items-center gap-2">
                  <span className="text-amber-brand">✓</span> Kepastian tempat tanpa mengantre
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-brand">✓</span> Pilihan area duduk (Indoor AC / Outdoor Terrace)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-brand">✓</span> Layanan tambahan untuk ulang tahun & pertemuan
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-brand">✓</span> Konfirmasi instan via WhatsApp
                </li>
              </ul>
            </div>

            <div className="pt-2 text-xs text-cream/50">
              * Untuk pemesanan acara lebih dari 20 orang, silakan hubungi tim kami melalui fasilitas <a href="#acara" className="text-amber-brand hover:underline">Sewa Privat</a>.
            </div>
          </div>

          {/* Right Column: Embedded Reservation Form */}
          <div className="lg:col-span-7 bg-cream/5 border border-cream/15 rounded-3xl p-6 sm:p-8 backdrop-blur-sm shadow-2xl">
            <ReservationForm />
          </div>
        </div>
      </div>
    </section>
  );
}
