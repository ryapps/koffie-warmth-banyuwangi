import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { toast } from "sonner";
import { Save, KeyRound } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { AdminLayout } from "../components/AdminLayout";
import { useSettingsStore } from "../../store/useSettingsStore";
import { CafeSettings, OperatingHours } from "../../types/index";

export const AdminSettings = () => {
  const cafeSettings = useSettingsStore((state) => state.cafeSettings);
  const operatingHours = useSettingsStore((state) => state.operatingHours);
  const loadSettings = useSettingsStore((state) => state.loadSettings);
  const updateCafeSettings = useSettingsStore((state) => state.updateCafeSettings);
  const updateOperatingHours = useSettingsStore((state) => state.updateOperatingHours);

  const [settingsForm, setSettingsForm] = useState<CafeSettings>(cafeSettings);
  const [hoursForm, setHoursForm] = useState<OperatingHours[]>(operatingHours);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Password state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    loadSettings().then(() => {
      setSettingsForm(useSettingsStore.getState().cafeSettings);
      setHoursForm(useSettingsStore.getState().operatingHours);
    });
  }, [loadSettings]);

  useEffect(() => {
    setSettingsForm(cafeSettings);
    setHoursForm(operatingHours);
  }, [cafeSettings, operatingHours]);

  const handleSettingsChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettingsForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleHourChange = (index: number, field: "openTime" | "closeTime" | "day", value: string) => {
    const updated = [...hoursForm];
    updated[index] = { ...updated[index], [field]: value };
    setHoursForm(updated);
  };

  const handleSubmitAll = async (e: FormEvent) => {
    e.preventDefault();
    if (!settingsForm.name.trim()) {
      toast.error("Nama kafe tidak boleh kosong.");
      return;
    }

    setIsSubmitting(true);
    try {
      await updateCafeSettings(settingsForm);
      await updateOperatingHours(hoursForm);
      toast.success("Pengaturan kafe berhasil disimpan ke Supabase!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menyimpan pengaturan";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangePassword = (e: FormEvent) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Semua bidang kata sandi wajib diisi.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Konfirmasi kata sandi baru tidak cocok.");
      return;
    }
    toast.success("Kata sandi berhasil diperbarui!");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <AdminLayout title="Pengaturan Kafe">
      <div className="max-w-2xl">
        <form onSubmit={handleSubmitAll}>
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
                  <Input
                    name="name"
                    value={settingsForm.name}
                    onChange={handleSettingsChange}
                    placeholder="KOFFIE"
                    className="border-[#E8DFD0]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                    Tagline
                  </label>
                  <Input
                    name="tagline"
                    value={settingsForm.tagline}
                    onChange={handleSettingsChange}
                    placeholder="Tempat kopi diseduh dengan hati di Banyuwangi."
                    className="border-[#E8DFD0]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                    Deskripsi
                  </label>
                  <textarea
                    name="description"
                    value={settingsForm.description}
                    onChange={handleSettingsChange}
                    placeholder="Deskripsi kafe..."
                    className="w-full border border-[#E8DFD0] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
                      Rating Stat
                    </label>
                    <Input
                      name="ratingStat"
                      value={settingsForm.ratingStat || "4.9"}
                      onChange={handleSettingsChange}
                      placeholder="4.9"
                      className="border-[#E8DFD0]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
                      Tahun Stat
                    </label>
                    <Input
                      name="yearsStat"
                      value={settingsForm.yearsStat || "6+"}
                      onChange={handleSettingsChange}
                      placeholder="6+"
                      className="border-[#E8DFD0]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
                      Origin Stat
                    </label>
                    <Input
                      name="originsStat"
                      value={settingsForm.originsStat || "12"}
                      onChange={handleSettingsChange}
                      placeholder="12"
                      className="border-[#E8DFD0]"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Jam Operasional */}
            <TabsContent value="jam" className="space-y-4 mt-6">
              <div className="bg-white rounded-lg border border-[#E8DFD0] p-6 shadow-sm space-y-3">
                <p className="text-xs text-muted-foreground mb-2">
                  Atur jam operasional kafe untuk setiap kelompok hari.
                </p>
                {hoursForm.map((h, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 bg-[#F5F0E8] rounded-md">
                    <Input
                      value={h.day}
                      onChange={(e) => handleHourChange(i, "day", e.target.value)}
                      className="border-[#E8DFD0] w-36 bg-white text-xs font-semibold"
                    />
                    <Input
                      value={h.openTime}
                      onChange={(e) => handleHourChange(i, "openTime", e.target.value)}
                      className="border-[#E8DFD0] w-28 bg-white text-xs text-center"
                      placeholder="07.00"
                    />
                    <span className="text-xs text-muted-foreground">—</span>
                    <Input
                      value={h.closeTime}
                      onChange={(e) => handleHourChange(i, "closeTime", e.target.value)}
                      className="border-[#E8DFD0] w-28 bg-white text-xs text-center"
                      placeholder="22.00"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Kontak & Media */}
            <TabsContent value="kontak" className="space-y-4 mt-6">
              <div className="bg-white rounded-lg border border-[#E8DFD0] p-6 shadow-sm space-y-4">
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                    Alamat Lengkap
                  </label>
                  <Input
                    name="address"
                    value={settingsForm.address}
                    onChange={handleSettingsChange}
                    placeholder="Jl. Ikan Tongkol No. 42, Banyuwangi, Jawa Timur 68419"
                    className="border-[#E8DFD0]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                    Kota
                  </label>
                  <Input
                    name="city"
                    value={settingsForm.city}
                    onChange={handleSettingsChange}
                    placeholder="Banyuwangi"
                    className="border-[#E8DFD0]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                    No. Telepon
                  </label>
                  <Input
                    name="phone"
                    value={settingsForm.phone}
                    onChange={handleSettingsChange}
                    placeholder="+62 333 412 800"
                    className="border-[#E8DFD0]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                    WhatsApp
                  </label>
                  <Input
                    name="whatsapp"
                    value={settingsForm.whatsapp}
                    onChange={handleSettingsChange}
                    placeholder="+62 812 3456 7890"
                    className="border-[#E8DFD0]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                    Email
                  </label>
                  <Input
                    name="email"
                    value={settingsForm.email}
                    onChange={handleSettingsChange}
                    placeholder="halo@koffie.id"
                    className="border-[#E8DFD0]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                    Instagram Handle
                  </label>
                  <Input
                    name="instagram"
                    value={settingsForm.instagram || ""}
                    onChange={handleSettingsChange}
                    placeholder="@koffie.bwi"
                    className="border-[#E8DFD0]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                    URL Google Maps Embed
                  </label>
                  <Input
                    name="mapsUrl"
                    value={settingsForm.mapsUrl || ""}
                    onChange={handleSettingsChange}
                    placeholder="https://www.google.com/maps?q=Banyuwangi,Jawa+Timur&output=embed"
                    className="border-[#E8DFD0] text-xs font-mono"
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
                  <Input value="Admin KOFFIE" className="border-[#E8DFD0]" disabled />
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                    Email Admin
                  </label>
                  <Input value="admin@koffie.id" className="border-[#E8DFD0]" disabled />
                </div>
                <div className="border-t border-[#E8DFD0] pt-4 mt-4">
                  <h4 className="font-medium text-charcoal mb-4 flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-amber-600" />
                    Ubah Kata Sandi
                  </h4>
                  <div className="space-y-3">
                    <Input
                      type="password"
                      placeholder="Kata sandi lama"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="border-[#E8DFD0]"
                    />
                    <Input
                      type="password"
                      placeholder="Kata sandi baru"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="border-[#E8DFD0]"
                    />
                    <Input
                      type="password"
                      placeholder="Konfirmasi kata sandi baru"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="border-[#E8DFD0]"
                    />
                    <Button
                      type="button"
                      onClick={handleChangePassword}
                      className="bg-blue-600 text-white hover:bg-blue-700 font-semibold"
                    >
                      Simpan Kata Sandi Baru
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full bg-amber-600 text-white hover:bg-amber-700 font-semibold py-3 flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            {isSubmitting ? "Menyimpan Pengaturan..." : "Simpan Semua Pengaturan"}
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
};

