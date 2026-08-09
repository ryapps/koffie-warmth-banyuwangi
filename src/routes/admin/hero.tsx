import { createFileRoute } from "@tanstack/react-router";
import { AuthProvider } from "../../admin/context/AuthContext";
import { ProtectedRoute } from "../../admin/guards/ProtectedRoute";
import { AdminHero } from "../../admin/pages/AdminHero";

export const Route = createFileRoute("/admin/hero")({
  component: () => (
    <AuthProvider>
      <ProtectedRoute>
        <AdminHero />
      </ProtectedRoute>
    </AuthProvider>
  ),
});
