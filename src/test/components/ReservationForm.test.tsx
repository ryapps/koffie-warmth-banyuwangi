import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ReservationForm } from "@/components/ui/ReservationForm";
import { useReservationsStore } from "@/store/useReservationsStore";
import { toast } from "sonner";

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("ReservationForm Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useReservationsStore.setState({
      items: [],
      isLoading: false,
      error: null,
    });
  });

  it("should render reservation form fields properly", () => {
    render(<ReservationForm />);

    expect(screen.getByPlaceholderText(/Rendra Wijaya/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/081234567890/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Konfirmasi & Pesan Meja/i })).toBeInTheDocument();
  });

  it("should submit reservation successfully when required fields are filled", async () => {
    const onSuccess = vi.fn();
    render(<ReservationForm onSuccess={onSuccess} />);

    fireEvent.change(screen.getByPlaceholderText(/Rendra Wijaya/i), {
      target: { value: "Ahmad Subagyo" },
    });
    fireEvent.change(screen.getByPlaceholderText(/081234567890/i), {
      target: { value: "081299887766" },
    });

    const submitBtn = screen.getByRole("button", { name: /Konfirmasi & Pesan Meja/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        expect.stringContaining("Reservasi meja berhasil diajukan")
      );
      expect(onSuccess).toHaveBeenCalled();
    });

    const storeItems = useReservationsStore.getState().items;
    expect(storeItems.length).toBe(1);
    expect(storeItems[0].name).toBe("Ahmad Subagyo");
  });
});
