import { create } from "zustand";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { Testimonial } from "../types/index";

interface TestimonialsStore {
  items: Testimonial[];
  isLoading: boolean;
  error: string | null;
  loadItems: () => Promise<void>;
  addItem: (item: Omit<Testimonial, "id">) => Promise<void>;
  updateItem: (id: string, data: Partial<Testimonial>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  publishItem: (id: string) => Promise<void>;
  reorderItems: (items: Testimonial[]) => void;
  getPublishedItems: () => Testimonial[];
}

type TestimonialRow = {
  id: string;
  name: string;
  role: string | null;
  quote: string;
  avatar: string | null;
  stars: number;
  status: Testimonial["status"];
  sort_order: number;
};

const initialTestimonialsData: Testimonial[] = [
  {
    id: "1",
    name: "Budi Santoso",
    role: "Pelanggan Setia",
    quote:
      "Kopi di KOFFIE adalah yang terbaik di Jember. Suasananya nyaman dan pelayanannya ramah!",
    stars: 5,
    status: "published",
    order: 1,
  },
  {
    id: "2",
    name: "Siti Nurhaliza",
    role: "Pemilik Usaha",
    quote: "Tempat ideal untuk meeting dan diskusi bisnis. Recommended!",
    stars: 5,
    status: "published",
    order: 2,
  },
];

const removeUndefined = <T extends Record<string, unknown>>(payload: T) =>
  Object.fromEntries(Object.entries(payload).filter(([, value]) => value !== undefined));

const toTestimonial = (row: TestimonialRow): Testimonial => ({
  id: row.id,
  name: row.name,
  role: row.role || undefined,
  quote: row.quote,
  avatar: row.avatar || undefined,
  stars: row.stars,
  status: row.status,
  order: row.sort_order,
});

const toTestimonialPayload = (item: Partial<Testimonial>) =>
  removeUndefined({
    name: item.name,
    role: item.role || null,
    quote: item.quote,
    avatar: item.avatar || null,
    stars: item.stars,
    status: item.status,
    sort_order: item.order,
  });

export const useTestimonialsStore = create<TestimonialsStore>((set, get) => ({
  items: initialTestimonialsData,
  isLoading: false,
  error: null,

  loadItems: async () => {
    if (!isSupabaseConfigured || !supabase) return;

    set({ isLoading: true, error: null });
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }

    set({ items: (data as TestimonialRow[]).map(toTestimonial), isLoading: false });
  },

  addItem: async (item) => {
    if (!isSupabaseConfigured || !supabase) {
      set((state) => ({
        items: [
          ...state.items,
          {
            ...item,
            id: crypto.randomUUID(),
            order: (state.items.length || 0) + 1,
          },
        ],
      }));
      return;
    }

    const { data, error } = await supabase
      .from("testimonials")
      .insert(toTestimonialPayload({ ...item, order: item.order || get().items.length + 1 }))
      .select("*")
      .single();

    if (error) throw error;

    set((state) => ({ items: [...state.items, toTestimonial(data as TestimonialRow)] }));
  },

  updateItem: async (id, data) => {
    if (!isSupabaseConfigured || !supabase) {
      set((state) => ({
        items: state.items.map((item) => (item.id === id ? { ...item, ...data } : item)),
      }));
      return;
    }

    const { data: updated, error } = await supabase
      .from("testimonials")
      .update(toTestimonialPayload(data))
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;

    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? toTestimonial(updated as TestimonialRow) : item,
      ),
    }));
  },

  deleteItem: async (id) => {
    if (!isSupabaseConfigured || !supabase) {
      set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      }));
      return;
    }

    const { error } = await supabase.from("testimonials").delete().eq("id", id);

    if (error) throw error;

    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  publishItem: async (id) => {
    await get().updateItem(id, { status: "published" });
  },

  reorderItems: (items) => set({ items }),

  getPublishedItems: () => get().items.filter((item) => item.status === "published"),
}));
