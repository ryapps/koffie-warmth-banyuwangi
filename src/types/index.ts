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
}

export interface GalleryPhoto {
  id?: string;
  url: string;
  caption?: string;
  category?: "interior" | "food" | "events" | "team";
  isActive?: boolean;
  order?: number;
  isHero?: boolean;
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
  name: string;
  tagline: string;
  description: string;
  address: string;
  city: string;
  mapsUrl?: string;
  logo?: string;
  phone: string;
  whatsapp: string;
  email: string;
  instagram?: string;
  tiktok?: string;
  facebook?: string;
  googleMapsLink?: string;
}

export interface OperatingHours {
  day: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

export interface HeroContent {
  label: string;
  headline1: string;
  headline2: string;
  headline3: string;
  quote: string;
  body: string;
  button1Label: string;
  button2Label: string;
  stat1Number: string;
  stat1Label: string;
  stat2Number: string;
  stat2Label: string;
  stat3Number: string;
  stat3Label: string;
  backgroundImage?: string;
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
