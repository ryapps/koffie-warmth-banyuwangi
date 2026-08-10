# KOFFIE Café Banyuwangi

> **Bahasa / Language:** [English](README.md) | **Bahasa Indonesia**

---

> Pengalaman Kafe Kopi Spesialis & Sistem Manajemen Admin Terintegrasi

## Ikhtisar

**KOFFIE Café Banyuwangi** adalah aplikasi web full-stack yang dirancang untuk coffee shop spesialis di Banyuwangi, Jawa Timur. Aplikasi ini menghubungkan pengalaman digital pelanggan yang elegan dengan sistem manajemen operasional yang efisien bagi pemilik dan staf kafe.

Pelanggan dapat menjelajahi menu kopi artisan dan makanan, melihat acara komunitas & workshop mendatang, melihat galeri foto suasana kafe, mengecek jam operasional & lokasi, serta mengajukan reservasi meja secara online. Dari sisi operasional, pengelola kafe dapat masuk ke Panel Admin yang aman untuk mengelola item menu, meninjau dan memperbarui reservasi meja pelanggan, mengatur acara, memoderasi ulasan pelanggan, mengelola aset foto, dan memperbarui informasi operasional kafe secara real-time.

---

## Permasalahan

Coffee shop spesialis sering menghadapi tantangan operasional dan keterlibatan digital, seperti:

1. **Reservasi Meja Manual & Tidak Terorganisir**: Reservasi yang dilakukan melalui telepon atau DM media sosial yang terpisah sering menyebabkan pemesanan ganda, data pelanggan hilang, dan jadwal yang tidak terkonfirmasi.
2. **Menu Statis & Usang**: Menu cetak atau digital statis tidak dapat secara dinamis mencerminkan penawaran kopi musiman, ketersediaan pastri harian, atau perubahan harga.
3. **Visibilitas Rendah untuk Workshop & Acara**: Acara komunitas, musik live, dan workshop cupping sulit dipromosikan secara efektif hanya melalui media sosial.
4. **Kurangnya Manajemen Konten Terpusat**: Pemilik kafe tanpa keahlian teknis kesulitan menjaga informasi website (jam buka, lokasi, kontak, galeri, ulasan) tetap terbaru.

---

## Solusi

**KOFFIE** menyelesaikan tantangan ini dengan menyediakan platform digital end-to-end yang terbagi menjadi dua antarmuka yang saling terhubung secara mulus:

* **Pengalaman Pelanggan (Customer Experience)**: Aplikasi web responsif berdesain hangat dan premium tempat pelanggan dapat dengan mudah menjelajahi menu ber-kategori, mempelajari asal-usul biji kopi, melihat suasana lokasi, dan mengajukan pemesanan meja dalam hitungan detik.
* **Pengalaman Manajemen (Management Experience)**: Dashboard administratif tempat staf kafe dapat memantau reservasi meja yang masuk, mengontrol item menu & ketersediaannya, mempublikasikan acara mendatang, memoderasi ulasan pelanggan, dan memperbarui konfigurasi bisnis tanpa perlu menyentuh kode.

---

## Pengguna

Aplikasi ini melayani dua peran pengguna utama:

### 1. Pelanggan / Pengunjung (Customer)
* Membaca penawaran makanan, minuman, pastri, dan kopi spesialis dengan tag filter (Single Origin, Favorit, Musiman).
* Mengajukan reservasi meja online dengan menentukan jumlah tamu, tanggal, waktu, dan catatan khusus.
* Menemukan acara kafe mendatang, malam musik komunitas, dan workshop kopi.
* Menjelajahi foto interior dan makanan dalam galeri interaktif.
* Melihat jam operasional, lokasi di Google Maps, dan menghubungi kafe via WhatsApp atau Telepon.

### 2. Staf / Admin
* Manajer atau pemilik kafe yang mengelola operasional harian.
* Meninjau reservasi meja yang masuk dan memperbarui status (`pending` → `confirmed` → `completed` / `cancelled`).
* Melakukan operasi CRUD penuh pada item menu (menambah minuman/makanan baru, mengatur kategori, beralih status ketersediaan, menetapkan badge).
* Membuat dan mengelola acara, workshop, dan agenda komunitas.
* Memoderasi ulasan pelanggan sebelum ditampilkan secara publik.
* Mengelola aset foto galeri dan pengaturan bisnis kafe (jam buka, telepon, email, alamat).

---

## Fitur

### Fitur Pelanggan (Customer Features)

