import { supabase } from "./supabase";

export const initialMenuSeed = [
  {
    name: "Amber Latte",
    category: "kopi",
    price: 42000,
    description: "Espresso ganda dengan susu creamy warm, sentuhan gula aren organik, dan foam amber lembut khas KOFFIE.",
    badge: "favorit",
    image: "https://images.unsplash.com/photo-1577982643482-8dae6c60eb23?w=800",
    is_active: true,
    sort_order: 1,
    featured: true,
  },
  {
    name: "Kopi Jember Single Origin",
    category: "kopi",
    price: 38000,
    description: "Kopi specialty pilihan langsung dari petani lereng Gunung Ijen & Raung. Notes harum floral & fruity manis.",
    badge: "single-origin",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?w=800",
    is_active: true,
    sort_order: 2,
    featured: true,
  },
  {
    name: "Salted Caramel Cold Brew",
    category: "kopi",
    price: 40000,
    description: "Kopi seduh dingin selama 18 jam dengan sirup salted caramel artisan dan topping cream lembut.",
    badge: "baru",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800",
    is_active: true,
    sort_order: 3,
    featured: true,
  },
  {
    name: "Spanish Latte",
    category: "kopi",
    price: 38000,
    description: "Perpaduan sempurna antara espresso tajam, susu murni, dan kental manis gurih seimbang.",
    badge: null,
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800",
    is_active: true,
    sort_order: 4,
    featured: false,
  },
  {
    name: "Manual Brew V60 Special",
    category: "kopi",
    price: 35000,
    description: "Teknik pour over presisi tinggi dengan beans nusantara kurasi mingguan.",
    badge: "spesial",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
    is_active: true,
    sort_order: 5,
    featured: false,
  },
  {
    name: "Classic Americano",
    category: "kopi",
    price: 28000,
    description: "Double shot espresso murni dilarutkan dengan air hangat/es batu segar.",
    badge: null,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800",
    is_active: true,
    sort_order: 6,
    featured: false,
  },
  {
    name: "Nasi Kuning Special Koffie",
    category: "sarapan",
    price: 35000,
    description: "Nasi kuning rempah wangi disajikan dengan ayam suwir pedas, telur balado, dan sambal matah khas.",
    badge: "favorit",
    image: "https://images.unsplash.com/photo-1609618395181-1ca1f14fddc9?w=800",
    is_active: true,
    sort_order: 7,
    featured: true,
  },
  {
    name: "Avocado Toast & Poached Egg",
    category: "sarapan",
    price: 45000,
    description: "Roti sourdough panggang disiram alpukat mentega tumbuk, poached egg lumer, dan keju feta.",
    badge: "spesial",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800",
    is_active: true,
    sort_order: 8,
    featured: true,
  },
  {
    name: "Sourdough Club Sandwich",
    category: "sarapan",
    price: 48000,
    description: "Roti sourdough lapis daging dada ayam asap, telur, keju cheddar, dada kalkun & sayuran segar.",
    badge: null,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800",
    is_active: true,
    sort_order: 9,
    featured: false,
  },
  {
    name: "Fluffy Pancake Stack",
    category: "sarapan",
    price: 38000,
    description: "Pancake ala Jepang empuk ditumpuk dengan butter leleh, maple syrup murni, dan buah beri segar.",
    badge: "baru",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800",
    is_active: true,
    sort_order: 10,
    featured: false,
  },
  {
    name: "Nasi Goreng Rempah Banyuwangi",
    category: "malam",
    price: 42000,
    description: "Nasi goreng bumbu rempah pilihan dilengkapi sate ayam, telur mata sapi, dan kerupuk udang.",
    badge: "favorit",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800",
    is_active: true,
    sort_order: 11,
    featured: true,
  },
  {
    name: "Sirloin Steak Rice Bowl",
    category: "malam",
    price: 58000,
    description: "Irisan daging sapi sirloin panggang empuk dengan saus butter soyu manis & garlic chips di atas nasi hangat.",
    badge: "spesial",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
    is_active: true,
    sort_order: 12,
    featured: true,
  },
  {
    name: "Creamy Carbonara Pasta",
    category: "malam",
    price: 49000,
    description: "Pasta fettuccine dengan saus krim gurih, smoked beef kriuk, dan taburan keju parmesan melimpah.",
    badge: null,
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800",
    is_active: true,
    sort_order: 13,
    featured: false,
  },
  {
    name: "Butter Croissant Premium",
    category: "pastri",
    price: 28000,
    description: "Croissant ala Prancis renyah berlayer dengan aroma mentega mentah berkualitas tinggi.",
    badge: "favorit",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800",
    is_active: true,
    sort_order: 14,
    featured: true,
  },
  {
    name: "Pain Au Chocolat",
    category: "pastri",
    price: 32000,
    description: "Pastri berlapis dengan isian Belgian dark chocolate leleh yang manis pahit seimbang.",
    badge: null,
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=800",
    is_active: true,
    sort_order: 15,
    featured: false,
  },
  {
    name: "Basque Burnt Cheesecake",
    category: "pastri",
    price: 38000,
    description: "Cheesecake panggang berkerak caramel luar dengan tekstur dalam yang super lumer & creamy.",
    badge: "spesial",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800",
    is_active: true,
    sort_order: 16,
    featured: true,
  },
];

