import { createFileRoute } from "@tanstack/react-router";
import { AuthProvider } from "../../admin/context/AuthContext";
import { ProtectedRoute } from "../../admin/guards/ProtectedRoute";
import { AdminReservations } from "../../admin/pages/AdminReservations";

export const Route = createFileRoute("/admin/reservations")({
  component: () => (
    <AuthProvider>
      <ProtectedRoute>
        <AdminReservations />
      </ProtectedRoute>
    </AuthProvider>
  ),
});