* **Showcase Menu Dinamis**: Filter item berdasarkan kategori (Kopi, Pastri, Brunch, Beverage) atau badge (Single Origin, Favorit, Musiman) dengan harga & deskripsi real-time.
* **Sistem Reservasi Meja Online**: Modal interaktif dan bagian khusus untuk memesan meja dengan mengisi nama, kontak, tanggal, jam, jumlah tamu, dan permintaan khusus.
* **Acara & Workshop Komunitas**: Menampilkan acara mendatang (misal: Malam Jazz, Workshop Cupping) lengkap dengan tanggal, jam, badge status, dan tombol aksi.
* **Galeri Foto Suasana**: Grid foto ber-kategori (Interior, Makanan, Acara, Tim) yang menampilkan ruangan fisik kafe dan proses pembuatan kopi.
* **Ulasan Pelanggan (Testimonial)**: Ulasan pelanggan terverifikasi dengan rating bintang, kutipan ulasan, dan tampilan skor rata-rata.
* **Lokasi & Jam Buka Interaktif**: Tampilan Google Maps terintegrasi, rincian jadwal mingguan, dan aksi kontak langsung.
* **Bar Navigasi Mobile (Floating Bar)**: Bar aksi melayang di bagian bawah khusus tampilan mobile untuk panggilan cepat, lokasi, dan reservasi.
* **Langganan Newsletter**: Formulir buku tamu untuk berlangganan pengumuman menu musiman dan kabar kafe.

### Fitur Manajemen (Management Features)

* **Autentikasi Admin Aman**: Login kredensial demo (`admin@koffie.id` / `koffie2024`) dengan proteksi rute dan batas waktu sesi 8 jam.
* **Dashboard Operasional Interaktif**: Kartu statistik utama yang menampilkan total item menu, acara mendatang, antrean reservasi hari ini, reservasi menunggu konfirmasi, dan rating rata-rata pelanggan.
* **Manajemen Item Menu**: Tambah, edit, hapus, atau atur status aktif/nonaktif makanan & minuman beserta kategori dan badge.
* **Manajemen Antrean Reservasi**: Filter reservasi berdasarkan status, periksa catatan & jumlah tamu pelanggan, konfirmasi pemesanan, atau batalkan reservasi.
* **Pengelola Acara & Workshop**: Buat acara komunitas baru, edit banner/jadwal acara, dan ubah status aktif/draft/selesai.
* **Pengelola Aset Galeri Foto**: Upload dan kategorikan foto galeri, atur sorotan foto utama (hero), dan hapus media lama.
* **Moderasi Ulasan**: Tinjau masukan yang masuk, setujui untuk ditampilkan secara publik, atau sembunyikan ulasan yang tidak sesuai.
* **Konfigurasi Profil & Jam Buka Kafe**: Edit nama kafe, tagline, alamat, rincian kontak, akun media sosial, dan jam operasional harian.
* **Tool Seeding Database Otomatis**: Utilitas pengisian database satu kali klik untuk mengisi seluruh tabel dengan data sampel lengkap saat demonstrasi awal.

---

## Alur Pelanggan (Customer Flow)

```text
Kunjungi Website
    ↓
Jelajahi Menu & Filter Kategori (Kopi / Pastri / Brunch)
    ↓
Lihat Suasana Kafe & Acara Komunitas
    ↓
Klik "Pesan Meja" / Buka Modal Reservasi
    ↓
Isi Rincian Reservasi (Nama, Tanggal, Waktu, Tamu, Catatan)
    ↓
Kirim Permintaan Reservasi
    ↓
Reservasi Diterima oleh Panel Admin untuk Dikonfirmasi Staff
```

### Penjelasan Tahapan
1. **Kunjungi Website**: Pelanggan masuk ke halaman utama dan merasakan atmosfer brand, filosofi, dan statistik utama.
2. **Jelajahi Menu**: Pelanggan memfilter pilihan kopi, pastri, atau makanan brunch sesuai selera.
3. **Lihat Suasana**: Pelanggan mengecek kilasan acara lalu dan foto interior.
4. **Buka Reservasi**: Pelanggan menekan tombol reservasi pada navigasi, floating bar, atau bagian lokasi.
5. **Kirim Form**: Pelanggan mengisikan data kontak, tanggal, waktu kedatangan, jumlah orang, dan catatan khusus.
6. **Pemrosesan**: Sistem menyimpan catatan reservasi ke antrean backend untuk konfirmasi staf.

---

## Alur Manajemen (Management Flow)

```text
Login Admin (/admin/login)
    ↓
Dashboard Overview (/admin/dashboard)
    ↓
Pilih Modul Manajemen (Reservasi / Menu / Acara / Galeri / Pengaturan)
    ↓
Eksekusi Aksi (Tambah / Edit / Ubah Status / Hapus)
    ↓
Perubahan Persisten di Database / State
    ↓
Pembaruan Langsung Terrefleksi pada Antarmuka Pelanggan
```

