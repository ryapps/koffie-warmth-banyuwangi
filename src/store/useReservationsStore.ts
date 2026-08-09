import { create } from "zustand";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { Reservation } from "../types/index";

interface ReservationsStore {
  items: Reservation[];
  isLoading: boolean;
  error: string | null;
  loadItems: () => Promise<void>;
  addItem: (item: Omit<Reservation, "id" | "createdAt">) => Promise<void>;
  updateItem: (id: string, data: Partial<Reservation>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  updateStatus: (id: string, status: Reservation["status"]) => Promise<void>;
  getTodayReservations: () => Reservation[];
  getPendingReservations: () => Reservation[];
  getReservationsByDate: (date: string) => Reservation[];
  getTotalThisMonth: () => number;
}

type ReservationRow = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  date: string;
  time: string;
  guests: number;
  special_request: string | null;
  notes: string | null;
  status: Reservation["status"];
  created_at: string;
};

const initialReservationsData: Reservation[] = [
  {
    id: "1",
    name: "Rendra Wijaya",
    phone: "081234567890",
    date: new Date().toISOString().split("T")[0],
    time: "14:00",
    guests: 4,
    specialRequest: "Meja dekat jendela",
    status: "pending",
    createdAt: new Date().toISOString(),
  },
];

const removeUndefined = <T extends Record<string, unknown>>(payload: T) =>
  Object.fromEntries(Object.entries(payload).filter(([, value]) => value !== undefined));

const toReservation = (row: ReservationRow): Reservation => ({
  id: row.id,
  name: row.name,
  phone: row.phone,
  email: row.email || undefined,
  date: row.date,
  time: row.time?.slice(0, 5) || "",
  guests: row.guests,
  specialRequest: row.special_request || undefined,
  notes: row.notes || undefined,
  status: row.status,
  createdAt: row.created_at,
});

const toReservationPayload = (item: Partial<Reservation>) =>
  removeUndefined({
    name: item.name,
    phone: item.phone,
    email: item.email || null,
    date: item.date,
    time: item.time,
    guests: item.guests,
    special_request: item.specialRequest || null,
    notes: item.notes || null,
    status: item.status,
  });

export const useReservationsStore = create<ReservationsStore>((set, get) => ({
  items: initialReservationsData,
  isLoading: false,
  error: null,

  loadItems: async () => {
    if (!isSupabaseConfigured || !supabase) return;

    set({ isLoading: true, error: null });
    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .order("date", { ascending: true })
      .order("time", { ascending: true });

    if (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }

    set({ items: (data as ReservationRow[]).map(toReservation), isLoading: false });
  },

  addItem: async (item) => {
    if (!isSupabaseConfigured || !supabase) {
      set((state) => ({
        items: [
          ...state.items,
          {
            ...item,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
          },
        ],
      }));
      return;
    }

    const { data, error } = await supabase
      .from("reservations")
      .insert(toReservationPayload(item))
      .select("*")
      .single();

    if (error) throw error;

    set((state) => ({ items: [...state.items, toReservation(data as ReservationRow)] }));
  },

  updateItem: async (id, data) => {
    if (!isSupabaseConfigured || !supabase) {
      set((state) => ({
        items: state.items.map((item) => (item.id === id ? { ...item, ...data } : item)),
      }));
      return;
    }

    const { data: updated, error } = await supabase
      .from("reservations")
      .update(toReservationPayload(data))
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;

    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? toReservation(updated as ReservationRow) : item,
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

    const { error } = await supabase.from("reservations").delete().eq("id", id);

    if (error) throw error;

    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  updateStatus: async (id, status) => {
    await get().updateItem(id, { status });
  },

  getTodayReservations: () => {
    const today = new Date().toISOString().split("T")[0];
    return get().items.filter((item) => item.date === today);
  },

  getPendingReservations: () => get().items.filter((item) => item.status === "pending"),

  getReservationsByDate: (date) => get().items.filter((item) => item.date === date),

  getTotalThisMonth: () => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    return get().items.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= firstDay && itemDate <= lastDay;
    }).length;
  },
}));
