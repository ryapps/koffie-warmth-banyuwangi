import { X, Utensils } from "lucide-react";
import { useReservationModalStore } from "@/store/useReservationModalStore";
import { ReservationForm } from "./ReservationForm";
import { useEffect } from "react";

export function ReservationModal() {
  const { isOpen, closeModal } = useReservationModalStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-espresso/80 backdrop-blur-md transition-opacity"
        onClick={closeModal}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-espresso border border-cream/20 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 my-auto text-cream max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-cream/10 mb-6">
          <div>
            <div className="flex items-center gap-2 text-amber-brand text-xs font-semibold uppercase tracking-[0.2em]">
              <Utensils className="w-4 h-4" /> KOFFIE Table Booking
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-cream mt-1">
              Pesan Meja Anda
            </h2>
            <p className="text-xs text-cream/70 mt-1">
              Nikmati kopi & suasana hangat tanpa perlu mengantre.
            </p>
          </div>
          <button
            onClick={closeModal}
            className="p-2 rounded-full bg-cream/10 hover:bg-cream/20 text-cream/70 hover:text-cream transition-colors"
            aria-label="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <ReservationForm onSuccess={() => {}} isModal />
      </div>
    </div>
  );
}
