import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { AuthProvider, useAuthContext } from "@/admin/context/AuthContext";

const TestComponent = () => {
  const { authState, setAuthState } = useAuthContext();

  return (
    <div>
      <span data-testid="status">{authState.isAuthenticated ? "Logged In" : "Logged Out"}</span>
      <span data-testid="user">{authState.user?.name || "No User"}</span>
      <button
        onClick={() =>
          setAuthState({
            isAuthenticated: true,
            user: { name: "Admin Koffie", email: "admin@koffie.id", role: "owner" },
            loginTime: Date.now(),
          })
        }
      >
        Login
      </button>
      <button
        onClick={() =>
          setAuthState({
            isAuthenticated: false,
            user: null,
            loginTime: null,
          })
        }
      >
        Logout
      </button>
    </div>
  );
};

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should initialize with logged out state when localStorage is empty", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId("status")).toHaveTextContent("Logged Out");
    expect(screen.getByTestId("user")).toHaveTextContent("No User");
  });

  it("should update authState on login and save to localStorage", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(screen.getByTestId("status")).toHaveTextContent("Logged In");
    expect(screen.getByTestId("user")).toHaveTextContent("Admin Koffie");
    expect(localStorage.getItem("koffie_auth")).not.toBeNull();
  });

  it("should remove from localStorage on logout", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Login" }));
    fireEvent.click(screen.getByRole("button", { name: "Logout" }));

    expect(screen.getByTestId("status")).toHaveTextContent("Logged Out");
    expect(localStorage.getItem("koffie_auth")).toBeNull();
  });
});
