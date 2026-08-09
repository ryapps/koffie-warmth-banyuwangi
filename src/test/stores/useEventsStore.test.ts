import { describe, it, expect, beforeEach } from "vitest";
import { useEventsStore } from "@/store/useEventsStore";

describe("useEventsStore", () => {
  beforeEach(() => {
    useEventsStore.setState({
      items: [
        {
          id: "1",
          type: "mendatang",
          title: "Malam Jazz Spesial",
          description: "Live Jazz Music",
          date: "2026-06-15",
          startTime: "19:00",
          endTime: "22:00",
          cta: "RSVP",
          ctaLink: "#",
          image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400",
          status: "aktif",
          isPublished: true,
        },
      ],
      isLoading: false,
      error: null,
    });
  });

  it("should have initial events data", () => {
    const items = useEventsStore.getState().items;
    expect(items.length).toBeGreaterThan(0);
    expect(items[0].title).toBe("Malam Jazz Spesial");
  });

  it("should add a new event when Supabase is not configured", async () => {
    const newEvent = {
      type: "workshop" as const,
      title: "Workshop Cupping Kopi",
      description: "Belajar cupping kopi bareng barista",
      date: "2026-07-20",
      startTime: "10:00",
      cta: "DAFTAR" as const,
      ctaLink: "https://wa.me/6281234567890",
      image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400",
      status: "aktif" as const,
      isPublished: true,
    };

    await useEventsStore.getState().addItem(newEvent);

    const items = useEventsStore.getState().items;
    expect(items.length).toBe(2);
    expect(items[1].title).toBe("Workshop Cupping Kopi");
  });

  it("should filter published items", () => {
    useEventsStore.setState({
      items: [
        {
          id: "1",
          type: "mendatang",
          title: "Published Event",
          description: "",
          date: "2026-06-15",
          startTime: "19:00",
          cta: "RSVP",
          ctaLink: "#",
          image: "",
          status: "aktif",
          isPublished: true,
        },
        {
          id: "2",
          type: "mendatang",
          title: "Draft Event",
          description: "",
          date: "2026-06-16",
          startTime: "19:00",
          cta: "INFO",
          ctaLink: "#",
          image: "",
          status: "draft",
          isPublished: false,
        },
      ],
    });

    const published = useEventsStore.getState().getPublishedItems();
    expect(published.length).toBe(1);
    expect(published[0].title).toBe("Published Event");
  });

  it("should update an existing event", async () => {
    await useEventsStore.getState().updateItem("1", { title: "Malam Jazz Banyuwangi" });

    const item = useEventsStore.getState().items.find((i) => i.id === "1");
    expect(item?.title).toBe("Malam Jazz Banyuwangi");
  });

  it("should delete an event", async () => {
    await useEventsStore.getState().deleteItem("1");

    const items = useEventsStore.getState().items;
    expect(items.find((i) => i.id === "1")).toBeUndefined();
  });
});
