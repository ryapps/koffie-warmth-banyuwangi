import { describe, it, expect, beforeEach } from "vitest";
import { useTestimonialsStore } from "@/store/useTestimonialsStore";

describe("useTestimonialsStore", () => {
  beforeEach(() => {
    useTestimonialsStore.setState({
      items: [
        {
          id: "1",
          name: "Budi Santoso",
          role: "Pelanggan Setia",
          quote: "Kopi terbaik di Banyuwangi!",
          stars: 5,
          status: "published",
          order: 1,
        },
      ],
      isLoading: false,
      error: null,
    });
  });

  it("should have initial testimonial items", () => {
    const items = useTestimonialsStore.getState().items;
    expect(items.length).toBe(1);
    expect(items[0].name).toBe("Budi Santoso");
  });

  it("should add a new testimonial when Supabase is not configured", async () => {
    const newTestimonial = {
      name: "Dewi Lestari",
      role: "Penulis",
      quote: "Suasana sangat mendukung untuk berkarya",
      stars: 5,
      status: "published" as const,
      order: 2,
    };

    await useTestimonialsStore.getState().addItem(newTestimonial);

    const items = useTestimonialsStore.getState().items;
    expect(items.length).toBe(2);
    expect(items[1].name).toBe("Dewi Lestari");
  });

  it("should filter published items", () => {
    useTestimonialsStore.setState({
      items: [
        {
          id: "1",
          name: "Budi",
          quote: "Awesome",
          stars: 5,
          status: "published",
        },
        {
          id: "2",
          name: "Doni",
          quote: "Pending test",
          stars: 4,
          status: "pending",
        },
      ],
    });

    const published = useTestimonialsStore.getState().getPublishedItems();
    expect(published.length).toBe(1);
    expect(published[0].name).toBe("Budi");
  });

  it("should update a testimonial item", async () => {
    await useTestimonialsStore.getState().updateItem("1", { stars: 4 });

    const item = useTestimonialsStore.getState().items.find((i) => i.id === "1");
    expect(item?.stars).toBe(4);
  });

  it("should delete a testimonial item", async () => {
    await useTestimonialsStore.getState().deleteItem("1");

    const items = useTestimonialsStore.getState().items;
    expect(items.length).toBe(0);
  });
});
