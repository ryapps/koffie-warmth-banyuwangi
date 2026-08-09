import { Database, Calendar, Star, UtensilsCrossed, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { seedAllTablesToSupabase } from "../../lib/seedHelper";
import { isSupabaseConfigured } from "../../lib/supabase";
import { useEventsStore } from "../../store/useEventsStore";
import { useMenuStore } from "../../store/useMenuStore";
import { useReservationsStore } from "../../store/useReservationsStore";
import { useTestimonialsStore } from "../../store/useTestimonialsStore";
import { useGalleryStore } from "../../store/useGalleryStore";
import { AdminLayout } from "../components/AdminLayout";
import { StatCard } from "../components/StatCard";

export const AdminDashboard = () => {
  const loadMenu = useMenuStore((state) => state.loadItems);
  const loadEvents = useEventsStore((state) => state.loadItems);
  const loadReservations = useReservationsStore((state) => state.loadItems);
  const loadTestimonials = useTestimonialsStore((state) => state.loadItems);
  const loadGallery = useGalleryStore((state) => state.loadItems);

  const menuItems = useMenuStore((state) => state.items);
  const events = useEventsStore((state) => state.items);
  const reservations = useReservationsStore((state) => state.items);
  const testimonials = useTestimonialsStore((state) => state.items);

  const [isSeeding, setIsSeeding] = useState(false);

  const reloadAllStores = async () => {
    await Promise.all([
      loadMenu(),
      loadEvents(),
      loadReservations(),
      loadTestimonials(),
      loadGallery(),
    ]);
  };

  useEffect(() => {
    reloadAllStores().catch(console.error);
  }, []);

  const handleSeedDatabase = async () => {
    if (!confirm("Apakah Anda yakin ingin mengisi database dengan Data Seeder Sampel lengkap?")) {
      return;
    }
    setIsSeeding(true);
    try {
      if (isSupabaseConfigured) {
        await seedAllTablesToSupabase();
        await reloadAllStores();
        toast.success("Database Supabase berhasil di-seed dengan data lengkap!");
      } else {
        toast.error("Supabase belum dikonfigurasi di file .env (VITE_SUPABASE_URL). Silakan gunakan Supabase SQL Editor.");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan";
      toast.error("Gagal melakukan seed: " + message);
    } finally {
      setIsSeeding(false);
    }
  };

  const publishedTestimonials = testimonials.filter((item) => item.status === "published");
  const pendingReservations = reservations.filter((r) => r.status === "pending").length;

  const avgRating =
    publishedTestimonials.length > 0
      ? (
          publishedTestimonials.reduce((sum, t) => sum + (t.stars || 0), 0) /
          publishedTestimonials.length
        ).toFixed(1)
      : "0";

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-8">
        {/* Banner Quick Seed Action
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-amber-900 to-amber-800 text-white shadow-md">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Database className="h-5 w-5 text-amber-300" /> KOFFIE Database Tools
            </h2>
            <p className="text-xs text-amber-200 mt-1">
              Isi otomatis seluruh tabel (menu, event, testimonial, galeri, reservasi) dengan sampel data lengkap.
            </p>
          </div>
          <Button
            onClick={handleSeedDatabase}
            disabled={isSeeding}
            className="bg-amber-400 text-amber-950 font-semibold hover:bg-amber-300 transition-all flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isSeeding ? "animate-spin" : ""}`} />
            {isSeeding ? "Memproses Seed..." : "Seed Database Sekarang"}
          </Button>
        </div> */}

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={<UtensilsCrossed className="h-6 w-6" />}
            label="Total Menu"
            value={menuItems.length}
            subtitle="+2 item bulan ini"
            color="amber"
          />
          <StatCard
            icon={<Calendar className="h-6 w-6" />}
            label="Acara Mendatang"
            value={events.length}
            subtitle="dalam 30 hari ke depan"
            color="espresso"
          />
          <StatCard
            icon={<Calendar className="h-6 w-6" />}
            label="Reservasi Hari Ini"
            value={reservations.length}
            subtitle={`${pendingReservations} menunggu konfirmasi`}
            color="green"
          />
          <StatCard
            icon={<Star className="h-6 w-6" />}
            label="Rata-rata Rating"
            value={avgRating}
            subtitle={`dari ${publishedTestimonials.length} ulasan`}
            color="amber"
          />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Reservations */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-[#E8DFD0] p-6 shadow-sm">
            <h3 className="text-lg font-display font-bold text-charcoal mb-4">Reservasi Terbaru</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E8DFD0]">
                    <th className="text-left px-4 py-2 font-medium text-muted-foreground">Nama</th>
                    <th className="text-left px-4 py-2 font-medium text-muted-foreground">
                      Tanggal
                    </th>
                    <th className="text-left px-4 py-2 font-medium text-muted-foreground">Jam</th>
                    <th className="text-left px-4 py-2 font-medium text-muted-foreground">Tamu</th>
                    <th className="text-left px-4 py-2 font-medium text-muted-foreground">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.slice(0, 5).map((res) => (
                    <tr key={res.id} className="border-b border-[#E8DFD0] hover:bg-amber-50/30">
                      <td className="px-4 py-3 font-medium">{res.name}</td>
                      <td className="px-4 py-3">{res.date}</td>
                      <td className="px-4 py-3">{res.time}</td>
                      <td className="px-4 py-3">{res.guests} orang</td>
                      <td className="px-4 py-3">
                        <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          {res.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white rounded-lg border border-[#E8DFD0] p-6 shadow-sm">
            <h3 className="text-lg font-display font-bold text-charcoal mb-4">Aktivitas Terkini</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
                <div className="text-sm">
                  <p className="text-charcoal">Menu baru ditambahkan</p>
                  <p className="text-xs text-muted-foreground">Amber Latte</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-2 w-2 rounded-full bg-yellow-500 mt-1.5 flex-shrink-0"></div>
                <div className="text-sm">
                  <p className="text-charcoal">Reservasi baru masuk</p>
                  <p className="text-xs text-muted-foreground">4 tamu untuk hari ini</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                <div className="text-sm">
                  <p className="text-charcoal">Acara diperbarui</p>
                  <p className="text-xs text-muted-foreground">Malam Jazz Spesial</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg border border-[#E8DFD0] p-6 shadow-sm">
          <h3 className="text-lg font-display font-bold text-charcoal mb-4">Aksi Cepat</h3>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-amber-600 text-white hover:bg-amber-700">+ Tambah Menu</Button>
            <Button className="bg-amber-600 text-white hover:bg-amber-700">+ Buat Acara</Button>
            <Button className="bg-amber-600 text-white hover:bg-amber-700">🖼 Upload Foto</Button>
            <Button variant="outline">⚙ Pengaturan</Button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="text-xs text-muted-foreground">
          <p>Total reservasi bulan ini: {reservations.length}</p>
        </div>
      </div>
    </AdminLayout>
  );
};
