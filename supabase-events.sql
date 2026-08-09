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