const getFutureDate = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
};

export const initialEventsSeed = [
  {
    type: "mendatang",
    badge: "LIVE MUSIC",
    title: "Malam Jazz & Acoustic Session",
    description: "Nikmati malam minggu syahdu ditemani penampilan musik jazz & akustik dari musisi lokal ternama sambil menikmati sajian kopi favoritmu.",
    date: getFutureDate(7),
    start_time: "19:00:00",
    end_time: "22:00:00",
    is_recurring: false,
    recurring_pattern: null,
    cta: "RSVP",
    cta_link: "#reservasi",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800",
    status: "aktif",
    is_published: true,
  },
  {
    type: "workshop",
    badge: "LIMITED SEAT",
    title: "Latte Art & Manual Brew Workshop",
    description: "Pelajari rahasia membuat latte art sempurna dan teknik menyeduh manual brew dari Head Barista juara nasional kami. Termasuk sertifikat & beans.",
    date: getFutureDate(14),
    start_time: "10:00:00",
    end_time: "13:00:00",
    is_recurring: false,
    recurring_pattern: null,
    cta: "DAFTAR",
    cta_link: "https://wa.me/6281234567890?text=Halo%20saya%20ingin%20daftar%20Workshop%20Latte%20Art",
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800",
    status: "aktif",
    is_published: true,
  },
  {
    type: "gratis",
    badge: "FREE ENTRANCE",
    title: "Specialty Coffee Cupping Session",
    description: "Cicipi dan eksplorasi profil rasa dari 8 jenis biji kopi specialty terbaik Indonesia bersama komunitas pecinta kopi Jember.",
    date: getFutureDate(21),
    start_time: "15:00:00",
    end_time: "17:00:00",
    is_recurring: false,
    recurring_pattern: null,
    cta: "INFO",
    cta_link: "#",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
    status: "aktif",
    is_published: true,
  },
  {
    type: "rutin",
    badge: "SETIAP JUMAT",
    title: "Friday Board Games & Chill Community",
    description: "Tempat kumpul seru main boardgame favorit bareng teman atau kenalan baru tiap jumat malam. Dapatkan diskon 10% untuk semua varian iced coffee.",
    date: getFutureDate(3),
    start_time: "18:30:00",
    end_time: "21:30:00",
    is_recurring: true,
    recurring_pattern: "weekly",
    cta: "RSVP",
    cta_link: "#",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800",
    status: "aktif",
    is_published: true,
  },
  {
    type: "mendatang",
    badge: "DRAFT",
    title: "Open Mic & Poetry Night",
    description: "Malam ekspresi seni, puisi, dan komedi tunggal untuk umum. Tunjukkan bakat terbaikmu di panggung KOFFIE.",
    date: getFutureDate(30),
    start_time: "19:30:00",
    end_time: "22:00:00",
    is_recurring: false,
    recurring_pattern: null,
    cta: "PESAN TIKET",
    cta_link: "#",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800",
    status: "draft",
    is_published: false,
  },
  {
    type: "mendatang",
    badge: "SELESAI",
    title: "KOFFIE Anniversary & Roasting Demo",
    description: "Perayaan ulang tahun KOFFIE dengan sesi demonstrasi roasting biji kopi live dan pengundian doorprize menarik.",
    date: getFutureDate(-14),
    start_time: "13:00:00",
    end_time: "17:00:00",
    is_recurring: false,
    recurring_pattern: null,
    cta: "INFO",
    cta_link: "#",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800",
    status: "selesai",
    is_published: true,
  },
];

