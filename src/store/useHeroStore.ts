import { create } from "zustand";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { HeroContent } from "../types/index";
import { config } from "../data/config";

interface HeroStore {
  hero: HeroContent;
  isLoading: boolean;
  error: string | null;
  loadHero: () => Promise<void>;
  updateHero: (data: Partial<HeroContent>) => Promise<void>;
  uploadHeroImage: (file: File) => Promise<string>;
}

export const initialHeroData: HeroContent = {
  title: "Setiap Cangkir Punya Cerita di Banyuwangi.",
  subtitle: '"Kafe itu suasana hati—dan kami selalu tidak terburu-buru."',
  description:
    "Kopi diseduh perlahan, pastri yang baru keluar dari oven, dan sudut kota yang terasa seperti rumah. Datanglah apa adanya. Berlama-lama sesukamu.",
  locationLabel: config.brand.location,
  imageUrl:
    "https://images.unsplash.com/photo-1442550528053-c431ecb55509?auto=format&fit=crop&w=1800&q=80",
  primaryCtaText: "Pesan Meja",
  primaryCtaLink: "#reservasi",
  secondaryCtaText: "Jelajahi Menu",
  secondaryCtaLink: "#menu",
  isActive: true,
};

type HeroRow = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  location_label: string | null;
  image_url: string;
  primary_cta_text: string | null;
  primary_cta_link: string | null;
  secondary_cta_text: string | null;
  secondary_cta_link: string | null;
  is_active: boolean;
};

const toHeroContent = (row: HeroRow): HeroContent => ({
  id: row.id,
  title: row.title,
  subtitle: row.subtitle,
  description: row.description,
  locationLabel: row.location_label || undefined,
  imageUrl: row.image_url,
  primaryCtaText: row.primary_cta_text || "Pesan Meja",
  primaryCtaLink: row.primary_cta_link || "#reservasi",
  secondaryCtaText: row.secondary_cta_text || "Jelajahi Menu",
  secondaryCtaLink: row.secondary_cta_link || "#menu",
  isActive: row.is_active,
});

export const useHeroStore = create<HeroStore>((set, get) => ({
  hero: initialHeroData,
  isLoading: false,
  error: null,

  loadHero: async () => {
    if (!isSupabaseConfigured || !supabase) return;

    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from("hero_content")
        .select("*")
        .eq("is_active", true)
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error && error.code !== "PGRST116") {
        console.error("Error loading hero_content from Supabase:", error.message);
        set({ isLoading: false, error: error.message });
        return;
      }

      if (data) {
        set({ hero: toHeroContent(data as HeroRow), isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      set({ isLoading: false, error: msg });
    }
  },

  updateHero: async (data) => {
    const updatedHero = { ...get().hero, ...data };
    set({ hero: updatedHero });

    if (!isSupabaseConfigured || !supabase) return;

    const payload = {
      title: updatedHero.title,
      subtitle: updatedHero.subtitle,
      description: updatedHero.description,
      location_label: updatedHero.locationLabel || null,
      image_url: updatedHero.imageUrl,
      primary_cta_text: updatedHero.primaryCtaText,
      primary_cta_link: updatedHero.primaryCtaLink,
      secondary_cta_text: updatedHero.secondaryCtaText,
      secondary_cta_link: updatedHero.secondaryCtaLink,
      is_active: true,
      updated_at: new Date().toISOString(),
    };

    if (updatedHero.id) {
      const { error } = await supabase
        .from("hero_content")
        .update(payload)
        .eq("id", updatedHero.id);

      if (error) {
        console.error("Failed to update hero_content:", error);
        throw error;
      }
    } else {
      const { data: inserted, error } = await supabase
        .from("hero_content")
        .insert(payload)
        .select("*")
        .single();

      if (error) {
        console.error("Failed to insert hero_content:", error);
        throw error;
      }

      if (inserted) {
        set({ hero: toHeroContent(inserted as HeroRow) });
      }
    }
  },

  uploadHeroImage: async (file: File) => {
    if (!isSupabaseConfigured || !supabase) {
      // Offline fallback: create local object URL
      return URL.createObjectURL(file);
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `hero-${Date.now()}.${fileExt}`;
    const filePath = `hero/${fileName}`;

    // Ensure bucket exists or upload directly
    const { error: uploadError } = await supabase.storage
      .from("koffie-assets")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.warn("Storage upload failed, trying base64 fallback:", uploadError.message);
      // Fallback convert to data URL if bucket is not created
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    const { data: publicUrlData } = supabase.storage
      .from("koffie-assets")
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  },
}));
