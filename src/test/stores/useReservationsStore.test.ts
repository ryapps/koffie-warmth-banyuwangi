import { describe, it, expect, beforeEach } from "vitest";
import { useReservationsStore } from "@/store/useReservationsStore";

describe("useReservationsStore", () => {
  const todayStr = new Date().toISOString().split("T")[0];

  beforeEach(() => {
    useReservationsStore.setState({
      items: [
        {
          id: "1",
          name: "Rendra Wijaya",
          phone: "081234567890",
          email: "rendra@example.com",
          date: todayStr,
          time: "14:00",
          guests: 4,
          specialRequest: "Meja dekat jendela",
          status: "pending",
          createdAt: new Date().toISOString(),
        },
      ],
      isLoading: false,
      error: null,
    });
  });

  it("should have initial reservations data", () => {
    const items = useReservationsStore.getState().items;
    expect(items.length).toBe(1);
    expect(items[0].name).toBe("Rendra Wijaya");
    expect(items[0].email).toBe("rendra@example.com");
  });

  it("should add a new reservation when Supabase is not configured", async () => {
    const newRes = {
      name: "Siti Rahma",
      phone: "089876543210",
      email: "siti@example.com",
      date: todayStr,
      time: "19:00",
      guests: 2,
      specialRequest: "Indoor AC",
      status: "pending" as const,
    };

    await useReservationsStore.getState().addItem(newRes);

    const items = useReservationsStore.getState().items;
    expect(items.length).toBe(2);
    expect(items[1].name).toBe("Siti Rahma");
  });

  it("should update reservation status", async () => {
    await useReservationsStore.getState().updateStatus("1", "confirmed");

    const item = useReservationsStore.getState().items.find((i) => i.id === "1");
    expect(item?.status).toBe("confirmed");
  });

  it("should get today reservations correctly", () => {
    const todayRes = useReservationsStore.getState().getTodayReservations();
    expect(todayRes.length).toBe(1);
    expect(todayRes[0].id).toBe("1");
  });

  it("should filter pending reservations", () => {
    const pending = useReservationsStore.getState().getPendingReservations();
    expect(pending.length).toBe(1);
    expect(pending[0].status).toBe("pending");
  });

  it("should delete a reservation", async () => {
    await useReservationsStore.getState().deleteItem("1");

    const items = useReservationsStore.getState().items;
    expect(items.length).toBe(0);
  });
});