export const initialTestimonialsSeed = [
  {
    name: "Budi Santoso",
    role: "Pelanggan Setia & Penikmat Kopi",
    quote: "Kopi Amber Latte di KOFFIE adalah yang terbaik di Jember! Suasananya hangat, estetik, dan stafnya sangat ramah. Tempat langganan saya setiap akhir pekan.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
    stars: 5,
    status: "published",
    sort_order: 1,
  },
  {
    name: "Siti Nurhaliza",
    role: "Founder Digital Studio & Freelancer",
    quote: "Tempat yang sangat ideal untuk WFC (Work From Cafe). Wi-Fi super cepat, banyak colokan listrik, dan tidak bising. Croissant menteganya sangat renyah!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    stars: 5,
    status: "published",
    sort_order: 2,
  },
  {
    name: "Rian Ardianto",
    role: "Coffee Enthusiast",
    quote: "Single Origin Ijen di sini punya karakter taste note citrus dan floral yang sangat jelas. Salut buat baristanya yang faham betul proses brewing.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    stars: 5,
    status: "published",
    sort_order: 3,
  },
  {
    name: "Dewi Anggraini",
    role: "Mahasiswi Universitas Jember",
    quote: "Nasi Kuning Specialnya porsinya kenyang banget dan harganya ramah kantong mahasiswa. Paling suka nongkrong di area outdoor lantai dua pas sore hari.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200",
    stars: 5,
    status: "published",
    sort_order: 4,
  },
  {
    name: "Hendra Pratama",
    role: "Content Creator",
    quote: "Lighting di dalam cafe bagus banget buat foto instagram dan rekaman vlog. Desain interior kayu warm-nya dapet banget vibe scandinavian-nya.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    stars: 4,
    status: "published",
    sort_order: 5,
  },
  {
    name: "Maya Indah",
    role: "Pengunjung Luar Kota",
    quote: "Sangat terkesan dengan Basque Burnt Cheesecake-nya! Rasa manisnya pas dan leleh di mulut. Pasti akan balik lagi kalau ke Jember.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200",
    stars: 5,
    status: "pending",
    sort_order: 6,
  },
  {
    name: "Ahmad Dani",
    role: "Software Engineer",
    quote: "Pelayanan cepat meski cafe lagi ramai pengunjung. Nasi goreng rempahnya gurih & wangi.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200",
    stars: 5,
    status: "pending",
    sort_order: 7,
  },
  {
    name: "Anonimous Guest",
    role: "Visitor",
    quote: "Tempatnya sedikit penuh pas jam makan siang.",
    avatar: null,
    stars: 3,
    status: "hidden",
    sort_order: 8,
  },
];

export const initialGallerySeed = [
  {
    url: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=1200",
    caption: "Suasana Hangat & Estetik Interior Utama KOFFIE",
    category: "interior",
    is_active: true,
    sort_order: 1,
    is_hero: true,
  },
  {
    url: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=1000",
    caption: "Ekstraksi Espresso Double Shot Presisi",
    category: "food",
    is_active: true,
    sort_order: 2,
    is_hero: false,
  },
  {
    url: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1000",
    caption: "Area Bar Espresso Utama & Warm Ambient Light",
    category: "interior",
    is_active: true,
    sort_order: 3,
    is_hero: false,
  },
  {
    url: "https://images.unsplash.com/photo-1577982643482-8dae6c60eb23?w=1000",
    caption: "Signature Amber Latte & Butter Croissant Fresh",
    category: "food",
    is_active: true,
    sort_order: 4,
    is_hero: false,
  },
  {
    url: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1000",
    caption: "Pour Over V60 Manual Brewing Experience",
    category: "food",
    is_active: true,
    sort_order: 5,
    is_hero: false,
  },
  {
    url: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1000",
    caption: "Malam Jazz Live Acoustic bersama Komunitas Musisi",
    category: "events",
    is_active: true,
    sort_order: 6,
    is_hero: false,
  },
  {
    url: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1000",
    caption: "Outdoor Garden Terrace & Seating Lounge Area",
    category: "interior",
    is_active: true,
    sort_order: 7,
    is_hero: false,
  },
  {
    url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1000",
    caption: "Tim Barista Profesional & Staf Ramah KOFFIE",
    category: "team",
    is_active: true,
    sort_order: 8,
    is_hero: false,
  },
  {
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000",
    caption: "Sesi Workshop Latte Art & Masterclass Interaktif",
    category: "events",
    is_active: true,
    sort_order: 9,
    is_hero: false,
  },
  {
    url: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=1000",
    caption: "Freshly Baked Basque Burnt Cheesecake Slice",
    category: "food",
    is_active: true,
    sort_order: 10,
    is_hero: false,
  },
];

