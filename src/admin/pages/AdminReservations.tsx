import { CheckCircle, Edit2, Plus, Trash2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "../../components/ui/button";
import { useReservationsStore } from "../../store/useReservationsStore";
import { Reservation } from "../../types";
import { AdminLayout } from "../components/AdminLayout";
import { ConfirmModal } from "../components/ConfirmModal";
import { ReservationForm } from "../components/ReservationForm";

export const AdminReservations = () => {
  const { items, isLoading, loadItems, updateStatus, deleteItem } = useReservationsStore();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [editingReservation, setEditingReservation] = useState<Reservation | undefined>();
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    loadItems().catch((error) => {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Gagal memuat reservasi");
    });
  }, [loadItems]);

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
      setDeleteConfirm(null);
      toast.success("Reservasi berhasil dihapus");
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Gagal menghapus reservasi");
    }
  };

  const handleUpdateStatus = async (id: string, status: Reservation["status"]) => {
    try {
      await updateStatus(id, status);
      toast.success("Status reservasi berhasil diperbarui");
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Gagal memperbarui status reservasi");
    }
  };

  const handleEdit = (reservation: Reservation) => {
    setEditingReservation(reservation);
    setIsFormOpen(true);
  };

  const handleAddManual = () => {
    setEditingReservation(undefined);
    setIsFormOpen(true);
  };

  return (
    <AdminLayout title="Reservasi">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-display font-bold text-charcoal">Daftar Reservasi</h2>
          <Button onClick={handleAddManual} className="bg-amber-600 text-white hover:bg-amber-700">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Manual
          </Button>
        </div>

        <div className="bg-white rounded-lg border border-[#E8DFD0] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#F5F0E8] border-b border-[#E8DFD0]">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground">Nama</th>
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground">No. HP</th>
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground">Tanggal</th>
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground">Jam</th>
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground">Tamu</th>
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground">Status</th>
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {items.map((res) => (
                  <tr key={res.id} className="border-b border-[#E8DFD0] hover:bg-amber-50/30">
                    <td className="px-6 py-4 font-medium text-charcoal">{res.name}</td>
                    <td className="px-6 py-4 text-muted-foreground">{res.phone}</td>
                    <td className="px-6 py-4">{res.date}</td>
                    <td className="px-6 py-4">{res.time}</td>
                    <td className="px-6 py-4">{res.guests} orang</td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${
                          res.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : res.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {res.status === "confirmed"
                          ? "Dikonfirmasi"
                          : res.status === "pending"
                            ? "Tertunda"
                            : "Dibatalkan"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {res.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(res.id!, "confirmed")}
                              className="p-1 hover:bg-green-100 rounded text-green-600 transition-colors"
                              title="Konfirmasi"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(res.id!, "cancelled")}
                              className="p-1 hover:bg-red-100 rounded text-red-600 transition-colors"
                              title="Batalkan"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleEdit(res)}
                          className="p-1 hover:bg-blue-100 rounded text-blue-600 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(res.id!)}
                          className="p-1 hover:bg-red-100 rounded text-red-600 transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {isLoading && (
          <div className="text-center py-12 text-muted-foreground">
            <p>Memuat reservasi...</p>
          </div>
        )}

        {!isLoading && items.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>Tidak ada reservasi saat ini.</p>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <ConfirmModal
          isOpen={!!deleteConfirm}
          title="Hapus Reservasi"
          description="Tindakan ini tidak bisa dibatalkan. Apakah Anda yakin?"
          confirmText="Ya, Hapus"
          cancelText="Batal"
          isDangerous
          onConfirm={() => handleDelete(deleteConfirm!)}
          onCancel={() => setDeleteConfirm(null)}
        />

        {/* Reservation Form Modal */}
        <ReservationForm
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingReservation(undefined);
          }}
          reservation={editingReservation}
        />
      </div>
    </AdminLayout>
  );
};
