import { Reservation } from "@/types";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useReservationsStore } from "../../store/useReservationsStore";

interface ReservationFormProps {
  isOpen: boolean;
  onClose: () => void;
  reservation?: Reservation;
}

const statuses = ["pending", "confirmed", "cancelled"];
const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Terjadi kesalahan";

export const ReservationForm = ({ isOpen, onClose, reservation }: ReservationFormProps) => {
  const { addItem, updateItem } = useReservationsStore();
  const [formData, setFormData] = useState<Partial<Reservation>>({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: 1,
    notes: "",
    status: "pending",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (reservation) {
      setFormData(reservation);
    } else {
      setFormData({
        name: "",
        phone: "",
        date: "",
        time: "",
        guests: 1,
        notes: "",
        status: "pending",
      });
    }
  }, [reservation, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date || !formData.time) {
      toast.error("Nama, No. HP, tanggal, dan jam harus diisi");
      return;
    }

    setIsLoading(true);
    try {
      if (reservation?.id) {
        await updateItem(reservation.id, formData as Reservation);
        toast.success("Reservasi berhasil diperbarui");
      } else {
        await addItem({
          name: formData.name || "",
          phone: formData.phone || "",
          date: formData.date || "",
          time: formData.time || "",
          guests: formData.guests || 1,
          notes: formData.notes || "",
          status: (formData.status || "pending") as "pending" | "confirmed" | "cancelled",
        });
        toast.success("Reservasi berhasil ditambahkan");
      }
      onClose();
    } catch (error) {
      toast.error(getErrorMessage(error));
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 sm:p-6">
      <div className="bg-white rounded-lg w-full max-w-md shadow-lg max-h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E8DFD0] shrink-0">
          <h3 className="text-xl font-display font-bold text-charcoal">
            {reservation ? "Edit Reservasi" : "Tambah Reservasi Manual"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Nama *</label>
            <Input
              value={formData.name || ""}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Nama pemesan"
              className="border-[#E8DFD0]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">No. HP *</label>
            <Input
              value={formData.phone || ""}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="081234567890"
              className="border-[#E8DFD0]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Tanggal *</label>
              <Input
                type="date"
                value={formData.date || ""}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="border-[#E8DFD0]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Jam *</label>
              <Input
                type="time"
                value={formData.time || ""}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="border-[#E8DFD0]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Jumlah Tamu *</label>
            <Input
              type="number"
              min="1"
              value={formData.guests }
              onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
              className="border-[#E8DFD0]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Catatan</label>
            <textarea
              value={formData.notes || ""}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Permintaan khusus, alergi, dll."
              className="w-full px-3 py-2 border border-[#E8DFD0] rounded-md text-charcoal"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Status *</label>
            <select
              value={formData.status || "pending"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as "pending" | "confirmed" | "cancelled",
                })
              }
              className="w-full px-3 py-2 border border-[#E8DFD0] rounded-md text-charcoal"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === "pending"
                    ? "Tertunda"
                    : status === "confirmed"
                      ? "Dikonfirmasi"
                      : "Dibatalkan"}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-2 justify-end pt-4 border-t border-[#E8DFD0]">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Batal
            </Button>
            <Button
              type="submit"
              className="bg-amber-600 text-white hover:bg-amber-700"
              disabled={isLoading}
            >
              {isLoading ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
