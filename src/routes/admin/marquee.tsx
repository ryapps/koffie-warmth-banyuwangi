import { createFileRoute } from "@tanstack/react-router";
import { AuthProvider } from "../../admin/context/AuthContext";
import { ProtectedRoute } from "../../admin/guards/ProtectedRoute";
import { AdminMarquee } from "../../admin/pages/AdminMarquee";

export const Route = createFileRoute("/admin/marquee")({
  component: () => (
    <AuthProvider>
      <ProtectedRoute>
        <AdminMarquee />
      </ProtectedRoute>
    </AuthProvider>
  ),
});
