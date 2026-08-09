import { Event } from "@/types";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useEventsStore } from "../../store/useEventsStore";
import { ImageUploader } from "./ImageUploader";

interface EventFormProps {
  isOpen: boolean;
  onClose: () => void;
  event?: Event;
}

const eventTypes = ["mendatang", "workshop", "gratis", "rutin"];
const eventStatuses = ["aktif", "draft", "selesai"];

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Terjadi kesalahan";

export const EventForm = ({ isOpen, onClose, event }: EventFormProps) => {
  const { addItem, updateItem } = useEventsStore();
  const [formData, setFormData] = useState<Partial<Event>>({
    type: "mendatang",
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    status: "aktif",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (event) {
      setFormData(event);
    } else {
      setFormData({
        type: "mendatang",
        title: "",
        description: "",
        date: "",
        startTime: "",
        endTime: "",
        status: "aktif",
      });
    }
  }, [event, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.startTime) {
      toast.error("Judul, tanggal, dan waktu mulai harus diisi");
      return;
    }

    setIsLoading(true);
    try {
      if (event?.id) {
        await updateItem(event.id, {
          ...formData,
          isPublished: formData.status !== "draft",
        } as Partial<Event>);
        toast.success("Acara berhasil diperbarui");
      } else {
        await addItem({
          type: (formData.type || "mendatang") as "mendatang" | "workshop" | "gratis" | "rutin",
          title: formData.title || "",
          description: formData.description || "",
          date: formData.date || "",
          startTime: formData.startTime || "",
          endTime: formData.endTime,
          cta: formData.cta || "RSVP",
          ctaLink: formData.ctaLink || "#",
          image: formData.image || "",
          status: (formData.status || "aktif") as "aktif" | "draft" | "selesai",
          isPublished: (formData.status || "aktif") !== "draft",
        });
        toast.success("Acara berhasil ditambahkan");
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
            {event ? "Edit Acara" : "Buat Acara Baru"}
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
            <label className="block text-sm font-medium text-charcoal mb-1">Jenis Acara *</label>
            <select
              value={formData.type || "mendatang"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  type: e.target.value as "mendatang" | "workshop" | "gratis" | "rutin",
                })
              }
              className="w-full px-3 py-2 border border-[#E8DFD0] rounded-md text-charcoal"
            >
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Judul Acara *</label>
            <Input
              value={formData.title || ""}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Judul acara"
              className="border-[#E8DFD0]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Deskripsi *</label>
            <textarea
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Deskripsi acara"
              className="w-full px-3 py-2 border border-[#E8DFD0] rounded-md text-charcoal"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Tanggal *</label>
            <Input
              type="date"
              value={formData.date || ""}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="border-[#E8DFD0]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Waktu Mulai *</label>
              <Input
                type="time"
                value={formData.startTime || ""}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="border-[#E8DFD0]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Waktu Selesai</label>
              <Input
                type="time"
                value={formData.endTime || ""}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="border-[#E8DFD0]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Status *</label>
            <select
              value={formData.status || "aktif"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as "aktif" | "draft" | "selesai",
                })
              }
              className="w-full px-3 py-2 border border-[#E8DFD0] rounded-md text-charcoal"
            >
              {eventStatuses.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <ImageUploader
              label="Gambar Acara"
              currentImage={formData.image || undefined}
              onImageSelect={(file, preview) => setFormData({ ...formData, image: preview })}
              onImageClear={() => setFormData({ ...formData, image: "" })}
            />
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
