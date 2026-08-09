import { MenuItem } from "@/types";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useMenuStore } from "../../store/useMenuStore";
import { ImageUploader } from "./ImageUploader";

interface MenuItemFormProps {
  isOpen: boolean;
  onClose: () => void;
  item?: MenuItem;
}

const categories = ["kopi", "sarapan", "malam", "pastri"];
const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Terjadi kesalahan";

export const MenuItemForm = ({ isOpen, onClose, item }: MenuItemFormProps) => {
  const { addItem, updateItem } = useMenuStore();
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: "",
    category: "kopi",
    price: 0,
    description: "",
    badge: undefined,
    image: "",
    isActive: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData({
        name: "",
        category: "kopi",
        price: 0,
        description: "",
        badge: undefined,
        image: "",
        isActive: true,
      });
    }
  }, [item, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      toast.error("Nama dan harga harus diisi");
      return;
    }

    setIsLoading(true);
    try {
      if (item?.id) {
        await updateItem(item.id, formData as MenuItem);
        toast.success("Menu berhasil diperbarui");
      } else {
        await addItem({
          name: formData.name || "",
          category: (formData.category || "kopi") as "kopi" | "sarapan" | "malam" | "pastri",
          price: formData.price || 0,
          description: formData.description || "",
          badge: formData.badge,
          image: formData.image || "",
          isActive: formData.isActive ?? true,
          order: 0,
        });
        toast.success("Menu berhasil ditambahkan");
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
            {item ? "Edit Menu Item" : "Tambah Menu Item"}
          </h3>
          <button type="button" onClick={onClose} className="p-1 hover:bg-gray-100 rounded transition-colors">
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
              placeholder="Nama menu item"
              className="border-[#E8DFD0]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Kategori *</label>
            <select
              value={formData.category || "kopi"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value as "kopi" | "sarapan" | "malam" | "pastri",
                })
              }
              className="w-full px-3 py-2 border border-[#E8DFD0] rounded-md text-charcoal"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Harga (Rp) *</label>
            <Input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
              placeholder="0"
              className="border-[#E8DFD0]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Deskripsi</label>
            <textarea
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Deskripsi menu item"
              className="w-full px-3 py-2 border border-[#E8DFD0] rounded-md text-charcoal"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Badge</label>
            <select
              value={formData.badge || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  badge: (e.target.value || undefined) as
                    | "favorit"
                    | "single-origin"
                    | "musiman"
                    | undefined,
                })
              }
              className="w-full px-3 py-2 border border-[#E8DFD0] rounded-md text-charcoal"
            >
              <option value="">Tidak ada badge</option>
              <option value="favorit">Favorit</option>
              <option value="single-origin">Single Origin</option>
              <option value="musiman">Musiman</option>
            </select>
          </div>

          <div>
            <ImageUploader
              label="Foto Menu"
              currentImage={formData.image || undefined}
              onImageSelect={(file, preview) => setFormData({ ...formData, image: preview })}
              onImageClear={() => setFormData({ ...formData, image: "" })}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive ?? true}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="rounded"
            />
            <label htmlFor="isActive" className="text-sm text-charcoal">
              Tampilkan di website
            </label>
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
