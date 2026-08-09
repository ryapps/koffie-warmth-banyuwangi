import React, { createContext, ReactNode, useContext } from "react";
import { AuthState } from "../../types/index";

interface AuthContextType {
  authState: AuthState;
  setAuthState: (state: AuthState) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = React.useState<AuthState>(() => {
    // Only access localStorage on the client side
    if (typeof window === "undefined") {
      return {
        isAuthenticated: false,
        user: null,
        loginTime: null,
      };
    }

    const stored = localStorage.getItem("koffie_auth");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Check if session expired (8 hours)
        if (parsed.loginTime && Date.now() - parsed.loginTime > 8 * 60 * 60 * 1000) {
          localStorage.removeItem("koffie_auth");
          return {
            isAuthenticated: false,
            user: null,
            loginTime: null,
          };
        }
        return parsed;
      } catch {
        return {
          isAuthenticated: false,
          user: null,
          loginTime: null,
        };
      }
    }
    return {
      isAuthenticated: false,
      user: null,
      loginTime: null,
    };
  });

  const handleSetAuthState = (state: AuthState) => {
    setAuthState(state);
    // Only access localStorage on the client side
    if (typeof window !== "undefined") {
      if (state.isAuthenticated) {
        localStorage.setItem("koffie_auth", JSON.stringify(state));
      } else {
        localStorage.removeItem("koffie_auth");
      }
    }
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthState: handleSetAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
};
