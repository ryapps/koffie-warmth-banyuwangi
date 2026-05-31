import { Camera, Share2, MapPin, Phone, Mail } from "lucide-react";
import { config } from "@/data/config";

const explore = ["Cerita Kami", "Menu", "Ruang Kami", "Jurnal", "Acara", "Kartu Hadiah"];
const info = ["Keberlanjutan", "Karier", "Pers", "Grosir", "Kebijakan Privasi"];

export function Footer() {
  return (
    <footer className="bg-espresso text-cream pt-16 pb-8 border-t border-amber-brand/40">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-display font-bold text-2xl">KOFFIE</span>
            <span className="font-accent italic text-amber-brand">café</span>
          </div>
          <p className="text-cream/60 text-sm mt-4 max-w-xs leading-relaxed">
            {config.brand.tagline}
          </p>
          <div className="flex gap-3 mt-6">
            {[Camera, Share2].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Sosial"
                className="w-10 h-10 border border-cream/20 flex items-center justify-center hover:border-amber-brand hover:text-amber-brand transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[11px] tracking-[0.25em] text-amber-brand mb-5 font-body">JELAJAHI</h4>
          <ul className="space-y-3 text-sm text-cream/70">
            {explore.map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-cream transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] tracking-[0.25em] text-amber-brand mb-5 font-body">INFO</h4>
          <ul className="space-y-3 text-sm text-cream/70">
            {info.map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-cream transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] tracking-[0.25em] text-amber-brand mb-5 font-body">KONTAK</h4>
          <ul className="space-y-3 text-sm text-cream/70">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-brand mt-0.5 shrink-0" />
              {config.contact.address}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-brand" />
              {config.contact.phone}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-brand" />
              {config.contact.email}
            </li>
            <li>
              <a href="#" className="text-amber-brand hover:underline">
                WhatsApp: {config.contact.whatsapp}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mt-14 pt-6 border-t border-cream/10 flex flex-col md:flex-row justify-between gap-3 text-xs">
        <span className="text-cream/50">© 2026 KOFFIE Café. Semua hak dilindungi.</span>
        <span className="font-accent italic text-amber-brand">
          Dibuat dengan cinta di Banyuwangi.
        </span>
      </div>
    </footer>
  );
}