export const initialReservationsSeed = [
  {
    name: "Rendra Wijaya",
    phone: "081234567890",
    email: "rendra.wijaya@gmail.com",
    date: getFutureDate(0),
    time: "14:00:00",
    guests: 4,
    special_request: "Mohon siapkan meja di area indoor dekat jendela utama.",
    notes: "Pelanggan konfirmasi via WhatsApp",
    status: "pending",
  },
  {
    name: "Clarissa Putri",
    phone: "082198765432",
    email: "clarissa.p@yahoo.com",
    date: getFutureDate(0),
    time: "19:00:00",
    guests: 2,
    special_request: "Acara ulang tahun singkat, mohon siapkan piring cake kecil & lilin.",
    notes: "Sudah dikonfirmasi oleh admin",
    status: "confirmed",
  },
  {
    name: "Dimas Agung Pratama",
    phone: "085712344321",
    email: "dimas.agung@techcorp.id",
    date: getFutureDate(1),
    time: "16:30:00",
    guests: 6,
    special_request: "Meeting bisnis internal. Membutuhkan stopkontak/colokan tambahan.",
    notes: "Sudah DP Rp 100.000",
    status: "confirmed",
  },
  {
    name: "Maya Lestari",
    phone: "081999888777",
    email: "maya.lestari@outlook.com",
    date: getFutureDate(2),
    time: "11:00:00",
    guests: 3,
    special_request: "Membawa balita, butuh 1 kursi bayi (baby chair).",
    notes: null,
    status: "pending",
  },
  {
    name: "Farhan Hidayat",
    phone: "081344556677",
    email: "farhan.hidayat@gmail.com",
    date: getFutureDate(-1),
    time: "18:30:00",
    guests: 8,
    special_request: "Reuni keluarga kecil area semi-outdoor.",
    notes: "Selesai lancar, pembayaran lunas.",
    status: "completed",
  },
  {
    name: "Andi Perkasa",
    phone: "081222333444",
    email: "andi.perkasa@hotmail.com",
    date: getFutureDate(-2),
    time: "13:00:00",
    guests: 2,
    special_request: "Lunch meeting.",
    notes: "Selesai.",
    status: "completed",
  },
  {
    name: "Siska Yulia",
    phone: "085211223344",
    email: "siska.yulia@gmail.com",
    date: getFutureDate(-3),
    time: "20:00:00",
    guests: 5,
    special_request: "Meja sofa dekat panggung.",
    notes: "Dibatalkan oleh pelanggan via telepon karena ada kendala jadwal.",
    status: "cancelled",
  },
];

export const initialBusinessSettingsSeed = {
  name: "KOFFIE",
  tagline: "Tempat kopi diseduh dengan hati di Banyuwangi.",
  description: "Kafe spesialti dengan suasana nyaman untuk bekerja, bersantai, atau gathering dengan teman.",
  address: "Jl. Ikan Tongkol No. 42, Banyuwangi, Jawa Timur 68419",
  city: "Banyuwangi",
  phone: "+62 333 412 800",
  whatsapp: "+62 812 3456 7890",
  email: "halo@koffie.id",
  instagram: "@koffie.bwi",
  facebook: "https://facebook.com/koffie.bwi",
  maps_url: "https://www.google.com/maps?q=Banyuwangi,Jawa+Timur&output=embed",
  rating_stat: "4.9",
  years_stat: "6+",
  origins_stat: "12",
};

export const initialHeroContentSeed = {
  title: "Setiap Cangkir Punya Cerita di Banyuwangi.",
  subtitle: '"Kafe itu suasana hati—dan kami selalu tidak terburu-buru."',
  description: "Kopi diseduh perlahan, pastri yang baru keluar dari oven, dan sudut kota yang terasa seperti rumah. Datanglah apa adanya. Berlama-lama sesukamu.",
  location_label: "Est. 2018 · Banyuwangi, Jawa Timur",
  image_url: "https://images.unsplash.com/photo-1442550528053-c431ecb55509?auto=format&fit=crop&w=1800&q=80",
  primary_cta_text: "Pesan Meja",
  primary_cta_link: "#reservasi",
  secondary_cta_text: "Jelajahi Menu",
  secondary_cta_link: "#menu",
  is_active: true,
};

