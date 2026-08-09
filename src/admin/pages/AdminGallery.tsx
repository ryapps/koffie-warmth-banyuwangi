import { Edit2, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "../../components/ui/button";
import { useGalleryStore } from "../../store/useGalleryStore";
import { GalleryPhoto } from "../../types";
import { AdminLayout } from "../components/AdminLayout";
import { ConfirmModal } from "../components/ConfirmModal";
import { GalleryPhotoForm } from "../components/GalleryPhotoForm";

export const AdminGallery = () => {
  const { items, isLoading, loadItems, deleteItem } = useGalleryStore();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [editingPhoto, setEditingPhoto] = useState<GalleryPhoto | undefined>();
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    loadItems().catch((error) => {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Gagal memuat galeri");
    });
  }, [loadItems]);

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
      setDeleteConfirm(null);
      toast.success("Foto berhasil dihapus");
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Gagal menghapus foto");
    }
  };

  const handleEdit = (photo: GalleryPhoto) => {
    setEditingPhoto(photo);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setEditingPhoto(undefined);
    setIsFormOpen(true);
  };

  return (
    <AdminLayout title="Galeri Foto">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-display font-bold text-charcoal">Galeri Foto</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {items.filter((p) => p.isActive).length} foto aktif
            </p>
          </div>
          <Button onClick={handleAddNew} className="bg-amber-600 text-white hover:bg-amber-700">
            <Plus className="h-4 w-4 mr-2" />
            Upload Foto
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((photo) => (
            <div
              key={photo.id}
              className="relative group bg-gray-100 rounded-lg overflow-hidden aspect-square"
            >
              {photo.url && (
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                />
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => handleEdit(photo)}
                  className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                  title="Edit"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setDeleteConfirm(photo.id!)}
                  className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                  title="Hapus"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {isLoading && (
          <div className="text-center py-12 text-muted-foreground">
            <p>Memuat galeri...</p>
          </div>
        )}

        {!isLoading && items.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>Tidak ada foto. Upload foto baru untuk memulai.</p>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <ConfirmModal
          isOpen={!!deleteConfirm}
          title="Hapus Foto"
          description="Tindakan ini tidak bisa dibatalkan. Apakah Anda yakin?"
          confirmText="Ya, Hapus"
          cancelText="Batal"
          isDangerous
          onConfirm={() => handleDelete(deleteConfirm!)}
          onCancel={() => setDeleteConfirm(null)}
        />

        {/* Gallery Photo Form Modal */}
        <GalleryPhotoForm
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingPhoto(undefined);
          }}
          photo={editingPhoto}
        />
      </div>
    </AdminLayout>
  );
};
