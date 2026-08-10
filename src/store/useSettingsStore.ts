import { create } from "zustand";
import { config } from "../data/config";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { CafeSettings, OperatingHours } from "../types/index";

interface SettingsStore {
  cafeSettings: CafeSettings;
  operatingHours: OperatingHours[];
  isLoading: boolean;
  error: string | null;
  loadSettings: () => Promise<void>;
  updateCafeSettings: (data: Partial<CafeSettings>) => Promise<void>;
  updateOperatingHours: (hours: OperatingHours[]) => Promise<void>;
  getSettings: () => CafeSettings;
  getHours: () => OperatingHours[];
}

export const initialCafeSettings: CafeSettings = {
  name: config.brand.name,
  tagline: config.brand.tagline,
  description:
    "Kafe spesialti dengan suasana nyaman untuk bekerja, bersantai, atau gathering dengan teman.",
  address: config.contact.address,
  city: "Banyuwangi",
  phone: config.contact.phone,
  whatsapp: config.contact.whatsapp,
  email: config.contact.email,
  instagram: config.contact.instagram,
  facebook: "https://facebook.com/koffie.bwi",
  mapsUrl: "https://www.google.com/maps?q=Banyuwangi,Jawa+Timur&output=embed",
  ratingStat: config.stats.rating,
  yearsStat: config.stats.years,
  originsStat: config.stats.origins,
};

export const initialOperatingHours: OperatingHours[] = [
  { day: "Senin – Jumat", isOpen: true, openTime: "07.00", closeTime: "22.00", order: 1 },
  { day: "Sabtu", isOpen: true, openTime: "08.00", closeTime: "23.00", order: 2 },
  { day: "Minggu", isOpen: true, openTime: "09.00", closeTime: "21.00", order: 3 },
];

type BusinessSettingsRow = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  address: string;
  city: string;
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string | null;
  facebook: string | null;
  maps_url: string | null;
  rating_stat: string | null;
  years_stat: string | null;
  origins_stat: string | null;
};

type OperatingHoursRow = {
  id: string;
  day: string;
  open_time: string;
  close_time: string;
  is_open: boolean;
  sort_order: number;
};

const toCafeSettings = (row: BusinessSettingsRow): CafeSettings => ({
  id: row.id,
  name: row.name,
  tagline: row.tagline,
  description: row.description,
  address: row.address,
  city: row.city,
  phone: row.phone,
  whatsapp: row.whatsapp,
  email: row.email,
  instagram: row.instagram || undefined,
  facebook: row.facebook || undefined,
  mapsUrl: row.maps_url || undefined,
  ratingStat: row.rating_stat || "4.9",
  yearsStat: row.years_stat || "6+",
  originsStat: row.origins_stat || "12",
});

const toOperatingHours = (row: OperatingHoursRow): OperatingHours => ({
  id: row.id,
  day: row.day,
  openTime: row.open_time,
  closeTime: row.close_time,
  isOpen: row.is_open,
  order: row.sort_order,
});

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  cafeSettings: initialCafeSettings,
  operatingHours: initialOperatingHours,
  isLoading: false,
  error: null,

  loadSettings: async () => {
    if (!isSupabaseConfigured || !supabase) return;

    set({ isLoading: true, error: null });
    try {
      // 1. Fetch business_settings
      const { data: bsData, error: bsError } = await supabase
        .from("business_settings")
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (bsError && bsError.code !== "PGRST116") {
        console.error("Error fetching business_settings:", bsError.message);
      } else if (bsData) {
        set({ cafeSettings: toCafeSettings(bsData as BusinessSettingsRow) });
      }

      // 2. Fetch operating_hours
      const { data: hoursData, error: hoursError } = await supabase
        .from("operating_hours")
        .select("*")
        .order("sort_order", { ascending: true });

      if (hoursError) {
        console.error("Error fetching operating_hours:", hoursError.message);
      } else if (hoursData && hoursData.length > 0) {
        set({ operatingHours: (hoursData as OperatingHoursRow[]).map(toOperatingHours) });
      }

      set({ isLoading: false });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      set({ isLoading: false, error: msg });
    }
  },

  updateCafeSettings: async (data) => {
    const updated = { ...get().cafeSettings, ...data };
    set({ cafeSettings: updated });

    if (!isSupabaseConfigured || !supabase) return;

    const payload = {
      name: updated.name,
      tagline: updated.tagline,
      description: updated.description,
      address: updated.address,
      city: updated.city,
      phone: updated.phone,
      whatsapp: updated.whatsapp,
      email: updated.email,
      instagram: updated.instagram || null,
      facebook: updated.facebook || null,
      maps_url: updated.mapsUrl || null,
      rating_stat: updated.ratingStat || "4.9",
      years_stat: updated.yearsStat || "6+",
      origins_stat: updated.originsStat || "12",
      updated_at: new Date().toISOString(),
    };

    if (updated.id) {
      const { error } = await supabase
        .from("business_settings")
        .update(payload)
        .eq("id", updated.id);

      if (error) throw error;
    } else {
      const { data: inserted, error } = await supabase
        .from("business_settings")
        .insert(payload)
        .select("*")
        .single();

      if (error) throw error;
      if (inserted) {
        set({ cafeSettings: toCafeSettings(inserted as BusinessSettingsRow) });
      }
    }
  },

  updateOperatingHours: async (hours) => {
    set({ operatingHours: hours });

    if (!isSupabaseConfigured || !supabase) return;

    try {
      await supabase.from("operating_hours").delete().gte("updated_at", "1970-01-01T00:00:00Z");

      const rows = hours.map((h, idx) => ({
        day: h.day,
        open_time: h.openTime,
        close_time: h.closeTime,
        is_open: h.isOpen,
        sort_order: h.order || idx + 1,
      }));

      const { data, error } = await supabase.from("operating_hours").insert(rows).select("*");
      if (error) throw error;

      if (data) {
        set({ operatingHours: (data as OperatingHoursRow[]).map(toOperatingHours) });
      }
    } catch (err) {
      console.error("Error updating operating_hours:", err);
      throw err;
    }
  },

  getSettings: () => get().cafeSettings,

  getHours: () => get().operatingHours,
}));
