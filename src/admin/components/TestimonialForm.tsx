import { Testimonial } from "@/types";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useTestimonialsStore } from "../../store/useTestimonialsStore";

interface TestimonialFormProps {
  isOpen: boolean;
  onClose: () => void;
  testimonial?: Testimonial;
}

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Terjadi kesalahan";

export const TestimonialForm = ({ isOpen, onClose, testimonial }: TestimonialFormProps) => {
  const { addItem, updateItem } = useTestimonialsStore();
  const [formData, setFormData] = useState<Partial<Testimonial>>({
    name: "",
    role: "",
    quote: "",
    stars: 5,
    status: "pending",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (testimonial) {
      setFormData(testimonial);
    } else {
      setFormData({
        name: "",
        role: "",
        quote: "",
        stars: 5,
        status: "pending",
      });
    }
  }, [testimonial, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.quote) {
      toast.error("Nama dan kutipan harus diisi");
      return;
    }

    setIsLoading(true);
    try {
      if (testimonial?.id) {
        await updateItem(testimonial.id, formData as Testimonial);
        toast.success("Ulasan berhasil diperbarui");
      } else {
        await addItem({
          name: formData.name || "",
          role: formData.role || "",
          quote: formData.quote || "",
          stars: formData.stars || 5,
          status: (formData.status || "pending") as "pending" | "published" | "hidden",
          order: 0,
        });
        toast.success("Ulasan berhasil ditambahkan");
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
            {testimonial ? "Edit Ulasan" : "Tambah Ulasan"}
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
              placeholder="Nama pelanggan"
              className="border-[#E8DFD0]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Peran/Profesi</label>
            <Input
              value={formData.role || ""}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="Mis: Freelancer, Penulis, Pelanggan Setia"
              className="border-[#E8DFD0]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Kutipan *</label>
            <textarea
              value={formData.quote || ""}
              onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
              placeholder="Ulasan pelanggan"
              className="w-full px-3 py-2 border border-[#E8DFD0] rounded-md text-charcoal"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">
              Rating (Bintang) *
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, stars: star })}
                  className={`px-4 py-2 rounded border ${
                    formData.stars === star
                      ? "bg-amber-500 text-white border-amber-500"
                      : "bg-gray-100 text-charcoal border-gray-200"
                  }`}
                >
                  {star}★
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Status *</label>
            <select
              value={formData.status || "pending"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as "pending" | "published" | "hidden",
                })
              }
              className="w-full px-3 py-2 border border-[#E8DFD0] rounded-md text-charcoal"
            >
              <option value="pending">Tertunda</option>
              <option value="published">Dipublikasikan</option>
              <option value="hidden">Tersembunyi</option>
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
