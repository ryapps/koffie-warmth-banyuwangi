import { create } from "zustand";
import { CafeSettings, OperatingHours } from "../types/index";

interface SettingsStore {
  cafeSettings: CafeSettings;
  operatingHours: OperatingHours[];
  updateCafeSettings: (data: Partial<CafeSettings>) => void;
  updateOperatingHours: (hours: OperatingHours[]) => void;
  getSettings: () => CafeSettings;
  getHours: () => OperatingHours[];
}

const initialCafeSettings: CafeSettings = {
  name: "KOFFIE Café",
  tagline: "Est. 2018 · Jember, Jawa Timur",
  description:
    "Kafe spesialti dengan suasana nyaman untuk bekerja, bersantai, atau gathering dengan teman.",
  address: "Jl. Pendidikan No. 45",
  city: "Jember",
  phone: "+62-331-123456",
  whatsapp: "6281234567890",
  email: "info@koffie.id",
  instagram: "https://instagram.com/koffie_jember",
};

const initialOperatingHours: OperatingHours[] = [
  { day: "Senin", isOpen: true, openTime: "07:00", closeTime: "21:00" },
  { day: "Selasa", isOpen: true, openTime: "07:00", closeTime: "21:00" },
  { day: "Rabu", isOpen: true, openTime: "07:00", closeTime: "21:00" },
  { day: "Kamis", isOpen: true, openTime: "07:00", closeTime: "21:00" },
  { day: "Jumat", isOpen: true, openTime: "07:00", closeTime: "22:00" },
  { day: "Sabtu", isOpen: true, openTime: "08:00", closeTime: "22:00" },
  { day: "Minggu", isOpen: true, openTime: "08:00", closeTime: "21:00" },
];

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  cafeSettings: initialCafeSettings,
  operatingHours: initialOperatingHours,

  updateCafeSettings: (data) =>
    set((state) => ({
      cafeSettings: { ...state.cafeSettings, ...data },
    })),

  updateOperatingHours: (hours) => set({ operatingHours: hours }),

  getSettings: () => get().cafeSettings,

  getHours: () => get().operatingHours,
}));
