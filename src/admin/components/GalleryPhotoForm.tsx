import { GalleryPhoto } from "@/types";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useGalleryStore } from "../../store/useGalleryStore";
import { ImageUploader } from "./ImageUploader";

interface GalleryPhotoFormProps {
  isOpen: boolean;
  onClose: () => void;
  photo?: GalleryPhoto;
}

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Terjadi kesalahan";

export const GalleryPhotoForm = ({ isOpen, onClose, photo }: GalleryPhotoFormProps) => {
  const { addItem, updateItem } = useGalleryStore();
  const [formData, setFormData] = useState<Partial<GalleryPhoto>>({
    url: "",
    caption: "",
    isActive: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (photo) {
      setFormData(photo);
    } else {
      setFormData({
        url: "",
        caption: "",
        isActive: true,
      });
    }
  }, [photo, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.url) {
      toast.error("Foto harus diunggah");
      return;
    }

    setIsLoading(true);
    try {
      if (photo?.id) {
        await updateItem(photo.id, formData as GalleryPhoto);
        toast.success("Foto berhasil diperbarui");
      } else {
        await addItem({
          url: formData.url || "",
          caption: formData.caption || "",
          isActive: formData.isActive ?? true,
          order: 0,
        });
        toast.success("Foto berhasil ditambahkan");
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
            {photo ? "Edit Foto" : "Upload Foto Baru"}
          </h3>
          <button type="button" onClick={onClose} className="p-1 hover:bg-gray-100 rounded transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          <div>
            <ImageUploader
              label="Foto Galeri *"
              currentImage={formData.url || undefined}
              onImageSelect={(file, preview) => setFormData({ ...formData, url: preview })}
              onImageClear={() => setFormData({ ...formData, url: "" })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Keterangan</label>
            <Input
              value={formData.caption || ""}
              onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
              placeholder="Mis: Interior Kafe, Setup Bar, Barista di Aksi"
              className="border-[#E8DFD0]"
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
              Tampilkan di galeri
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
