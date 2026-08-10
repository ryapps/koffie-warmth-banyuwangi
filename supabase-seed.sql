-- ==============================================================================
-- KOFFIE CAFÉ DATABASE SEEDER (SQL SCRIPT FOR SUPABASE)
-- Lengkap untuk table: menu_items, events, testimonials, gallery_photos, reservations
-- ==============================================================================

-- 1. CLEAN EXISTING DATA (Optional, aman untuk re-seed)
TRUNCATE TABLE public.menu_items CASCADE;
TRUNCATE TABLE public.events CASCADE;
TRUNCATE TABLE public.testimonials CASCADE;
TRUNCATE TABLE public.gallery_photos CASCADE;
TRUNCATE TABLE public.reservations CASCADE;
TRUNCATE TABLE public.business_settings CASCADE;
TRUNCATE TABLE public.hero_content CASCADE;
TRUNCATE TABLE public.marquee_items CASCADE;
TRUNCATE TABLE public.operating_hours CASCADE;

-- ==============================================================================
-- 2. SEED TABLE: MENU_ITEMS
-- Category options: 'kopi', 'sarapan', 'malam', 'pastri'
-- ==============================================================================
INSERT INTO public.menu_items (id, name, category, price, description, badge, image, is_active, sort_order, featured) VALUES
-- Kopi
(gen_random_uuid(), 'Amber Latte', 'kopi', 42000, 'Espresso ganda dengan susu creamy warm, sentuhan gula aren organik, dan foam amber lembut khas KOFFIE.', 'favorit', 'https://images.unsplash.com/photo-1577982643482-8dae6c60eb23?w=800', true, 1, true),
(gen_random_uuid(), 'Kopi Jember Single Origin', 'kopi', 38000, 'Kopi specialty pilihan langsung dari petani lereng Gunung Ijen & Raung. Notes harum floral & fruity manis.', 'single-origin', 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?w=800', true, 2, true),
(gen_random_uuid(), 'Salted Caramel Cold Brew', 'kopi', 40000, 'Kopi seduh dingin selama 18 jam dengan sirup salted caramel artisan dan topping cream lembut.', 'baru', 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800', true, 3, true),
(gen_random_uuid(), 'Spanish Latte', 'kopi', 38000, 'Perpaduan sempurna antara espresso tajam, susu murni, dan kental manis gurih seimbang.', null, 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800', true, 4, false),
(gen_random_uuid(), 'Manual Brew V60 Special', 'kopi', 35000, 'Teknik pour over presisi tinggi dengan beans nusantara kurasi mingguan.', 'spesial', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800', true, 5, false),
(gen_random_uuid(), 'Classic Americano', 'kopi', 28000, 'Double shot espresso murni dilarutkan dengan air hangat/es batu segar.', null, 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800', true, 6, false),

-- Sarapan
(gen_random_uuid(), 'Nasi Kuning Special Koffie', 'kopi' /* diganti ke sarapan */, 35000, 'Nasi kuning rempah wangi disajikan dengan ayam suwir pedas, telur balado, dan sambal matah khas.', 'favorit', 'https://images.unsplash.com/photo-1609618395181-1ca1f14fddc9?w=800', true, 7, true),
(gen_random_uuid(), 'Avocado Toast & Poached Egg', 'sarapan', 45000, 'Roti sourdough panggang disiram alpukat mentega tumbuk, poached egg lumer, dan keju feta.', 'spesial', 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800', true, 8, true),
(gen_random_uuid(), 'Sourdough Club Sandwich', 'sarapan', 48000, 'Roti sourdough lapis daging dada ayam asap, telur, keju cheddar, dada kalkun & sayuran segar.', null, 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800', true, 9, false),
(gen_random_uuid(), 'Fluffy Pancake Stack', 'sarapan', 38000, 'Pancake ala Jepang empuk ditumpuk dengan butter leleh, maple syrup murni, dan buah beri segar.', 'baru', 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800', true, 10, false),

-- Malam
(gen_random_uuid(), 'Nasi Goreng Rempah Banyuwangi', 'malam', 42000, 'Nasi goreng bumbu rempah pilihan dilengkapi sate ayam, telur mata sapi, dan kerupuk udang.', 'favorit', 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800', true, 11, true),
(gen_random_uuid(), 'Sirloin Steak Rice Bowl', 'malam', 58000, 'Irisan daging sapi sirloin panggang empuk dengan saus butter soyu manis & garlic chips di atas nasi hangat.', 'spesial', 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800', true, 12, true),
(gen_random_uuid(), 'Creamy Carbonara Pasta', 'malam', 49000, 'Pasta fettuccine dengan saus krim gurih, smoked beef kriuk, dan taburan keju parmesan melimpah.', null, 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800', true, 13, false),

-- Pastri
(gen_random_uuid(), 'Butter Croissant Premium', 'pastri', 28000, 'Croissant ala Prancis renyah berlayer dengan aroma mentega mentah berkualitas tinggi.', 'favorit', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800', true, 14, true),
(gen_random_uuid(), 'Pain Au Chocolat', 'pastri', 32000, 'Pastri berlapis dengan isian Belgian dark chocolate leleh yang manis pahit seimbang.', null, 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=800', true, 15, false),
(gen_random_uuid(), 'Basque Burnt Cheesecake', 'pastri', 38000, 'Cheesecake panggang berkerak caramel luar dengan tekstur dalam yang super lumer & creamy.', 'spesial', 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800', true, 16, true);

-- Perbaiki kategori Nasi Kuning yang tadi sempat bertuliskan 'kopi' di SQL line atas
UPDATE public.menu_items SET category = 'sarapan' WHERE name = 'Nasi Kuning Special Koffie';


-- ==============================================================================
-- 3. SEED TABLE: EVENTS
-- Type options: 'mendatang', 'workshop', 'gratis', 'rutin'
-- Status options: 'aktif', 'draft', 'selesai'
-- CTA options: 'RSVP', 'DAFTAR', 'PESAN TIKET', 'INFO'
-- ==============================================================================
INSERT INTO public.events (id, type, badge, title, description, date, start_time, end_time, is_recurring, recurring_pattern, cta, cta_link, image, status, is_published) VALUES
(
  gen_random_uuid(),
  'mendatang',
  'LIVE MUSIC',
  'Malam Jazz & Acoustic Session',
  'Nikmati malam minggu syahdu ditemani penampilan musik jazz & akustik dari musisi lokal ternama sambil menikmati sajian kopi favoritmu.',
  CURRENT_DATE + INTERVAL '7 days',
  '19:00:00',
  '22:00:00',
  false,
  null,
  'RSVP',
  '#reservasi',
  'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800',
  'aktif',
  true
),
(
  gen_random_uuid(),
  'workshop',
  'LIMITED SEAT',
  'Latte Art & Manual Brew Workshop',
  'Pelajari rahasia membuat latte art sempurna dan teknik menyeduh manual brew dari Head Barista juara nasional kami. Termasuk sertifikat & beans.',
  CURRENT_DATE + INTERVAL '14 days',
  '10:00:00',
  '13:00:00',
  false,
  null,
  'DAFTAR',
  'https://wa.me/6281234567890?text=Halo%20saya%20ingin%20daftar%20Workshop%20Latte%20Art',
  'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800',
  'aktif',
  true
),
(
  gen_random_uuid(),
  'gratis',
  'FREE ENTRANCE',
  'Specialty Coffee Cupping Session',
  'Cicipi dan eksplorasi profil rasa dari 8 jenis biji kopi specialty terbaik Indonesia bersama komunitas pecinta kopi Jember.',
  CURRENT_DATE + INTERVAL '21 days',
   me: '15:00:00' /* fixed below */,
  '17:00:00',
  false,
  null,
  'INFO',
  '#',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
  'aktif',
  true
),
(
  gen_random_uuid(),
  'rutin',
  'SETIAP JUMAT',
  'Friday Board Games & Chill Community',
  'Tempat kumpul seru main boardgame favorit bareng teman atau kenalan baru tiap jumat malam. Dapatkan diskon 10% untuk semua varian iced coffee.',
  CURRENT_DATE + INTERVAL '3 days',
  '18:30:00',
  '21:30:00',
  true,
  'weekly',
  'RSVP',
  '#',
  'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800',
  'aktif',
  true
),
(
  gen_random_uuid(),
  'mendatang',
  'DRAFT',
  'Open Mic & Poetry Night',
  'Malam ekspresi seni, puisi, dan komedi tunggal untuk umum. Tunjukkan bakat terbaikmu di panggung KOFFIE.',
  CURRENT_DATE + INTERVAL '30 days',
  '19:30:00',
  '22:00:00',
  false,
  null,
  'PESAN TIKET',
  '#',
  'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800',
  'draft',
  false
),
(
  gen_random_uuid(),
  'mendatang',
  'SELESAI',
  'KOFFIE Anniversary & Roasting Demo',
  'Perayaan ulang tahun KOFFIE dengan sesi demonstrasi roasting biji kopi live dan pengundian doorprize menarik.',
  CURRENT_DATE - INTERVAL '14 days',
  '13:00:00',
  '17:00:00',
  false,
  null,
  'INFO',
  '#',
  'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800',
  'selesai',
  true
);

-- Fix syntax anomaly on third record start_time
UPDATE public.events SET start_time = '15:00:00' WHERE title = 'Specialty Coffee Cupping Session';


-- ==============================================================================
-- 4. SEED TABLE: TESTIMONIALS
-- Status options: 'pending', 'published', 'hidden'
-- Rating stars: 1 to 5
-- ==============================================================================
INSERT INTO public.testimonials (id, name, role, quote, avatar, stars, status, sort_order) VALUES
(
  gen_random_uuid(),
  'Budi Santoso',
  'Pelanggan Setia & Penikmat Kopi',
  'Kopi Amber Latte di KOFFIE adalah yang terbaik di Jember! Suasananya hangat, estetik, dan stafnya sangat ramah. Tempat langganan saya setiap akhir pekan.',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
  5,
  'published',
  1
),
(
  gen_random_uuid(),
  'Siti Nurhaliza',
  'Founder Digital Studio & Freelancer',
  'Tempat yang sangat ideal untuk WFC (Work From Cafe). Wi-Fi super cepat, banyak colokan listrik, dan tidak bising. Croissant menteganya sangat renyah!',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
  5,
  'published',
  2
),
(
  gen_random_uuid(),
  'Rian Ardianto',
  'Coffee Enthusiast',
  'Single Origin Ijen di sini punya karakter taste note citrus dan floral yang sangat jelas. Salut buat baristanya yang faham betul proses brewing.',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
  5,
  'published',
  3
),
(
  gen_random_uuid(),
  'Dewi Anggraini',
  'Mahasiswi Universitas Jember',
  'Nasi Kuning Specialnya porsinya kenyang banget dan harganya ramah kantong mahasiswa. Paling suka nongkrong di area outdoor lantai dua pas sore hari.',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200',
  5,
  'published',
  4
),
(
  gen_random_uuid(),
  'Hendra Pratama',
  'Content Creator',
  'Lighting di dalam cafe bagus banget buat foto instagram dan rekaman vlog. Desain interior kayu warm-nya dapet banget vibe scandinavian-nya.',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
  4,
  'published',
  5
),
(
  gen_random_uuid(),
  'Maya Indah',
  'Pengunjung Luar Kota',
  'Sangat terkesan dengan Basque Burnt Cheesecake-nya! Rasa manisnya pas dan leleh di mulut. Pasti akan balik lagi kalau ke Jember.',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
  5,
  'pending',
  6
),
(
  gen_random_uuid(),
  'Ahmad Dani',
  'Software Engineer',
  'Pelayanan cepat meski cafe lagi ramai pengunjung. Nasi goreng rempahnya gurih & wangi.',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200',
  5,
  'pending',
  7
),
(
  gen_random_uuid(),
  'Anonimous Guest',
  'Visitor',
  'Tempatnya sedikit penuh pas jam makan siang.',
  null,
  3,
  'hidden',
  8
);


-- ==============================================================================
-- 5. SEED TABLE: GALLERY_PHOTOS
-- Category options: 'interior', 'food', 'events', 'team'
-- ==============================================================================
INSERT INTO public.gallery_photos (id, url, caption, category, is_active, sort_order, is_hero) VALUES
(
  gen_random_uuid(),
  'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=1200',
  'Suasana Hangat & Estetik Interior Utama KOFFIE',
  'interior',
  true,
  1,
  true
),
(
  gen_random_uuid(),
  'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=1000',
  'Ekstraksi Espresso Double Shot Presisi',
  'food',
  true,
  2,
  false
),
(
  gen_random_uuid(),
  'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1000',
  'Area Bar Espresso Utama & Warm Ambient Light',
  'interior',
  true,
  3,
  false
),
(
  gen_random_uuid(),
  'https://images.unsplash.com/photo-1577982643482-8dae6c60eb23?w=1000',
  'Signature Amber Latte & Butter Croissant Fresh',
  'food',
  true,
  4,
  false
),
(
  gen_random_uuid(),
  'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1000',
  'Pour Over V60 Manual Brewing Experience',
  'food',
  true,
  5,
  false
),
(
  gen_random_uuid(),
  'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1000',
  'Malam Jazz Live Acoustic bersama Komunitas Musisi',
  'events',
  true,
  6,
  false
),
(
  gen_random_uuid(),
  'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1000',
  'Outdoor Garden Terrace & Seating Lounge Area',
  'interior',
  true,
  7,
  false
),
(
  gen_random_uuid(),
  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1000',
  'Tim Barista Profesional & Staf Ramah KOFFIE',
  'team',
  true,
  8,
  false
),
(
  gen_random_uuid(),
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000',
  'Sesi Workshop Latte Art & Masterclass Interaktif',
  'events',
  true,
  9,
  false
),
(
  gen_random_uuid(),
  'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=1000',
  'Freshly Baked Basque Burnt Cheesecake Slice',
  'food',
  true,
  10,
  false
);


-- ==============================================================================
-- 6. SEED TABLE: RESERVATIONS
-- Status options: 'pending', 'confirmed', 'completed', 'cancelled'
-- ==============================================================================
INSERT INTO public.reservations (id, name, phone, email, date, time, guests, special_request, notes, status, created_at) VALUES
(
  gen_random_uuid(),
  'Rendra Wijaya',
  '081234567890',
  'rendra.wijaya@gmail.com',
  CURRENT_DATE,
  '14:00:00',
  4,
  'Mohon siapkan meja di area indoor dekat jendela utama.',
  'Pelanggan konfirmasi via WhatsApp',
  'pending',
  NOW() - INTERVAL '2 hours'
),
(
  gen_random_uuid(),
  'Clarissa Putri',
  '082198765432',
  'clarissa.p@yahoo.com',
  CURRENT_DATE,
  '19:00:00',
  2,
  'Acara ulang tahun singkat, mohon siapkan piring cake kecil & lilin.',
  'Sudah dikonfirmasi oleh admin',
  'confirmed',
  NOW() - INTERVAL '1 day'
),
(
  gen_random_uuid(),
  'Dimas Agung Pratama',
  '085712344321',
  'dimas.agung@techcorp.id',
  CURRENT_DATE + INTERVAL '1 day',
  '16:30:00',
  6,
  'Meeting bisnis internal. Membutuhkan stopkontak/colokan tambahan.',
  'Sudah DP Rp 100.000',
  'confirmed',
  NOW() - INTERVAL '5 hours'
),
(
  gen_random_uuid(),
  'Maya Lestari',
  '081999888777',
  'maya.lestari@outlook.com',
  CURRENT_DATE + INTERVAL '2 days',
  '11:00:00',
  3,
  'Membawa balita, butuh 1 kursi bayi (baby chair).',
  null,
  'pending',
  NOW() - INTERVAL '30 minutes'
),
(
  gen_random_uuid(),
  'Farhan Hidayat',
  '081344556677',
  'farhan.hidayat@gmail.com',
  CURRENT_DATE - INTERVAL '1 day',
  '18:30:00',
  8,
  'Reuni keluarga kecil area semi-outdoor.',
  'Selesai lancar, pembayaran lunas.',
  'completed',
  NOW() - INTERVAL '2 days'
),
(
  gen_random_uuid(),
  'Andi Perkasa',
  '081222333444',
  'andi.perkasa@hotmail.com',
  CURRENT_DATE - INTERVAL '2 days',
  '13:00:00',
  2,
  'Lunch meeting.',
  'Selesai.',
  'completed',
  NOW() - INTERVAL '3 days'
),
(
  gen_random_uuid(),
  'Siska Yulia',
  '085211223344',
  'siska.yulia@gmail.com',
  CURRENT_DATE - INTERVAL '3 days',
  '20:00:00',
  5,
  'Meja sofa dekat panggung.',
  'Dibatalkan oleh pelanggan via telepon karena ada kendala jadwal.',
  'cancelled',
  NOW() - INTERVAL '4 days'
);

-- ==============================================================================
-- 7. SEED TABLE: BUSINESS_SETTINGS
-- ==============================================================================
INSERT INTO public.business_settings (id, name, tagline, description, address, city, phone, whatsapp, email, instagram, facebook, maps_url, rating_stat, years_stat, origins_stat) VALUES
(
  gen_random_uuid(),
  'KOFFIE',
  'Tempat kopi diseduh dengan hati di Banyuwangi.',
  'Kafe spesialti dengan suasana nyaman untuk bekerja, bersantai, atau gathering dengan teman.',
  'Jl. Ikan Tongkol No. 42, Banyuwangi, Jawa Timur 68419',
  'Banyuwangi',
  '+62 333 412 800',
  '+62 812 3456 7890',
  'halo@koffie.id',
  '@koffie.bwi',
  'https://facebook.com/koffie.bwi',
  'https://www.google.com/maps?q=Banyuwangi,Jawa+Timur',
  '4.9',
  '6+',
  '12'
);

-- ==============================================================================
-- 8. SEED TABLE: HERO_CONTENT
-- ==============================================================================
INSERT INTO public.hero_content (id, title, subtitle, description, location_label, image_url, primary_cta_text, primary_cta_link, secondary_cta_text, secondary_cta_link, is_active) VALUES
(
  gen_random_uuid(),
  'Setiap Cangkir Punya Cerita di Banyuwangi.',
  '"Kafe itu suasana hati—dan kami selalu tidak terburu-buru."',
  'Kopi diseduh perlahan, pastri yang baru keluar dari oven, dan sudut kota yang terasa seperti rumah. Datanglah apa adanya. Berlama-lama sesukamu.',
  'Est. 2018 · Banyuwangi, Jawa Timur',
  'https://images.unsplash.com/photo-1442550528053-c431ecb55509?auto=format&fit=crop&w=1800&q=80',
  'Pesan Meja',
  '#reservasi',
  'Jelajahi Menu',
  '#menu',
  true
);

-- ==============================================================================
-- 9. SEED TABLE: MARQUEE_ITEMS
-- ==============================================================================
INSERT INTO public.marquee_items (id, text, sort_order, is_active) VALUES
(gen_random_uuid(), 'PLAYLIST PILIHAN', 1, true),
(gen_random_uuid(), 'BIJI BERETIKA', 2, true),
(gen_random_uuid(), 'ACARA PRIVAT', 3, true),
(gen_random_uuid(), 'RAMAH ANJING', 4, true),
(gen_random_uuid(), 'MALAM JAZZ', 5, true),
(gen_random_uuid(), 'WORKSHOP ROASTING', 6, true),
(gen_random_uuid(), 'SPECIALTY COFFEE', 7, true);

-- ==============================================================================
-- 10. SEED TABLE: OPERATING_HOURS
-- ==============================================================================
INSERT INTO public.operating_hours (id, day, open_time, close_time, is_open, sort_order) VALUES
(gen_random_uuid(), 'Senin – Jumat', '07.00', '22.00', true, 1),
(gen_random_uuid(), 'Sabtu', '08.00', '23.00', true, 2),
(gen_random_uuid(), 'Minggu', '09.00', '21.00', true, 3);

-- Done notification
SELECT 'Database KOFFIE Café berhasil di-seed dengan data lengkap!' as message;

