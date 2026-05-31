export interface MenuItem {
  name: string;
  price: string;
  description: string;
  badge?: string;
  image?: string;
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
  type: "event" | "workshop" | "free";
  badge: string;
  title: string;
  description: string;
  schedule: string;
  cta: string;
  image: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatar: string;
}
