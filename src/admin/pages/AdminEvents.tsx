import { Edit2, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "../../components/ui/button";
import { useEventsStore } from "../../store/useEventsStore";
import { Event } from "../../types";
import { AdminLayout } from "../components/AdminLayout";
import { ConfirmModal } from "../components/ConfirmModal";
import { EventForm } from "../components/EventForm";
import { StatusBadge } from "../components/StatusBadge";

export const AdminEvents = () => {
  const { items, isLoading, loadItems, deleteItem } = useEventsStore();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | undefined>();
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    loadItems().catch((error) => {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Gagal memuat acara dari Supabase");
    });
  }, [loadItems]);

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
      setDeleteConfirm(null);
      toast.success("Acara berhasil dihapus");
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Gagal menghapus acara");
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setEditingEvent(undefined);
    setIsFormOpen(true);
  };

  return (
    <AdminLayout title="Kelola Acara">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-display font-bold text-charcoal">Acara & Workshop</h2>
          <Button onClick={handleAddNew} className="bg-amber-600 text-white hover:bg-amber-700">
            <Plus className="h-4 w-4 mr-2" />
            Buat Acara
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg border border-[#E8DFD0] overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {event.image && (
                <div className="h-40 bg-gradient-to-br from-amber-200 to-amber-100 flex items-center justify-center">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-charcoal flex-1">{event.title}</h3>
                  <StatusBadge
                    status={
                      event.status === "aktif"
                        ? "aktif"
                        : event.status === "draft"
                          ? "draft"
                          : "selesai"
                    }
                    variant={event.status === "aktif" ? "success" : "warning"}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {event.date} - {event.startTime} {event.endTime ? `s/d ${event.endTime}` : ""}
                </p>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {event.description}
                </p>
                <div className="flex gap-2 mt-4">
                  <Button
                    onClick={() => handleEdit(event)}
                    variant="outline"
                    size="sm"
                    className="text-xs flex-1"
                  >
                    <Edit2 className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    onClick={() => setDeleteConfirm(event.id || "")}
                    variant="outline"
                    size="sm"
                    className="text-xs text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Hapus
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isLoading && (
          <div className="text-center py-12 text-muted-foreground">
            <p>Memuat acara...</p>
          </div>
        )}

        {!isLoading && items.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>Tidak ada acara. Buat acara baru untuk memulai.</p>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <ConfirmModal
          isOpen={!!deleteConfirm}
          title="Hapus Acara"
          description="Tindakan ini tidak bisa dibatalkan. Apakah Anda yakin?"
          confirmText="Ya, Hapus"
          cancelText="Batal"
          isDangerous
          onConfirm={() => handleDelete(deleteConfirm!)}
          onCancel={() => setDeleteConfirm(null)}
        />

        {/* Event Form Modal */}
        <EventForm
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingEvent(undefined);
          }}
          event={editingEvent}
        />
      </div>
    </AdminLayout>
  );
};
