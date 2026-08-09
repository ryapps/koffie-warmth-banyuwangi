import { createFileRoute } from "@tanstack/react-router";
import { AuthProvider } from "../../admin/context/AuthContext";
import { ProtectedRoute } from "../../admin/guards/ProtectedRoute";
import { AdminMenu } from "../../admin/pages/AdminMenu";

export const Route = createFileRoute("/admin/menu")({
  component: () => (
    <AuthProvider>
      <ProtectedRoute>
        <AdminMenu />
      </ProtectedRoute>
    </AuthProvider>
  ),
});
