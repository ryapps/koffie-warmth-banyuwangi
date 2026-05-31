import type { Event } from "@/types";

export const events: Event[] = [
  {
    id: "jazz",
    type: "event",
    badge: "ACARA MENDATANG",
    title: "Malam Jazz",
    description:
      "Kuartet live, wine alami, dan espresso terbaik di Banyuwangi. Setiap Jumat terakhir tiap bulan.",
    schedule: "Jumat, 27 Des · 20.00 WIB",
    cta: "DAFTAR",
    image:
      "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "roasting",
    type: "workshop",
    badge: "WORKSHOP",
    title: "Workshop Roasting",
    description:
      "Pelajari seni dan ilmu di balik roasting. Kelompok kecil, panduan ahli, dan biji untuk dibawa pulang.",
    schedule: "Sabtu, 11 Jan · 10.00 WIB",
    cta: "PESAN TEMPAT",
    image:
      "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "cupping",
    type: "free",
    badge: "ACARA GRATIS",
    title: "Cupping Jumat",
    description:
      "Cicipi lima single-origin berdampingan dengan head roaster kami. Setiap Jumat pagi, tanpa reservasi.",
    schedule: "Setiap Jumat · 09.00 WIB",
    cta: "PELAJARI",
    image:
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=900&q=80",
  },
];
