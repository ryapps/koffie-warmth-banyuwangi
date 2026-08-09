import { createFileRoute } from "@tanstack/react-router";
import { AuthProvider } from "../../admin/context/AuthContext";
import { AdminLogin } from "../../admin/pages/AdminLogin";

export const Route = createFileRoute("/admin/login")({
  component: () => (
    <AuthProvider>
      <AdminLogin />
    </AuthProvider>
  ),
});
