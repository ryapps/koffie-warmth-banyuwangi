import { describe, it, expect, beforeEach } from "vitest";
import { useMenuStore } from "@/store/useMenuStore";

describe("useMenuStore", () => {
  beforeEach(() => {
    // Reset store to initial state
    useMenuStore.setState({
      items: [
        {
          id: "1",
          name: "Amber Latte",
          category: "kopi",
          price: 42000,
          description: "Espresso hangat",
          isActive: true,
          order: 1,
        },
      ],
      isLoading: false,
      error: null,
    });
  });

  it("should have initial menu items", () => {
    const items = useMenuStore.getState().items;
    expect(items.length).toBeGreaterThan(0);
    expect(items[0].name).toBe("Amber Latte");
  });

  it("should add a new menu item when Supabase is not configured", async () => {
    const newItem = {
      name: "Cold Brew Special",
      category: "kopi" as const,
      price: 35000,
      description: "Kopi dingin pilihan",
      isActive: true,
      order: 2,
    };

    await useMenuStore.getState().addItem(newItem);

    const items = useMenuStore.getState().items;
    expect(items.length).toBe(2);
    expect(items[1].name).toBe("Cold Brew Special");
    expect(items[1].id).toBeDefined();
  });

  it("should update an existing menu item", async () => {
    await useMenuStore.getState().updateItem("1", { price: 45000, name: "Amber Latte Premium" });

    const item = useMenuStore.getState().items.find((i) => i.id === "1");
    expect(item?.price).toBe(45000);
    expect(item?.name).toBe("Amber Latte Premium");
  });

  it("should toggle menu item active status", async () => {
    await useMenuStore.getState().toggleStatus("1");

    const item = useMenuStore.getState().items.find((i) => i.id === "1");
    expect(item?.isActive).toBe(false);
  });

  it("should delete a menu item", async () => {
    await useMenuStore.getState().deleteItem("1");

    const items = useMenuStore.getState().items;
    expect(items.find((i) => i.id === "1")).toBeUndefined();
  });

  it("should reorder items correctly", () => {
    const reordered = [
      {
        id: "2",
        name: "Item 2",
        category: "kopi" as const,
        price: 30000,
        description: "",
        order: 1,
      },
      {
        id: "1",
        name: "Amber Latte",
        category: "kopi" as const,
        price: 42000,
        description: "",
        order: 2,
      },
    ];

    useMenuStore.getState().reorderItems(reordered);
    expect(useMenuStore.getState().items[0].id).toBe("2");
  });
});
