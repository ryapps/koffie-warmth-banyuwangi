import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface MarqueeSettings {
  items: string[];
  speed: "slow" | "normal" | "fast";
  backgroundColor: string;
  textColor: string;
}

interface MarqueeStore {
  settings: MarqueeSettings;
  updateSettings: (newSettings: Partial<MarqueeSettings>) => void;
  setItems: (items: string[]) => void;
}

const initialSettings: MarqueeSettings = {
  items: [
    "Playlist Pilihan",
    "Bahan Berkualitas",
    "Acara Privat",
    "Ramah Hewan Peliharaan",
  ],
  speed: "normal",
  backgroundColor: "#C8852A",
  textColor: "#2C1A0E",
};

export const useMarqueeStore = create<MarqueeStore>()(
  persist(
    (set) => ({
      settings: initialSettings,
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
      setItems: (items) =>
        set((state) => ({
          settings: { ...state.settings, items },
        })),
    }),
    {
      name: "koffie-marquee-settings",
    }
  )
);
