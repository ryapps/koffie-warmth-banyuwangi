import { createFileRoute } from "@tanstack/react-router";
import { AuthProvider } from "../../admin/context/AuthContext";
import { ProtectedRoute } from "../../admin/guards/ProtectedRoute";
import { AdminTestimonials } from "../../admin/pages/AdminTestimonials";

export const Route = createFileRoute("/admin/testimonials")({
  component: () => (
    <AuthProvider>
      <ProtectedRoute>
        <AdminTestimonials />
      </ProtectedRoute>
    </AuthProvider>
  ),
});