export const initialMarqueeSeed = [
  { text: "PLAYLIST PILIHAN", sort_order: 1, is_active: true },
  { text: "BIJI BERETIKA", sort_order: 2, is_active: true },
  { text: "ACARA PRIVAT", sort_order: 3, is_active: true },
  { text: "RAMAH ANJING", sort_order: 4, is_active: true },
  { text: "MALAM JAZZ", sort_order: 5, is_active: true },
  { text: "WORKSHOP ROASTING", sort_order: 6, is_active: true },
  { text: "SPECIALTY COFFEE", sort_order: 7, is_active: true },
];

export const initialOperatingHoursSeed = [
  { day: "Senin – Jumat", open_time: "07.00", close_time: "22.00", is_open: true, sort_order: 1 },
  { day: "Sabtu", open_time: "08.00", close_time: "23.00", is_open: true, sort_order: 2 },
  { day: "Minggu", open_time: "09.00", close_time: "21.00", is_open: true, sort_order: 3 },
];

export async function seedAllTablesToSupabase() {
  if (!supabase) {
    throw new Error("Supabase is not configured. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.");
  }

  console.log("Seeding database tables...");

  // 1. Menu Items
  await supabase.from("menu_items").delete().gte("created_at", "1970-01-01T00:00:00Z");
  const { error: menuErr } = await supabase.from("menu_items").insert(initialMenuSeed);
  if (menuErr) console.error("Error seeding menu_items:", menuErr);
  else console.log("✅ menu_items seeded successfully");

  // 2. Events
  await supabase.from("events").delete().gte("created_at", "1970-01-01T00:00:00Z");
  const { error: eventsErr } = await supabase.from("events").insert(initialEventsSeed);
  if (eventsErr) console.error("Error seeding events:", eventsErr);
  else console.log("✅ events seeded successfully");

  // 3. Testimonials
  await supabase.from("testimonials").delete().gte("created_at", "1970-01-01T00:00:00Z");
  const { error: testErr } = await supabase.from("testimonials").insert(initialTestimonialsSeed);
  if (testErr) console.error("Error seeding testimonials:", testErr);
  else console.log("✅ testimonials seeded successfully");

  // 4. Gallery Photos
  await supabase.from("gallery_photos").delete().gte("created_at", "1970-01-01T00:00:00Z");
  const { error: galleryErr } = await supabase.from("gallery_photos").insert(initialGallerySeed);
  if (galleryErr) console.error("Error seeding gallery_photos:", galleryErr);
  else console.log("✅ gallery_photos seeded successfully");

  // 5. Reservations
  await supabase.from("reservations").delete().gte("created_at", "1970-01-01T00:00:00Z");
  const { error: resErr } = await supabase.from("reservations").insert(initialReservationsSeed);
  if (resErr) console.error("Error seeding reservations:", resErr);
  else console.log("✅ reservations seeded successfully");

  // 6. Business Settings
  await supabase.from("business_settings").delete().gte("updated_at", "1970-01-01T00:00:00Z");
  const { error: bsErr } = await supabase.from("business_settings").insert(initialBusinessSettingsSeed);
  if (bsErr) console.error("Error seeding business_settings:", bsErr);
  else console.log("✅ business_settings seeded successfully");

  // 7. Hero Content
  await supabase.from("hero_content").delete().gte("updated_at", "1970-01-01T00:00:00Z");
  const { error: heroErr } = await supabase.from("hero_content").insert(initialHeroContentSeed);
  if (heroErr) console.error("Error seeding hero_content:", heroErr);
  else console.log("✅ hero_content seeded successfully");

  // 8. Marquee Items
  await supabase.from("marquee_items").delete().gte("created_at", "1970-01-01T00:00:00Z");
  const { error: marqueeErr } = await supabase.from("marquee_items").insert(initialMarqueeSeed);
  if (marqueeErr) console.error("Error seeding marquee_items:", marqueeErr);
  else console.log("✅ marquee_items seeded successfully");

  // 9. Operating Hours
  await supabase.from("operating_hours").delete().gte("updated_at", "1970-01-01T00:00:00Z");
  const { error: hoursErr } = await supabase.from("operating_hours").insert(initialOperatingHoursSeed);
  if (hoursErr) console.error("Error seeding operating_hours:", hoursErr);
  else console.log("✅ operating_hours seeded successfully");

  return true;
}
