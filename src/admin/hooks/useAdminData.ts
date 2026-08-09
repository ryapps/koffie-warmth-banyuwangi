import { useEventsStore } from "../../store/useEventsStore";
import { useGalleryStore } from "../../store/useGalleryStore";
import { useMenuStore } from "../../store/useMenuStore";
import { useReservationsStore } from "../../store/useReservationsStore";
import { useTestimonialsStore } from "../../store/useTestimonialsStore";
import { Event, GalleryPhoto, MenuItem, Reservation, Testimonial } from "../../types/index";

interface UseAdminDataReturn {
  menu: {
    items: MenuItem[];
    addItem: (item: Omit<MenuItem, "id">) => void;
    updateItem: (id: string, data: Partial<MenuItem>) => void;
    deleteItem: (id: string) => void;
  };
  events: {
    items: Event[];
    addItem: (item: Omit<Event, "id">) => void;
    updateItem: (id: string, data: Partial<Event>) => void;
    deleteItem: (id: string) => void;
  };
  testimonials: {
    items: Testimonial[];
    addItem: (item: Omit<Testimonial, "id">) => void;
    updateItem: (id: string, data: Partial<Testimonial>) => void;
    deleteItem: (id: string) => void;
  };
  gallery: {
    items: GalleryPhoto[];
    addItem: (item: Omit<GalleryPhoto, "id">) => void;
    updateItem: (id: string, data: Partial<GalleryPhoto>) => void;
    deleteItem: (id: string) => void;
  };
  reservations: {
    items: Reservation[];
    addItem: (item: Omit<Reservation, "id" | "createdAt">) => void;
    updateItem: (id: string, data: Partial<Reservation>) => void;
    deleteItem: (id: string) => void;
  };
}

export const useAdminData = (): UseAdminDataReturn => {
  const menuStore = useMenuStore();
  const eventsStore = useEventsStore();
  const testimonialsStore = useTestimonialsStore();
  const galleryStore = useGalleryStore();
  const reservationsStore = useReservationsStore();

  return {
    menu: {
      items: menuStore.items,
      addItem: menuStore.addItem,
      updateItem: menuStore.updateItem,
      deleteItem: menuStore.deleteItem,
    },
    events: {
      items: eventsStore.items,
      addItem: eventsStore.addItem,
      updateItem: eventsStore.updateItem,
      deleteItem: eventsStore.deleteItem,
    },
    testimonials: {
      items: testimonialsStore.items,
      addItem: testimonialsStore.addItem,
      updateItem: testimonialsStore.updateItem,
      deleteItem: testimonialsStore.deleteItem,
    },
    gallery: {
      items: galleryStore.items,
      addItem: galleryStore.addItem,
      updateItem: galleryStore.updateItem,
      deleteItem: galleryStore.deleteItem,
    },
    reservations: {
      items: reservationsStore.items,
      addItem: reservationsStore.addItem,
      updateItem: reservationsStore.updateItem,
      deleteItem: reservationsStore.deleteItem,
    },
  };
};
