"use client";

import { ReactNode, useEffect, useState } from "react";

/**
 * ClientOnly wrapper prevents component from rendering on the server.
 * Useful for components that use client-only APIs like Zustand stores.
 */
export function ClientOnly({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <>{children}</> : null;
}
