import { create } from "zustand";

interface ReservationModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useReservationModalStore = create<ReservationModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
