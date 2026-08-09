import { useEffect } from "react";

/**
 * Use this hook in a client component to ensure only client-side code executes
 * This prevents SSR issues with Zustand hydration
 */
export const useClientOnly = (callback: () => void) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      callback();
    }
  }, [callback]);
};

/**
 * Wrapper to detect if running on client
 */
export const isClient = () => typeof window !== "undefined";
