import { create } from "zustand";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { Event } from "../types/index";

interface EventsStore {
  items: Event[];
  isLoading: boolean;
  error: string | null;
  loadItems: () => Promise<void>;
  addItem: (item: Omit<Event, "id">) => Promise<void>;
  updateItem: (id: string, data: Partial<Event>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  publishItem: (id: string) => Promise<void>;
  reorderItems: (items: Event[]) => void;
  getPublishedItems: () => Event[];
  getUpcomingEvents: () => Event[];
}

type EventRow = {
  id: string;
  type: Event["type"];
  badge: string | null;
  title: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string | null;
  is_recurring: boolean;
  recurring_pattern: Event["recurringPattern"] | null;
  cta: Event["cta"];
  cta_link: string;
  image: string;
  status: Event["status"];
  is_published: boolean;
};

const initialEventsData: Event[] = [
  {
    id: "1",
    type: "mendatang",
    title: "Malam Jazz Spesial",
    description: "Nikmati musik jazz live sambil menikmati kopi spesial kami",
    date: "2026-06-15",
    startTime: "19:00",
    endTime: "22:00",
    cta: "RSVP",
    ctaLink: "#",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400",
    status: "aktif",
    isPublished: true,
  },
];

const toEvent = (row: EventRow): Event => ({
  id: row.id,
  type: row.type,
  badge: row.badge || undefined,
  title: row.title,
  description: row.description,
  date: row.date,
  startTime: row.start_time?.slice(0, 5) || "",
  endTime: row.end_time?.slice(0, 5) || undefined,
  isRecurring: row.is_recurring,
  recurringPattern: row.recurring_pattern || undefined,
  cta: row.cta,
  ctaLink: row.cta_link,
  image: row.image,
  status: row.status,
  isPublished: row.is_published,
});

const removeUndefined = <T extends Record<string, unknown>>(payload: T) =>
  Object.fromEntries(Object.entries(payload).filter(([, value]) => value !== undefined));

const toEventPayload = (event: Partial<Event>) =>
  removeUndefined({
    type: event.type,
    badge: event.badge === undefined ? undefined : event.badge || null,
    title: event.title,
    description: event.description,
    date: event.date,
    start_time: event.startTime,
    end_time: event.endTime === undefined ? undefined : event.endTime || null,
    is_recurring: event.isRecurring,
    recurring_pattern:
      event.recurringPattern === undefined ? undefined : event.recurringPattern || null,
    cta: event.cta,
    cta_link: event.ctaLink,
    image: event.image,
    status: event.status,
    is_published: event.isPublished ?? (event.status ? event.status !== "draft" : undefined),
  });

const toNewEventPayload = (event: Omit<Event, "id">) =>
  toEventPayload({
    ...event,
    description: event.description || "",
    cta: event.cta || "RSVP",
    ctaLink: event.ctaLink || "#",
    image: event.image || "",
    isPublished: event.isPublished ?? event.status !== "draft",
  });

export const useEventsStore = create<EventsStore>((set, get) => ({
  items: initialEventsData,
  isLoading: false,
  error: null,

  loadItems: async () => {
    if (!isSupabaseConfigured || !supabase) return;

    set({ isLoading: true, error: null });
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true })
      .order("start_time", { ascending: true });

    if (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }

    set({ items: (data as EventRow[]).map(toEvent), isLoading: false });
  },

  addItem: async (item) => {
    if (!isSupabaseConfigured || !supabase) {
      set((state) => ({
        items: [
          ...state.items,
          {
            ...item,
            id: crypto.randomUUID(),
          },
        ],
      }));
      return;
    }

    const { data, error } = await supabase
      .from("events")
      .insert(toNewEventPayload(item))
      .select("*")
      .single();

    if (error) throw error;

    set((state) => ({ items: [...state.items, toEvent(data as EventRow)] }));
  },

  updateItem: async (id, data) => {
    if (!isSupabaseConfigured || !supabase) {
      set((state) => ({
        items: state.items.map((item) => (item.id === id ? { ...item, ...data } : item)),
      }));
      return;
    }

    const { data: updated, error } = await supabase
      .from("events")
      .update(toEventPayload(data))
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;

    set((state) => ({
      items: state.items.map((item) => (item.id === id ? toEvent(updated as EventRow) : item)),
    }));
  },

  deleteItem: async (id) => {
    if (!isSupabaseConfigured || !supabase) {
      set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      }));
      return;
    }

    const { error } = await supabase.from("events").delete().eq("id", id);

    if (error) throw error;

    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  publishItem: async (id) => {
    await get().updateItem(id, { status: "aktif", isPublished: true });
  },

  reorderItems: (items) => set({ items }),

  getPublishedItems: () => get().items.filter((item) => item.isPublished),

  getUpcomingEvents: () => {
    const now = new Date();
    return get()
      .items.filter((item) => item.isPublished && new Date(item.date) > now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  },
}));
