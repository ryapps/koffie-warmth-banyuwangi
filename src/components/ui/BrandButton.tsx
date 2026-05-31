import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outlined" | "amber" | "dark";
  children: ReactNode;
}

export function Button({ variant = "filled", className, children, ...rest }: Props) {
  const base =
    "inline-flex items-center justify-center px-7 py-3 text-[11px] tracking-[0.2em] font-body font-medium uppercase transition-all duration-300 cursor-pointer";
  const variants = {
    filled: "bg-cream text-espresso hover:bg-amber-brand hover:text-cream",
    outlined: "border border-cream text-cream hover:bg-cream hover:text-espresso",
    amber: "bg-amber-brand text-cream hover:bg-espresso",
    dark: "bg-espresso text-cream hover:bg-amber-brand",
  };
  return (
    <button className={cn(base, variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}
