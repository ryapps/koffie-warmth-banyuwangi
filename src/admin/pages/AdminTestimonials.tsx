import { Edit2, Plus, Star, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "../../components/ui/button";
import { useTestimonialsStore } from "../../store/useTestimonialsStore";
import { Testimonial } from "../../types";
import { AdminLayout } from "../components/AdminLayout";
import { ConfirmModal } from "../components/ConfirmModal";
import { TestimonialForm } from "../components/TestimonialForm";

export const AdminTestimonials = () => {
  const { items, isLoading, loadItems, deleteItem, publishItem } = useTestimonialsStore();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | undefined>();
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    loadItems().catch((error) => {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Gagal memuat ulasan");
    });
  }, [loadItems]);

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
      setDeleteConfirm(null);
      toast.success("Ulasan berhasil dihapus");
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Gagal menghapus ulasan");
    }
  };

  const handlePublish = async (id: string) => {
    try {
      await publishItem(id);
      toast.success("Ulasan berhasil dipublikasikan");
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Gagal mempublikasikan ulasan");
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setEditingTestimonial(undefined);
    setIsFormOpen(true);
  };

  return (
    <AdminLayout title="Ulasan Tamu">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-display font-bold text-charcoal">Ulasan Tamu</h2>
          <Button onClick={handleAddNew} className="bg-amber-600 text-white hover:bg-amber-700">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Ulasan
          </Button>
        </div>

        <div className="space-y-4">
          {items.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-lg border border-[#E8DFD0] p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-charcoal">{testimonial.name}</h3>
                    <div className="flex gap-0.5">
                      {Array.from({ length: testimonial.stars || 0 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  {testimonial.role && (
                    <p className="text-xs text-muted-foreground mt-1">{testimonial.role}</p>
                  )}
                  <p className="text-sm text-charcoal mt-3 italic">"{testimonial.quote}"</p>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap ${
                      testimonial.status === "published"
                        ? "bg-green-100 text-green-800"
                        : testimonial.status === "hidden"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {testimonial.status === "published"
                      ? "Dipublikasikan"
                      : testimonial.status === "hidden"
                        ? "Tersembunyi"
                        : "Tertunda"}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(testimonial)}
                      className="p-2 hover:bg-blue-50 rounded transition-colors text-blue-600"
                      title="Edit"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(testimonial.id || "")}
                      className="p-2 hover:bg-red-50 rounded transition-colors text-red-600"
                      title="Hapus"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isLoading && (
          <div className="text-center py-12 text-muted-foreground">
            <p>Memuat ulasan...</p>
          </div>
        )}

        {!isLoading && items.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>Tidak ada ulasan. Tambahkan ulasan tamu untuk memulai.</p>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <ConfirmModal
          isOpen={!!deleteConfirm}
          title="Hapus Ulasan"
          description="Tindakan ini tidak bisa dibatalkan. Apakah Anda yakin?"
          confirmText="Ya, Hapus"
          cancelText="Batal"
          isDangerous
          onConfirm={() => handleDelete(deleteConfirm!)}
          onCancel={() => setDeleteConfirm(null)}
        />

        {/* Testimonial Form Modal */}
        <TestimonialForm
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingTestimonial(undefined);
          }}
          testimonial={editingTestimonial}
        />
      </div>
    </AdminLayout>
  );
};
