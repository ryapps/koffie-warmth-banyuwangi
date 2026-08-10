create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null default 'kopi' check (category in ('kopi', 'sarapan', 'malam', 'pastri')),
  price integer not null default 0,
  description text not null default '',
  badge text,
  image text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  type text not null default 'mendatang' check (type in ('mendatang', 'workshop', 'gratis', 'rutin')),
  badge text,
  title text not null,
  description text not null default '',
  date date not null,
  start_time time not null,
  end_time time,
  is_recurring boolean not null default false,
  recurring_pattern text check (recurring_pattern is null or recurring_pattern in ('weekly', 'monthly')),
  cta text not null default 'RSVP' check (cta in ('DAFTAR', 'PESAN TIKET', 'RSVP', 'INFO')),
  cta_link text not null default '#',
  image text not null default '',
  status text not null default 'aktif' check (status in ('aktif', 'draft', 'selesai')),
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  quote text not null,
  avatar text,
  stars integer not null default 5 check (stars between 1 and 5),
  status text not null default 'pending' check (status in ('pending', 'published', 'hidden')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery_photos (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  caption text,
  category text check (category is null or category in ('interior', 'food', 'events', 'team')),
  is_active boolean not null default true,
  sort_order integer not null default 0,
  is_hero boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  date date not null,
  time time not null,
  guests integer not null default 1 check (guests > 0),
  special_request text,
  notes text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists menu_items_set_updated_at on public.menu_items;
create trigger menu_items_set_updated_at
before update on public.menu_items
for each row execute function public.set_updated_at();

drop trigger if exists events_set_updated_at on public.events;
create trigger events_set_updated_at
before update on public.events
for each row execute function public.set_updated_at();

drop trigger if exists testimonials_set_updated_at on public.testimonials;
create trigger testimonials_set_updated_at
before update on public.testimonials
for each row execute function public.set_updated_at();

drop trigger if exists gallery_photos_set_updated_at on public.gallery_photos;
create trigger gallery_photos_set_updated_at
before update on public.gallery_photos
for each row execute function public.set_updated_at();

drop trigger if exists reservations_set_updated_at on public.reservations;
create trigger reservations_set_updated_at
before update on public.reservations
for each row execute function public.set_updated_at();

alter table public.menu_items enable row level security;
alter table public.events enable row level security;
alter table public.testimonials enable row level security;
alter table public.gallery_photos enable row level security;
alter table public.reservations enable row level security;

drop policy if exists "Menu items are publicly readable" on public.menu_items;
create policy "Menu items are publicly readable"
on public.menu_items for select
using (true);

drop policy if exists "Anon can manage menu items" on public.menu_items;
create policy "Anon can manage menu items"
on public.menu_items for all
using (true)
with check (true);

drop policy if exists "Events are publicly readable" on public.events;
create policy "Events are publicly readable"
on public.events for select
using (true);

drop policy if exists "Anon can manage events" on public.events;
create policy "Anon can manage events"
on public.events for all
using (true)
with check (true);

drop policy if exists "Testimonials are publicly readable" on public.testimonials;
create policy "Testimonials are publicly readable"
on public.testimonials for select
using (true);

drop policy if exists "Anon can manage testimonials" on public.testimonials;
create policy "Anon can manage testimonials"
on public.testimonials for all
using (true)
with check (true);

drop policy if exists "Gallery photos are publicly readable" on public.gallery_photos;
create policy "Gallery photos are publicly readable"
on public.gallery_photos for select
using (true);

drop policy if exists "Anon can manage gallery photos" on public.gallery_photos;
create policy "Anon can manage gallery photos"
on public.gallery_photos for all
using (true)
with check (true);

drop policy if exists "Anon can manage reservations" on public.reservations;
create policy "Anon can manage reservations"
on public.reservations for all
using (true)
with check (true);

-- Dynamic Content Tables

create table if not exists public.business_settings (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'KOFFIE',
  tagline text not null default 'Tempat kopi diseduh dengan hati di Banyuwangi.',
  description text not null default 'Kafe spesialti dengan suasana nyaman untuk bekerja, bersantai, atau gathering dengan teman.',
  address text not null default 'Jl. Ikan Tongkol No. 42, Banyuwangi, Jawa Timur 68419',
  city text not null default 'Banyuwangi',
  phone text not null default '+62 333 412 800',
  whatsapp text not null default '+62 812 3456 7890',
  email text not null default 'halo@koffie.id',
  instagram text not null default '@koffie.bwi',
  facebook text,
  maps_url text default 'https://www.google.com/maps?q=Banyuwangi,Jawa+Timur',
  rating_stat text default '4.9',
  years_stat text default '6+',
  origins_stat text default '12',
  updated_at timestamptz not null default now()
);

create table if not exists public.hero_content (
  id uuid primary key default gen_random_uuid(),
  title text not null default 'Setiap Cangkir Punya Cerita di Banyuwangi.',
  subtitle text not null default '"Kafe itu suasana hati—dan kami selalu tidak terburu-buru."',
  description text not null default 'Kopi diseduh perlahan, pastri yang baru keluar dari oven, dan sudut kota yang terasa seperti rumah. Datanglah apa adanya. Berlama-lama sesukamu.',
  location_label text default 'Est. 2018 · Banyuwangi, Jawa Timur',
  image_url text not null default 'https://images.unsplash.com/photo-1442550528053-c431ecb55509?auto=format&fit=crop&w=1800&q=80',
  primary_cta_text text default 'Pesan Meja',
  primary_cta_link text default '#reservasi',
  secondary_cta_text text default 'Jelajahi Menu',
  secondary_cta_link text default '#menu',
  is_active boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.marquee_items (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.operating_hours (
  id uuid primary key default gen_random_uuid(),
  day text not null,
  open_time text not null default '07:00',
  close_time text not null default '22:00',
  is_open boolean not null default true,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

-- Triggers for updated_at
drop trigger if exists business_settings_set_updated_at on public.business_settings;
create trigger business_settings_set_updated_at
before update on public.business_settings
for each row execute function public.set_updated_at();

drop trigger if exists hero_content_set_updated_at on public.hero_content;
create trigger hero_content_set_updated_at
before update on public.hero_content
for each row execute function public.set_updated_at();

drop trigger if exists marquee_items_set_updated_at on public.marquee_items;
create trigger marquee_items_set_updated_at
before update on public.marquee_items
for each row execute function public.set_updated_at();

drop trigger if exists operating_hours_set_updated_at on public.operating_hours;
create trigger operating_hours_set_updated_at
before update on public.operating_hours
for each row execute function public.set_updated_at();

-- RLS Policies
alter table public.business_settings enable row level security;
alter table public.hero_content enable row level security;
alter table public.marquee_items enable row level security;
alter table public.operating_hours enable row level security;

drop policy if exists "Business settings are publicly readable" on public.business_settings;
create policy "Business settings are publicly readable" on public.business_settings for select using (true);

drop policy if exists "Anon can manage business settings" on public.business_settings;
create policy "Anon can manage business settings" on public.business_settings for all using (true) with check (true);

drop policy if exists "Hero content is publicly readable" on public.hero_content;
create policy "Hero content is publicly readable" on public.hero_content for select using (true);

drop policy if exists "Anon can manage hero content" on public.hero_content;
create policy "Anon can manage hero content" on public.hero_content for all using (true) with check (true);

drop policy if exists "Marquee items are publicly readable" on public.marquee_items;
create policy "Marquee items are publicly readable" on public.marquee_items for select using (true);

drop policy if exists "Anon can manage marquee items" on public.marquee_items;
create policy "Anon can manage marquee items" on public.marquee_items for all using (true) with check (true);

drop policy if exists "Operating hours are publicly readable" on public.operating_hours;
create policy "Operating hours are publicly readable" on public.operating_hours for select using (true);

drop policy if exists "Anon can manage operating hours" on public.operating_hours;
create policy "Anon can manage operating hours" on public.operating_hours for all using (true) with check (true);

