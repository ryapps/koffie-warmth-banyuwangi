import { create } from "zustand";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { MenuItem } from "../types/index";

interface MenuStore {
  items: MenuItem[];
  isLoading: boolean;
  error: string | null;
  loadItems: () => Promise<void>;
  addItem: (item: Omit<MenuItem, "id">) => Promise<void>;
  updateItem: (id: string, data: Partial<MenuItem>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  toggleStatus: (id: string) => Promise<void>;
  reorderItems: (items: MenuItem[]) => void;
  getItems: () => MenuItem[];
}

type MenuRow = {
  id: string;
  name: string;
  category: MenuItem["category"];
  price: number;
  description: string;
  badge: MenuItem["badge"];
  image: string | null;
  is_active: boolean;
  sort_order: number;
  featured: boolean;
};

const initialMenuData: MenuItem[] = [
  {
    id: "1",
    name: "Amber Latte",
    category: "kopi",
    price: 42000,
    description: "Espresso dengan susu hangat dan foam amber yang lembut",
    badge: null,
    image: "https://images.unsplash.com/photo-1577982643482-8dae6c60eb23?w=400",
    isActive: true,
    order: 1,
  },
  {
    id: "2",
    name: "Kopi Jember Single Origin",
    category: "kopi",
    price: 38000,
    description: "Kopi specialty dari perkebunan lokal Jember",
    badge: "single-origin",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?w=400",
    isActive: true,
    order: 2,
  },
  {
    id: "3",
    name: "Nasi Kuning",
    category: "sarapan",
    price: 35000,
    description: "Nasi kuning dengan telur dan sambal matah",
    badge: "favorit",
    image: "https://images.unsplash.com/photo-1609618395181-1ca1f14fddc9?w=400",
    isActive: true,
    order: 3,
  },
];

const removeUndefined = <T extends Record<string, unknown>>(payload: T) =>
  Object.fromEntries(Object.entries(payload).filter(([, value]) => value !== undefined));

const toMenuItem = (row: MenuRow): MenuItem => ({
  id: row.id,
  name: row.name,
  category: row.category,
  price: row.price,
  description: row.description,
  badge: row.badge,
  image: row.image || undefined,
  isActive: row.is_active,
  order: row.sort_order,
  featured: row.featured,
});

const toMenuPayload = (item: Partial<MenuItem>) =>
  removeUndefined({
    name: item.name,
    category: item.category,
    price: item.price,
    description: item.description,
    badge: item.badge || null,
    image: item.image || null,
    is_active: item.isActive,
    sort_order: item.order,
    featured: item.featured,
  });

export const useMenuStore = create<MenuStore>((set, get) => ({
  items: initialMenuData,
  isLoading: false,
  error: null,

  loadItems: async () => {
    if (!isSupabaseConfigured || !supabase) return;

    set({ isLoading: true, error: null });
    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }

    set({ items: (data as MenuRow[]).map(toMenuItem), isLoading: false });
  },

  addItem: async (item: Omit<MenuItem, "id">) => {
    if (!isSupabaseConfigured || !supabase) {
      set((state: MenuStore) => ({
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
      .from("menu_items")
      .insert(toMenuPayload({ ...item, order: item.order || get().items.length + 1 }))
      .select("*")
      .single();

    if (error) throw error;

    set((state) => ({ items: [...state.items, toMenuItem(data as MenuRow)] }));
  },

  updateItem: async (id: string, data: Partial<MenuItem>) => {
    if (!isSupabaseConfigured || !supabase) {
      set((state: MenuStore) => ({
        items: state.items.map((item) => (item.id === id ? { ...item, ...data } : item)),
      }));
      return;
    }

    const { data: updated, error } = await supabase
      .from("menu_items")
      .update(toMenuPayload(data))
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;

    set((state: MenuStore) => ({
      items: state.items.map((item) => (item.id === id ? toMenuItem(updated as MenuRow) : item)),
    }));
  },

  deleteItem: async (id: string) => {
    if (!isSupabaseConfigured || !supabase) {
      set((state: MenuStore) => ({
        items: state.items.filter((item) => item.id !== id),
      }));
      return;
    }

    const { error } = await supabase.from("menu_items").delete().eq("id", id);

    if (error) throw error;

    set((state: MenuStore) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  toggleStatus: async (id: string) => {
    const item = get().items.find((menuItem) => menuItem.id === id);
    if (!item) return;

    await get().updateItem(id, { isActive: !item.isActive });
  },

  reorderItems: (items: MenuItem[]) => set({ items }),

  getItems: () => get().items.filter((item: MenuItem) => item.isActive),
}));
