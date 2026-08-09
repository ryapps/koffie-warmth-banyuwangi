import { createFileRoute } from "@tanstack/react-router";
import { AuthProvider } from "../../admin/context/AuthContext";
import { ProtectedRoute } from "../../admin/guards/ProtectedRoute";
import { AdminEvents } from "../../admin/pages/AdminEvents";

export const Route = createFileRoute("/admin/events")({
  component: () => (
    <AuthProvider>
      <ProtectedRoute>
        <AdminEvents />
      </ProtectedRoute>
    </AuthProvider>
  ),
});