### Penjelasan Tahapan
1. **Login Admin**: Staf melakukan autentikasi menggunakan kredensial admin.
2. **Dashboard Overview**: Staf meninjau metrik cepat (misal: reservasi pending yang butuh konfirmasi).
3. **Pilih Modul**: Staf berpindah ke panel yang relevan melalui sidebar atau tombol aksi cepat.
4. **Eksekusi Aksi**: Staf mengonfirmasi reservasi meja, menyesuaikan harga menu, atau menambah acara baru.
5. **Sinkronisasi Real-Time**: Data terbaru tersimpan di Supabase/state dan langsung terlihat pada website pelanggan.

---

## Pengalaman Pelanggan (Customer Experience)

Antarmuka pelanggan dirancang mengutamakan **kehangatan, kejelasan, dan kemudahan transaksi**:

* **Visual Atmosferik**: Tipografi elegan (Playfair Display & DM Sans), skema warna hangat espresso & amber, serta sentuhan glassmorphism menciptakan etalase digital yang ramah.
* **Reservasi Tanpa Hambatan**: Pelanggan dapat mengajukan pemesanan meja dari bagian manapun di halaman tanpa perlu berpindah halaman atau mendaftar akun yang rumit.
* **Akses Informasi Cepat**: Jam buka, petunjuk arah Google Maps, dan pesan WhatsApp satu kali klik selalu mudah dijangkau di layar komputer maupun HP.

---

## Pengalaman Manajemen (Management Experience)

Antarmuka administratif berfokus pada **kecepatan, kontrol operasional, dan kemudahan**:

* **Ringkasan Terpusat**: Staf dapat langsung melihat reservasi hari ini dan metrik kunci begitu berhasil masuk.
* **Ubah Status Instan**: Mengubah status reservasi dari `pending` menjadi `confirmed` atau `completed` hanya membutuhkan satu klik.
* **Form Modal Terstruktur**: Menambah atau mengedit item menu dan acara dipandu oleh modal form rapi dengan notifikasi toast instan.

---

## Tampilan Antarmuka (UI Showcase)

> Tangkapan layar akan ditambahkan setelah pengambilan UI final.

### Antarmuka Pelanggan (Customer Interface)
* **Halaman Utama & Hero Section**: Pengenalan brand, filosofi, dan tombol aksi utama.
* **Menu Interaktif**: Grid makanan dan minuman ber-kategori dengan indikator badge.
* **Modal Reservasi**: Form pemesanan meja bersih dengan pemilih tanggal/waktu.
* **Galeri Suasana**: Grid foto ruangan dan produk dengan tab filter.
* **Lokasi & Jam Buka**: Peta Google Maps terintegrasi, tabel jam operasional, dan tombol kontak.

### Antarmuka Manajemen (Management Interface)
* **Layar Login Admin**: Titik masuk aman dengan ringkasan fitur dan panduan kredensial demo.
* **Dashboard Admin**: Ringkasan metrik, tabel reservasi terbaru, feed aktivitas, dan aksi cepat.
* **Manajemen Menu**: Data grid item menu dengan opsi edit/hapus dan indikator status.
* **Manajemen Reservasi**: Antrean reservasi dengan filter status (`pending`, `confirmed`, `completed`, `cancelled`).
* **Manajemen Acara & Galeri**: Form pembuatan konten dan daftar media.

---

## Teknologi (Tech Stack)

