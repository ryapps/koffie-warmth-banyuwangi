import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { FloatingActionBar } from "@/components/layout/FloatingActionBar";
import { useReservationModalStore } from "@/store/useReservationModalStore";

describe("FloatingActionBar Component", () => {
  beforeEach(() => {
    useReservationModalStore.setState({ isOpen: false });
  });

  it("should render action bar items (PESAN, LOKASI, TELEPON)", () => {
    render(<FloatingActionBar />);

    expect(screen.getByRole("button", { name: "PESAN" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "LOKASI" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "TELEPON" })).toBeInTheDocument();
  });

  it("should open reservation modal when PESAN button is clicked", () => {
    render(<FloatingActionBar />);

    const pesanBtn = screen.getByRole("button", { name: "PESAN" });
    fireEvent.click(pesanBtn);

    expect(useReservationModalStore.getState().isOpen).toBe(true);
  });

  it("should have correct href for LOKASI and TELEPON", () => {
    render(<FloatingActionBar />);

    const lokasiLink = screen.getByRole("link", { name: "LOKASI" });
    expect(lokasiLink).toHaveAttribute("href", "#lokasi");

    const teleponLink = screen.getByRole("link", { name: "TELEPON" });
    expect(teleponLink).toHaveAttribute("href", expect.stringMatching(/^tel:\+?\d+/));
  });
});
