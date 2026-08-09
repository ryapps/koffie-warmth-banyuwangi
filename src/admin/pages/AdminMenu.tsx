import { Edit2, Plus, Trash2, UtensilsCrossed } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useMenuStore } from "../../store/useMenuStore";
import { MenuItem } from "../../types";
import { AdminLayout } from "../components/AdminLayout";
import { ConfirmModal } from "../components/ConfirmModal";
import { MenuItemForm } from "../components/MenuItemForm";
import { StatusBadge } from "../components/StatusBadge";

export const AdminMenu = () => {
  const { items, isLoading, loadItems, deleteItem, toggleStatus } = useMenuStore();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<MenuItem | undefined>();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadItems().catch((error) => {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Gagal memuat menu");
    });
  }, [loadItems]);

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
      setDeleteConfirm(null);
      toast.success("Menu berhasil dihapus");
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Gagal menghapus menu");
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      await toggleStatus(id);
      toast.success("Status menu berhasil diperbarui");
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Gagal memperbarui status menu");
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setEditingItem(undefined);
    setIsFormOpen(true);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <AdminLayout title="Kelola Menu">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-display font-bold text-charcoal">
              Menu Makanan & Minuman
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Total: {items.length} item</p>
          </div>
          <Button onClick={handleAddNew} className="bg-amber-600 text-white hover:bg-amber-700">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Item
          </Button>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-lg border border-[#E8DFD0] p-4 shadow-sm">
          <Input
            placeholder="Cari menu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-[#E8DFD0]"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-[#E8DFD0] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#F5F0E8] border-b border-[#E8DFD0]">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground">Gambar</th>
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground">Nama</th>
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground">
                    Kategori
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground">Harga</th>
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground">Status</th>
                  <th className="px-6 py-3 text-left font-medium text-muted-foreground">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#E8DFD0] hover:bg-amber-50/30 transition-colors"
                  >
                    <td className="px-6 py-3">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-12 w-12 object-cover rounded-lg border border-[#E8DFD0] shadow-xs bg-stone-100"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-lg bg-amber-100/70 border border-[#E8DFD0] flex items-center justify-center text-amber-800">
                          <UtensilsCrossed className="h-5 w-5 opacity-60" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-charcoal">
                      <div className="flex flex-col">
                        <span className="font-semibold text-stone-900">{item.name}</span>
                        {item.badge && (
                          <span className="inline-block mt-0.5 w-fit px-1.5 py-0.5 text-[10px] uppercase font-bold rounded bg-amber-100 text-amber-800">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 capitalize text-muted-foreground">{item.category}</td>
                    <td className="px-6 py-4 font-mono font-medium text-stone-800">Rp {item.price?.toLocaleString("id-ID") || "0"}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => item.id && handleToggleStatus(item.id)}
                        className="cursor-pointer"
                      >
                        <StatusBadge
                          status={item.isActive ? "aktif" : "nonaktif"}
                          variant={item.isActive ? "success" : "danger"}
                        />
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600 cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(item.id || "")}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600 cursor-pointer"
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
            <p>Memuat menu...</p>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <ConfirmModal
          isOpen={!!deleteConfirm}
          title="Hapus Menu Item"
          description="Tindakan ini tidak bisa dibatalkan. Apakah Anda yakin?"
          confirmText="Ya, Hapus"
          cancelText="Batal"
          isDangerous
          onConfirm={() => handleDelete(deleteConfirm!)}
          onCancel={() => setDeleteConfirm(null)}
        />

        {/* Menu Item Form Modal */}
        <MenuItemForm
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingItem(undefined);
          }}
          item={editingItem}
        />
      </div>
    </AdminLayout>
  );
};
