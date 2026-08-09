import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { AdminLayout } from "../components/AdminLayout";

export const AdminHero = () => {
  return (
    <AdminLayout title="Edit Konten Hero">
      <div className="max-w-2xl">
        <div className="bg-white rounded-lg border border-[#E8DFD0] p-6 shadow-sm space-y-6">
          <p className="text-sm text-muted-foreground">
            Perbarui konten hero section halaman utama. Perubahan akan langsung terlihat di website.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                Label Atas
              </label>
              <Input placeholder="Est. 2018 · Jember, Jawa Timur" className="border-[#E8DFD0]" />
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                Headline 1
              </label>
              <Input placeholder="Koffie Café" className="border-[#E8DFD0]" />
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                Headline 2 (Italic Amber)
              </label>
              <Input placeholder="Ruang Hangat untuk Setiap Momen" className="border-[#E8DFD0]" />
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                Kutipan
              </label>
              <Input
                placeholder="Kopi bukan hanya minuman, tapi sebuah ritual."
                className="border-[#E8DFD0]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                Deskripsi
              </label>
              <textarea
                placeholder="Deskripsi panjang..."
                className="w-full border border-[#E8DFD0] rounded-md px-4 py-2 text-sm"
                rows={4}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline">Reset ke Default</Button>
            <Button className="bg-amber-600 text-white hover:bg-amber-700">Simpan Perubahan</Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
