import { createFileRoute } from "@tanstack/react-router";
import { AuthProvider } from "../../admin/context/AuthContext";
import { ProtectedRoute } from "../../admin/guards/ProtectedRoute";
import { AdminGallery } from "../../admin/pages/AdminGallery";

export const Route = createFileRoute("/admin/gallery")({
  component: () => (
    <AuthProvider>
      <ProtectedRoute>
        <AdminGallery />
      </ProtectedRoute>
    </AuthProvider>
  ),
});
