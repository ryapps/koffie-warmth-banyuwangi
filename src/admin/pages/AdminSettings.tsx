import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { AdminLayout } from "../components/AdminLayout";

export const AdminSettings = () => {
  return (
    <AdminLayout title="Pengaturan Kafe">
      <div className="max-w-2xl">
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="info">Informasi</TabsTrigger>
            <TabsTrigger value="jam">Jam Buka</TabsTrigger>
            <TabsTrigger value="kontak">Kontak</TabsTrigger>
            <TabsTrigger value="akun">Akun</TabsTrigger>
          </TabsList>

          {/* Informasi Kafe */}
          <TabsContent value="info" className="space-y-4 mt-6">
            <div className="bg-white rounded-lg border border-[#E8DFD0] p-6 shadow-sm space-y-4">
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                  Nama Kafe
                </label>
                <Input placeholder="KOFFIE Café" className="border-[#E8DFD0]" />
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                  Tagline
                </label>
                <Input placeholder="Est. 2018 · Jember, Jawa Timur" className="border-[#E8DFD0]" />
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                  Deskripsi
                </label>
                <textarea
                  placeholder="Deskripsi kafe..."
                  className="w-full border border-[#E8DFD0] rounded-md px-4 py-2 text-sm"
                  rows={4}
                />
              </div>
            </div>
          </TabsContent>

          {/* Jam Operasional */}
          <TabsContent value="jam" className="space-y-4 mt-6">
            <div className="bg-white rounded-lg border border-[#E8DFD0] p-6 shadow-sm space-y-3">
              {["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"].map((day) => (
                <div key={day} className="flex items-center gap-3">
                  <label className="w-20 text-sm font-medium">{day}</label>
                  <Input type="time" defaultValue="07:00" className="border-[#E8DFD0] w-24" />
                  <span>-</span>
                  <Input type="time" defaultValue="21:00" className="border-[#E8DFD0] w-24" />
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Kontak & Media */}
          <TabsContent value="kontak" className="space-y-4 mt-6">
            <div className="bg-white rounded-lg border border-[#E8DFD0] p-6 shadow-sm space-y-4">
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                  No. Telepon
                </label>
                <Input placeholder="+62-331-123456" className="border-[#E8DFD0]" />
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                  WhatsApp
                </label>
                <Input placeholder="6281234567890" className="border-[#E8DFD0]" />
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                  Email
                </label>
                <Input placeholder="info@koffie.id" className="border-[#E8DFD0]" />
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                  Instagram
                </label>
                <Input
                  placeholder="https://instagram.com/koffie_jember"
                  className="border-[#E8DFD0]"
                />
              </div>
            </div>
          </TabsContent>

          {/* Akun Admin */}
          <TabsContent value="akun" className="space-y-4 mt-6">
            <div className="bg-white rounded-lg border border-[#E8DFD0] p-6 shadow-sm space-y-4">
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                  Nama Admin
                </label>
                <Input placeholder="Admin KOFFIE" className="border-[#E8DFD0]" disabled />
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                  Email
                </label>
                <Input placeholder="admin@koffie.id" className="border-[#E8DFD0]" disabled />
              </div>
              <div className="border-t border-[#E8DFD0] pt-4 mt-4">
                <h4 className="font-medium text-charcoal mb-4">Ubah Kata Sandi</h4>
                <div className="space-y-3">
                  <Input
                    type="password"
                    placeholder="Kata sandi lama"
                    className="border-[#E8DFD0]"
                  />
                  <Input
                    type="password"
                    placeholder="Kata sandi baru"
                    className="border-[#E8DFD0]"
                  />
                  <Input
                    type="password"
                    placeholder="Konfirmasi kata sandi baru"
                    className="border-[#E8DFD0]"
                  />
                  <Button className="bg-blue-600 text-white hover:bg-blue-700">
                    Simpan Kata Sandi Baru
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Button className="mt-6 w-full bg-amber-600 text-white hover:bg-amber-700">
          Simpan Semua Pengaturan
        </Button>
      </div>
    </AdminLayout>
  );
};
