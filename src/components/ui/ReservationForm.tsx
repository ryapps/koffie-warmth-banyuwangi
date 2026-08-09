import React, { useState } from "react";
import { Calendar as CalendarIcon, Clock, Users, User, Phone, Mail, MessageSquare, CheckCircle2, MapPin } from "lucide-react";
import { toast } from "sonner";
import { useReservationsStore } from "@/store/useReservationsStore";
import { config } from "@/data/config";

interface ReservationFormProps {
  onSuccess?: () => void;
  isModal?: boolean;
}

const TIME_SLOTS = [
  "10:00", "11:30", "13:00", "14:30", 
  "16:00", "17:30", "19:00", "20:30", "21:30"
];

const AREA_OPTIONS = [
  { id: "Indoor AC", label: "Indoor AC (No Smoking)", icon: "❄️" },
  { id: "Semi Outdoor", label: "Semi Outdoor Lounge", icon: "🍃" },
  { id: "Outdoor Terrace", label: "Outdoor Garden Terrace", icon: "☕" },
  { id: "Private Meeting", label: "Private Meeting Space", icon: "🚪" },
];

export function ReservationForm({ onSuccess, isModal = false }: ReservationFormProps) {
  const addItem = useReservationsStore((state) => state.addItem);
  
  const todayStr = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: todayStr,
    time: "19:00",
    guests: 2,
    area: "Indoor AC",
    specialRequest: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<typeof formData | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Silakan masukkan nama lengkap Anda");
      return;
    }
    if (!formData.phone.trim()) {
      toast.error("Silakan masukkan nomor WhatsApp/Telepon aktif");
      return;
    }
    if (!formData.date) {
      toast.error("Silakan pilih tanggal kedatangan");
      return;
    }

    setIsSubmitting(true);

    try {
      const specialReqCombined = [
        `Area: ${formData.area}`,
        formData.specialRequest.trim() ? `Request: ${formData.specialRequest.trim()}` : "",
      ]
        .filter(Boolean)
        .join(" | ");

      await addItem({
        name: formData.name.trim(),
        email: formData.email.trim() || undefined,
        phone: formData.phone.trim(),
        date: formData.date,
        time: formData.time,
        guests: formData.guests,
        specialRequest: specialReqCombined,
        status: "pending",
      });

      toast.success("Reservasi meja berhasil diajukan! Tim kami akan mengonfirmasi.");
      setSubmittedData({ ...formData });
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal mengirim reservasi";
      toast.error("Terjadi kesalahan: " + msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateWhatsAppUrl = () => {
    if (!submittedData) return "#";
    const cleanPhone = config.contact.whatsapp.replace(/[^0-9]/g, "");
    const text = `Halo KOFFIE Café! Saya ingin mengonfirmasi pemesanan meja saya:
📌 Nama: ${submittedData.name}
📱 No. Telp: ${submittedData.phone}
📅 Tanggal: ${submittedData.date}
⏰ Jam: ${submittedData.time} WIB
👥 Jumlah: ${submittedData.guests} Orang
📍 Area: ${submittedData.area}
${submittedData.specialRequest ? `💬 Catatan: ${submittedData.specialRequest}` : ""}

Mohon bantuan konfirmasinya. Terima kasih!`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  if (submittedData) {
    return (
      <div className="bg-espresso text-cream p-6 lg:p-8 rounded-2xl border border-amber-brand/30 shadow-2xl text-center space-y-6">
        <div className="w-16 h-16 bg-amber-brand/20 text-amber-brand rounded-full flex items-center justify-center mx-auto border border-amber-brand/40">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-amber-brand font-semibold">
            Reservasi Terkirim
          </span>
          <h3 className="font-display font-bold text-2xl lg:text-3xl text-cream mt-1">
            Terima Kasih, {submittedData.name}!
          </h3>
          <p className="text-cream/70 text-sm mt-2 max-w-md mx-auto">
            Pemesanan meja Anda untuk <strong className="text-cream">{submittedData.guests} orang</strong> pada tanggal{" "}
            <strong className="text-cream">{submittedData.date}</strong> jam{" "}
            <strong className="text-cream">{submittedData.time} WIB</strong> telah kami terima (Status: <span className="text-amber-brand font-medium">Pending</span>).
          </p>
        </div>

        <div className="bg-cream/5 rounded-xl p-4 border border-cream/10 text-left text-xs space-y-2 max-w-md mx-auto">
          <div className="flex justify-between border-b border-cream/10 pb-2">
            <span className="text-cream/60">Nama Pemesan</span>
            <span className="font-semibold text-cream">{submittedData.name}</span>
          </div>
          <div className="flex justify-between border-b border-cream/10 pb-2">
            <span className="text-cream/60">No. WhatsApp</span>
            <span className="font-semibold text-cream">{submittedData.phone}</span>
          </div>
          <div className="flex justify-between border-b border-cream/10 pb-2">
            <span className="text-cream/60">Pilihan Area</span>
            <span className="font-semibold text-amber-brand">{submittedData.area}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-cream/60">Tanggal & Jam</span>
            <span className="font-semibold text-cream">{submittedData.date} @ {submittedData.time}</span>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <a
            href={generateWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg hover:shadow-emerald-950/50"
          >
            💬 Konfirmasi Cepat via WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setSubmittedData(null)}
            className="text-xs text-cream/50 hover:text-cream underline transition-colors"
          >
            Buat Reservasi Baru
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-left">
      {/* Name & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-cream/80 mb-1.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-amber-brand" /> Nama Lengkap *
          </label>
          <input
            type="text"
            required
            placeholder="Contoh: Rendra Wijaya"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-cream/5 border border-cream/20 rounded-xl px-4 py-3 text-sm text-cream placeholder-cream/40 focus:outline-none focus:border-amber-brand focus:ring-1 focus:ring-amber-brand transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-cream/80 mb-1.5 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-amber-brand" /> No. WhatsApp *
          </label>
          <input
            type="tel"
            required
            placeholder="Contoh: 081234567890"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full bg-cream/5 border border-cream/20 rounded-xl px-4 py-3 text-sm text-cream placeholder-cream/40 focus:outline-none focus:border-amber-brand focus:ring-1 focus:ring-amber-brand transition-all"
          />
        </div>
      </div>

      {/* Date & Guest Count */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-cream/80 mb-1.5 flex items-center gap-1.5">
            <CalendarIcon className="w-3.5 h-3.5 text-amber-brand" /> Tanggal Reservasi *
          </label>
          <input
            type="date"
            required
            min={todayStr}
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full bg-cream/5 border border-cream/20 rounded-xl px-4 py-3 text-sm text-cream focus:outline-none focus:border-amber-brand focus:ring-1 focus:ring-amber-brand transition-all [color-scheme:dark]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-cream/80 mb-1.5 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-amber-brand" /> Jumlah Tamu *
          </label>
          <div className="flex items-center bg-cream/5 border border-cream/20 rounded-xl p-1.5 justify-between">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, guests: Math.max(1, formData.guests - 1) })}
              className="w-9 h-9 rounded-lg bg-cream/10 hover:bg-amber-brand hover:text-espresso text-cream font-bold transition-all flex items-center justify-center text-lg"
            >
              -
            </button>
            <span className="font-display font-bold text-cream text-base">
              {formData.guests} <span className="text-xs font-normal text-cream/70">Orang</span>
            </span>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, guests: Math.min(20, formData.guests + 1) })}
              className="w-9 h-9 rounded-lg bg-cream/10 hover:bg-amber-brand hover:text-espresso text-cream font-bold transition-all flex items-center justify-center text-lg"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Time Slots */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-cream/80 mb-2 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-amber-brand" /> Jam Kedatangan *
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {TIME_SLOTS.map((slot) => {
            const isSelected = formData.time === slot;
            return (
              <button
                key={slot}
                type="button"
                onClick={() => setFormData({ ...formData, time: slot })}
                className={`py-2 px-3 text-xs rounded-xl font-mono font-medium transition-all ${
                  isSelected
                    ? "bg-amber-brand text-espresso font-bold shadow-md shadow-amber-brand/20 border border-amber-brand"
                    : "bg-cream/5 text-cream/80 border border-cream/10 hover:bg-cream/15 hover:text-cream"
                }`}
              >
                {slot}
              </button>
            );
          })}
        </div>
      </div>

      {/* Area Selector */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-cream/80 mb-2 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-amber-brand" /> Pilihan Area Meja
        </label>
        <div className="grid grid-cols-2 gap-2">
          {AREA_OPTIONS.map((area) => {
            const isSelected = formData.area === area.id;
            return (
              <button
                key={area.id}
                type="button"
                onClick={() => setFormData({ ...formData, area: area.id })}
                className={`p-3 text-left rounded-xl border text-xs transition-all flex items-center gap-2.5 ${
                  isSelected
                    ? "bg-amber-brand/15 border-amber-brand text-amber-brand font-semibold"
                    : "bg-cream/5 border-cream/10 text-cream/70 hover:bg-cream/10 hover:text-cream"
                }`}
              >
                <span className="text-base">{area.icon}</span>
                <span>{area.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Special Request */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-cream/80 mb-1.5 flex items-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5 text-amber-brand" /> Catatan Khusus (Opsional)
        </label>
        <textarea
          rows={2}
          placeholder="Contoh: Butuh baby chair, acara ulang tahun, dekat stopkontak..."
          value={formData.specialRequest}
          onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
          className="w-full bg-cream/5 border border-cream/20 rounded-xl px-4 py-2.5 text-sm text-cream placeholder-cream/40 focus:outline-none focus:border-amber-brand focus:ring-1 focus:ring-amber-brand transition-all resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 px-6 bg-amber-brand text-espresso font-display font-bold text-sm tracking-wider uppercase rounded-xl hover:bg-amber-brand/90 transition-all shadow-lg shadow-amber-brand/15 hover:shadow-amber-brand/30 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <span>Memproses Reservasi...</span>
        ) : (
          <span>Konfirmasi & Pesan Meja Sekarang →</span>
        )}
      </button>
    </form>
  );
}
