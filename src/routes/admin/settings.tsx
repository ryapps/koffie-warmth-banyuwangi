import { createFileRoute } from "@tanstack/react-router";
import { AuthProvider } from "../../admin/context/AuthContext";
import { ProtectedRoute } from "../../admin/guards/ProtectedRoute";
import { AdminSettings } from "../../admin/pages/AdminSettings";

export const Route = createFileRoute("/admin/settings")({
  component: () => (
    <AuthProvider>
      <ProtectedRoute>
        <AdminSettings />
      </ProtectedRoute>
    </AuthProvider>
  ),
});
