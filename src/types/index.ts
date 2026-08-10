// Website Models
export interface MenuItem {
  id?: string;
  name: string;
  category: "kopi" | "sarapan" | "malam" | "pastri";
  price: number;
  description: string;
  badge?: "favorit" | "single-origin" | "musiman" | null;
  image?: string;
  isActive?: boolean;
  order?: number;
  featured?: boolean;
  createdAt?: string;
}

export interface MenuCategory {
  id: string;
  label: string;
  icon: string;
  items: MenuItem[];
}

export interface Event {
  id: string;
  type: "mendatang" | "workshop" | "gratis" | "rutin";
  badge?: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime?: string;
  isRecurring?: boolean;
  recurringPattern?: "weekly" | "monthly";
  cta: "DAFTAR" | "PESAN TIKET" | "RSVP" | "INFO";
  ctaLink: string;
  image: string;
  status: "aktif" | "draft" | "selesai";
  isPublished?: boolean;
  createdAt?: string;
}

export interface Testimonial {
  id?: string;
  name: string;
  role?: string;
  quote: string;
  avatar?: string;
  stars: number;
  status: "pending" | "published" | "hidden";
  order?: number;
  createdAt?: string;
}

export interface GalleryPhoto {
  id?: string;
  url: string;
  caption?: string;
  category?: "interior" | "food" | "events" | "team";
  isActive?: boolean;
  order?: number;
  isHero?: boolean;
  createdAt?: string;
}

export interface Reservation {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  guests: number;
  specialRequest?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt?: string;
  notes?: string;
}

export interface CafeSettings {
  id?: string;
  name: string;
  tagline: string;
  description: string;
  address: string;
  city: string;
  phone: string;
  whatsapp: string;
  email: string;
  instagram?: string;
  facebook?: string;
  mapsUrl?: string;
  ratingStat?: string;
  yearsStat?: string;
  originsStat?: string;
}

export interface OperatingHours {
  id?: string;
  day: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  order?: number;
}

export interface HeroContent {
  id?: string;
  title: string;
  subtitle: string;
  description: string;
  locationLabel?: string;
  imageUrl: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  isActive?: boolean;
}

export interface MarqueeItem {
  id?: string;
  text: string;
  isActive?: boolean;
  order?: number;
}

export interface MarqueeSettings {
  items: MarqueeItem[];
  speed: "slow" | "normal" | "fast";
  backgroundColor: string;
  textColor: string;
  separator: string;
}

// Admin/Auth
export interface AdminUser {
  name: string;
  email: string;
  role: "owner" | "admin";
}

export interface AuthState {
  isAuthenticated: boolean;
  user: AdminUser | null;
  loginTime: number | null;
}

export interface AdminStats {
  totalMenuItems: number;
  activeEvents: number;
  todayReservations: number;
  averageRating: number;
  pendingReservations: number;
  totalReservationsMonth: number;
}
