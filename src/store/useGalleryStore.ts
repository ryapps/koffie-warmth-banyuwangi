import { create } from "zustand";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { GalleryPhoto } from "../types/index";

interface GalleryStore {
  items: GalleryPhoto[];
  isLoading: boolean;
  error: string | null;
  loadItems: () => Promise<void>;
  addItem: (item: Omit<GalleryPhoto, "id">) => Promise<void>;
  updateItem: (id: string, data: Partial<GalleryPhoto>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  toggleStatus: (id: string) => Promise<void>;
  reorderItems: (items: GalleryPhoto[]) => void;
  getActiveItems: () => GalleryPhoto[];
  setHeroPhoto: (id: string) => Promise<void>;
}

type GalleryRow = {
  id: string;
  url: string;
  caption: string | null;
  category: GalleryPhoto["category"] | null;
  is_active: boolean;
  sort_order: number;
  is_hero: boolean;
};

const initialGalleryData: GalleryPhoto[] = [];

const removeUndefined = <T extends Record<string, unknown>>(payload: T) =>
  Object.fromEntries(Object.entries(payload).filter(([, value]) => value !== undefined));

const toGalleryPhoto = (row: GalleryRow): GalleryPhoto => ({
  id: row.id,
  url: row.url,
  caption: row.caption || undefined,
  category: row.category || undefined,
  isActive: row.is_active,
  order: row.sort_order,
  isHero: row.is_hero,
});

const toGalleryPayload = (item: Partial<GalleryPhoto>) =>
  removeUndefined({
    url: item.url,
    caption: item.caption || null,
    category: item.category || null,
    is_active: item.isActive,
    sort_order: item.order,
    is_hero: item.isHero,
  });

export const useGalleryStore = create<GalleryStore>((set, get) => ({
  items: initialGalleryData,
  isLoading: false,
  error: null,

  loadItems: async () => {
    if (!isSupabaseConfigured || !supabase) return;

    set({ isLoading: true, error: null });
    const { data, error } = await supabase
      .from("gallery_photos")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }

    set({ items: (data as GalleryRow[]).map(toGalleryPhoto), isLoading: false });
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
      .from("gallery_photos")
      .insert(toGalleryPayload({ ...item, order: item.order || get().items.length + 1 }))
      .select("*")
      .single();

    if (error) throw error;

    set((state) => ({ items: [...state.items, toGalleryPhoto(data as GalleryRow)] }));
  },

  updateItem: async (id, data) => {
    if (!isSupabaseConfigured || !supabase) {
      set((state) => ({
        items: state.items.map((item) => (item.id === id ? { ...item, ...data } : item)),
      }));
      return;
    }

    const { data: updated, error } = await supabase
      .from("gallery_photos")
      .update(toGalleryPayload(data))
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;

    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? toGalleryPhoto(updated as GalleryRow) : item,
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

    const { error } = await supabase.from("gallery_photos").delete().eq("id", id);

    if (error) throw error;

    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  toggleStatus: async (id) => {
    const item = get().items.find((galleryItem) => galleryItem.id === id);
    if (!item) return;

    await get().updateItem(id, { isActive: !item.isActive });
  },

  reorderItems: (items) => set({ items }),

  getActiveItems: () => get().items.filter((item) => item.isActive),

  setHeroPhoto: async (id) => {
    if (!isSupabaseConfigured || !supabase) {
      set((state) => ({
        items: state.items.map((item) => ({
          ...item,
          isHero: item.id === id,
        })),
      }));
      return;
    }

    const { error: clearError } = await supabase
      .from("gallery_photos")
      .update({ is_hero: false })
      .neq("id", id);

    if (clearError) throw clearError;

    const { data, error } = await supabase
      .from("gallery_photos")
      .update({ is_hero: true })
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;

    set((state) => ({
      items: state.items.map((item) => ({
        ...item,
        ...(item.id === id ? toGalleryPhoto(data as GalleryRow) : { isHero: false }),
      })),
    }));
  },
}));
