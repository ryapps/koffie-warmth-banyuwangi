import { create } from "zustand";
import { persist } from "zustand/middleware";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

export interface MarqueeItemDB {
  id?: string;
  text: string;
  sort_order: number;
  is_active: boolean;
}

export interface MarqueeSettings {
  items: string[];
  speed: "slow" | "normal" | "fast";
  backgroundColor: string;
  textColor: string;
}

interface MarqueeStore {
  settings: MarqueeSettings;
  dbItems: MarqueeItemDB[];
  isLoading: boolean;
  error: string | null;
  loadItems: () => Promise<void>;
  updateSettings: (newSettings: Partial<MarqueeSettings>) => void;
  setItems: (items: string[]) => void;
  saveItemsToSupabase: (items: string[]) => Promise<void>;
}

const initialItems = [
  "PLAYLIST PILIHAN",
  "BIJI BERETIKA",
  "ACARA PRIVAT",
  "RAMAH ANJING",
  "MALAM JAZZ",
  "WORKSHOP ROASTING",
  "SPECIALTY COFFEE",
];

const initialSettings: MarqueeSettings = {
  items: initialItems,
  speed: "normal",
  backgroundColor: "#C8852A",
  textColor: "#2C1A0E",
};

export const useMarqueeStore = create<MarqueeStore>()(
  persist(
    (set, get) => ({
      settings: initialSettings,
      dbItems: [],
      isLoading: false,
      error: null,

      loadItems: async () => {
        if (!isSupabaseConfigured || !supabase) return;

        set({ isLoading: true, error: null });
        try {
          const { data, error } = await supabase
            .from("marquee_items")
            .select("*")
            .order("sort_order", { ascending: true });

          if (error) {
            console.error("Error fetching marquee_items:", error.message);
            set({ isLoading: false, error: error.message });
            return;
          }

          if (data && data.length > 0) {
            const activeTexts = data
              .filter((item: MarqueeItemDB) => item.is_active)
              .map((item: MarqueeItemDB) => item.text);

            set((state) => ({
              dbItems: data as MarqueeItemDB[],
              settings: {
                ...state.settings,
                items: activeTexts.length > 0 ? activeTexts : state.settings.items,
              },
              isLoading: false,
            }));
          } else {
            set({ isLoading: false });
          }
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : "Unknown error";
          set({ isLoading: false, error: msg });
        }
      },

      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
      setItems: (items) =>
        set((state) => ({
          settings: { ...state.settings, items },
        })),

      saveItemsToSupabase: async (items: string[]) => {
        set((state) => ({
          settings: { ...state.settings, items },
        }));

        if (!isSupabaseConfigured || !supabase) return;

        try {
          // Delete existing and insert new order
          await supabase.from("marquee_items").delete().gte("created_at", "1970-01-01T00:00:00Z");

          const newRows = items.map((text, idx) => ({
            text: text.trim(),
            sort_order: idx + 1,
            is_active: true,
          }));

          const { data, error } = await supabase
            .from("marquee_items")
            .insert(newRows)
            .select("*");

          if (error) {
            console.error("Error saving marquee_items to Supabase:", error.message);
            throw error;
          }

          if (data) {
            set({ dbItems: data as MarqueeItemDB[] });
          }
        } catch (err) {
          console.error("Failed to sync marquee_items to Supabase:", err);
          throw err;
        }
      },
    }),
    {
      name: "koffie-marquee-settings",
      partialize: (state) => ({ settings: state.settings }),
    }
  )
);
