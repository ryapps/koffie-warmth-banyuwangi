import { describe, it, expect, beforeEach } from "vitest";
import { useGalleryStore } from "@/store/useGalleryStore";

describe("useGalleryStore", () => {
  beforeEach(() => {
    useGalleryStore.setState({
      items: [
        {
          id: "1",
          url: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800",
          caption: "Interior Kafe KOFFIE",
          category: "interior",
          isActive: true,
          order: 1,
          isHero: true,
        },
      ],
      isLoading: false,
      error: null,
    });
  });

  it("should have initial gallery data", () => {
    const items = useGalleryStore.getState().items;
    expect(items.length).toBe(1);
    expect(items[0].caption).toBe("Interior Kafe KOFFIE");
  });

  it("should add a new photo when Supabase is not configured", async () => {
    const newPhoto = {
      url: "https://images.unsplash.com/photo-test.jpg",
      caption: "Espresso Bar",
      category: "food" as const,
      isActive: true,
      order: 2,
    };

    await useGalleryStore.getState().addItem(newPhoto);

    const items = useGalleryStore.getState().items;
    expect(items.length).toBe(2);
    expect(items[1].caption).toBe("Espresso Bar");
  });

  it("should filter active items", () => {
    useGalleryStore.setState({
      items: [
        {
          id: "1",
          url: "img1.jpg",
          caption: "Active",
          isActive: true,
        },
        {
          id: "2",
          url: "img2.jpg",
          caption: "Inactive",
          isActive: false,
        },
      ],
    });

    const active = useGalleryStore.getState().getActiveItems();
    expect(active.length).toBe(1);
    expect(active[0].caption).toBe("Active");
  });

  it("should toggle photo active status", async () => {
    await useGalleryStore.getState().toggleStatus("1");

    const item = useGalleryStore.getState().items.find((i) => i.id === "1");
    expect(item?.isActive).toBe(false);
  });

  it("should delete a gallery item", async () => {
    await useGalleryStore.getState().deleteItem("1");

    const items = useGalleryStore.getState().items;
    expect(items.length).toBe(0);
  });
});
