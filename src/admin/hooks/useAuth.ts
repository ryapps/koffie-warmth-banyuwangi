import { useState } from "react";
import { AdminUser } from "../../types/index";
import { useAuthContext } from "../context/AuthContext";

interface UseAuthReturn {
  isAuthenticated: boolean;
  user: AdminUser | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  getSessionTimeRemaining: () => number;
}

export const useAuth = (): UseAuthReturn => {
  const { authState, setAuthState } = useAuthContext();
  const [error, setError] = useState<string | null>(null);

  const DEMO_CREDENTIALS = {
    email: "admin@koffie.id",
    password: "koffie2024",
  };

  const login = (email: string, password: string) => {
    setError(null);

    // Simple validation
    if (!email || !password) {
      setError("Email dan password harus diisi");
      return { success: false, error: "Email dan password harus diisi" };
    }

    // Check credentials
    if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
      const user: AdminUser = {
        name: "Admin KOFFIE",
        email: "admin@koffie.id",
        role: "owner",
      };

      setAuthState({
        isAuthenticated: true,
        user,
        loginTime: Date.now(),
      });

      return { success: true };
    } else {
      setError("Email atau password salah");
      return { success: false, error: "Email atau password salah" };
    }
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      loginTime: null,
    });
    setError(null);
  };

  const getSessionTimeRemaining = () => {
    if (!authState.loginTime) return 0;

    const sessionDuration = 8 * 60 * 60 * 1000; // 8 hours
    const elapsed = Date.now() - authState.loginTime;
    const remaining = Math.max(0, sessionDuration - elapsed);

    return remaining;
  };

  return {
    isAuthenticated: authState.isAuthenticated,
    user: authState.user,
    login,
    logout,
    getSessionTimeRemaining,
  };
};
