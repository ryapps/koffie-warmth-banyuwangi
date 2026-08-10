import { useEffect, useState, ChangeEvent } from "react";
import { toast } from "sonner";
import { Upload, Save, RotateCcw } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { AdminLayout } from "../components/AdminLayout";
import { useHeroStore, initialHeroData } from "../../store/useHeroStore";
import { HeroContent } from "../../types/index";

export const AdminHero = () => {
  const hero = useHeroStore((state) => state.hero);
  const loadHero = useHeroStore((state) => state.loadHero);
  const updateHero = useHeroStore((state) => state.updateHero);
  const uploadHeroImage = useHeroStore((state) => state.uploadHeroImage);

  const [formData, setFormData] = useState<HeroContent>(hero);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    loadHero().then(() => {
      setFormData(useHeroStore.getState().hero);
    });
  }, [loadHero]);

  useEffect(() => {
    setFormData(hero);
  }, [hero]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file gambar maksimal 5MB.");
      return;
    }

    setIsUploading(true);
    try {
      const imageUrl = await uploadHeroImage(file);
      setFormData((prev) => ({ ...prev, imageUrl }));
      toast.success("Gambar hero berhasil diunggah!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal mengunggah gambar";
      toast.error(msg);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Judul Hero tidak boleh kosong.");
      return;
    }

    setIsSubmitting(true);
    try {
      await updateHero(formData);
      toast.success("Konten Hero berhasil diperbarui!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menyimpan perubahan";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (confirm("Apakah Anda yakin ingin mengembalikan konten Hero ke default awal?")) {
      setFormData(initialHeroData);
      updateHero(initialHeroData);
      toast.info("Konten Hero dikembalikan ke default.");
    }
  };

  return (
    <AdminLayout title="Edit Konten Hero">
      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-[#E8DFD0] p-6 shadow-sm space-y-6">
          <p className="text-sm text-muted-foreground">
            Perbarui konten hero section halaman utama. Perubahan akan langsung disimpan ke Supabase dan terlihat di website publik.
          </p>

          {/* Background Image Preview & Upload */}
          <div className="space-y-2">
            <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Gambar Latar Belakang Hero
            </label>
            <div className="relative aspect-video rounded-lg overflow-hidden border border-[#E8DFD0] bg-espresso/5">
              <img
                src={formData.imageUrl}
                alt="Preview Hero Background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <label className="cursor-pointer bg-amber-600 text-white px-4 py-2 rounded-md text-xs font-semibold flex items-center gap-2 shadow-lg hover:bg-amber-500 transition-colors">
                  <Upload className="w-4 h-4" />
                  {isUploading ? "Mengunggah..." : "Ganti Gambar"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <Input
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="Atau masukkan URL gambar (https://...)"
              className="border-[#E8DFD0] text-xs font-mono"
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                Label Lokasi (Atas)
              </label>
              <Input
                name="locationLabel"
                value={formData.locationLabel || ""}
                onChange={handleChange}
                placeholder="Est. 2018 · Banyuwangi, Jawa Timur"
                className="border-[#E8DFD0]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                Judul Utama (Title)
              </label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Setiap Cangkir Punya Cerita di Banyuwangi."
                className="border-[#E8DFD0]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                Kutipan / Subtitle
              </label>
              <Input
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                placeholder='"Kafe itu suasana hati—dan kami selalu tidak terburu-buru."'
                className="border-[#E8DFD0]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                Deskripsi Singkat
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Deskripsi hero section..."
                className="w-full border border-[#E8DFD0] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                  Teks Tombol Utama
                </label>
                <Input
                  name="primaryCtaText"
                  value={formData.primaryCtaText}
                  onChange={handleChange}
                  placeholder="Pesan Meja"
                  className="border-[#E8DFD0]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                  Link Tombol Utama
                </label>
                <Input
                  name="primaryCtaLink"
                  value={formData.primaryCtaLink}
                  onChange={handleChange}
                  placeholder="#reservasi"
                  className="border-[#E8DFD0]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                  Teks Tombol Kedua
                </label>
                <Input
                  name="secondaryCtaText"
                  value={formData.secondaryCtaText}
                  onChange={handleChange}
                  placeholder="Jelajahi Menu"
                  className="border-[#E8DFD0]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                  Link Tombol Kedua
                </label>
                <Input
                  name="secondaryCtaLink"
                  value={formData.secondaryCtaLink}
                  onChange={handleChange}
                  placeholder="#menu"
                  className="border-[#E8DFD0]"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-[#E8DFD0]">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset ke Default
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-amber-600 text-white hover:bg-amber-700 font-semibold flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