### Frontend & Framework Aplikasi
* **Framework**: [TanStack Start](https://tanstack.com/start) (React 19, Server-Side Rendering, File-Based Routing)
* **Routing**: [TanStack Router](https://tanstack.com/router)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com), Custom Design System, Icon Lucide React
* **State Management**: [Zustand](https://github.com/pmndrs/zustand) (dengan persistensi lokal client & sinkronisasi server)
* **Form & Validasi**: [React Hook Form](https://react-hook-form.com), [Zod](https://zod.dev)
* **Komponen UI & Animasi**: Primitif Radix UI, Framer Motion, Sonner / React Hot Toast

### Backend & Database
* **Database & BaaS**: [Supabase](https://supabase.com) (PostgreSQL Database, Real-Time Client)
* **Server Logic**: TanStack Start Server Functions

### Testing & Pengujian
* **Test Runner**: [Vitest](https://vitest.dev), Testing Library React
* **Kualitas Kode**: ESLint, Prettier, TypeScript `tsc`

---

## Struktur Project

```text
koffie/
├── src/
│   ├── admin/                  # Sistem Manajemen Admin
│   │   ├── components/         # Komponen UI Admin (Layout, Sidebar, Form, Modal)
│   │   ├── context/            # Context Autentikasi Admin
│   │   ├── guards/             # Guard rute ProtectedRoute
│   │   ├── hooks/              # Custom hook Admin (useAuth)
│   │   └── pages/              # Halaman Admin (Dashboard, Menu, Acara, Reservasi, dll.)
│   ├── components/             # Komponen Antarmuka Pelanggan
│   │   ├── layout/             # Navbar, Footer, FloatingActionBar
│   │   ├── sections/           # Hero, Menu, OurSpace, Events, Reservation, FindUs, dll.
│   │   └── ui/                 # Primitif UI Reusable (Button, Modal, Card, Badge, dll.)
│   ├── data/                   # Konfigurasi bisnis & metadata brand statis
│   ├── hooks/                  # Hook global bersama (useScrolled, useMobile)
│   ├── lib/                    # Client Supabase, helper seed, fungsi utilitas
│   ├── routes/                 # Rute file-based router (__root, index, /admin/*)
│   ├── store/                  # Store state Zustand (menu, events, reservations, dll.)
│   ├── test/                   # Integration & unit test untuk store dan komponen
│   └── types/                  # Antarmuka TypeScript & model domain
├── .env.example                # Template variabel lingkungan
├── package.json                # Manifest project & runner script
├── supabase-seed.sql           # Script skema database & sampel data
└── vite.config.ts              # Konfigurasi bundler Vite & build
```

---

## Panduan Memulai (Getting Started)

### Prasyarat

* Node.js v18.x atau versi lebih baru
* Package manager: npm, pnpm, atau bun

### Langkah Instalasi

1. **Clone repository**:
   ```bash
   git clone https://github.com/your-username/koffie.git
   cd koffie
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Atur Variabel Lingkungan (Environment Variables)**:
   Salin file `.env.example` menjadi `.env`:
   ```bash
   cp .env.example .env
   ```
   Isikan kredensial project Supabase Anda jika ingin terhubung ke database live:
   ```env
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
   *(Catatan: Jika kredensial Supabase dikosongkan, aplikasi akan secara otomatis berjalan dalam moda fallback menggunakan local state Zustand).*

4. **Setup Database (Opsional untuk sinkronisasi Supabase live)**:
   Jalankan perintah SQL dari file `supabase-events.sql` dan `supabase-seed.sql` pada SQL Editor Supabase Anda untuk membuat tabel (`menu_items`, `events`, `testimonials`, `gallery_photos`, `reservations`, `business_settings`, `hero_content`, `marquee_items`, `operating_hours`) dan mengisikan sampel data awal.

5. **Pengelolaan Konten Bisnis Dinamis**:
   - **Konten Hero**: Judul, subtitle, deskripsi, kutipan, label lokasi, dan gambar latar belakang (dengan Supabase Storage) dikelola di Admin Panel (`/admin/hero`).
   - **Teks Marquee**: Teks berjalan aktif, urutan, dan tampilan dikelola di Admin Panel (`/admin/marquee`).
   - **Informasi Bisnis & Jam Operasional**: Detail kafe, alamat, kontak, sosmed, URL Google Maps, dan jam operasional dikelola di Admin Panel (`/admin/settings`).

6. **Jalankan Development Server**:
   ```bash
   npm run dev
   ```
   Buka `http://localhost:3000` pada browser Anda untuk melihat antarmuka pelanggan.
   Buka `http://localhost:3000/admin/login` untuk masuk ke Panel Manajemen Admin.

### Script yang Tersedia

* `npm run dev`: Menjalankan server pengembangan Vite dengan HMR.
* `npm run build`: Mengompilasi bundle produksi untuk client dan server.
* `npm run lint`: Menjalankan verifikasi ESLint pada seluruh codebase.
* `npm run test`: Menjalankan seluruh pengujian unit Vitest.

---

## Status Project

**Konsep & Project Portfolio**

Repository ini merupakan project portfolio yang menunjukkan rekayasa web full-stack modern, server-side rendering dengan TanStack Start, desain UI responsif, integrasi database dengan Supabase, pola manajemen state, dan alur kerja sistem administratif.

---

## Rencana Pengembangan (Future Improvements)

* **Sistem Pemesanan Online & Keranjang**: Memungkinkan pelanggan memesan take-away secara online dengan sistem keranjang belanja dan nomor antrean otomatis.
* **Integrasi Payment Gateway**: Integrasi Midtrans / Xendit untuk pembayaran online instan (QRIS, E-Wallet, Virtual Account).
* **Notifikasi Otomatis WhatsApp / Email**: Pengiriman notifikasi WhatsApp otomatis kepada pelanggan saat staf mengonfirmasi atau mengubah status reservasi meja.
* **Pemesanan via QR Code Meja**: Sistem pemesanan dari meja kafe dengan memindai kode QR yang otomatis mengisikan nomor meja.
* **Laporan Analytics Penjualan**: Grafik statistik pendapatan, grafik menu paling diminati, dan analisis jam ramai di dashboard admin.
