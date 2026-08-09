import { Plus, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { AdminLayout } from "../components/AdminLayout";

export const AdminMarquee = () => {
  return (
    <AdminLayout title="Edit Teks Marquee">
      <div className="max-w-2xl space-y-6">
        {/* Live Preview */}
        <div className="bg-[#C8852A] text-[#2C1A0E] p-4 rounded-lg overflow-hidden">
          <div className="animate-marquee whitespace-nowrap">
            <span className="inline-block px-4">
              Playlist Pilihan ○ Bahan Berkualitas ○ Acara Privat ○ Ramah Hewan Peliharaan
            </span>
          </div>
        </div>

        {/* Items List */}
        <div className="bg-white rounded-lg border border-[#E8DFD0] p-6 shadow-sm space-y-3">
          <h3 className="font-bold text-charcoal mb-4">Daftar Item Marquee</h3>

          {["Playlist Pilihan", "Bahan Berkualitas", "Acara Privat", "Ramah Hewan Peliharaan"].map(
            (item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-[#F5F0E8] rounded-lg">
                <span className="text-2xl cursor-move">⠿</span>
                <Input defaultValue={item} className="border-[#E8DFD0]" />
                <button className="p-2 hover:bg-red-100 rounded text-red-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ),
          )}

          <Button variant="outline" className="w-full mt-4">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Item
          </Button>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-lg border border-[#E8DFD0] p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-charcoal">Pengaturan</h3>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
              Kecepatan Scroll
            </label>
            <select className="w-full border border-[#E8DFD0] rounded-md px-3 py-2 text-sm">
              <option>Lambat</option>
              <option>Normal</option>
              <option>Cepat</option>
            </select>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                Background
              </label>
              <input
                type="color"
                defaultValue="#C8852A"
                className="w-full h-10 rounded-md cursor-pointer"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                Teks
              </label>
              <input
                type="color"
                defaultValue="#2C1A0E"
                className="w-full h-10 rounded-md cursor-pointer"
              />
            </div>
          </div>
        </div>

        <Button className="w-full bg-amber-600 text-white hover:bg-amber-700">
          Simpan Pengaturan Marquee
        </Button>
      </div>
    </AdminLayout>
  );
};
