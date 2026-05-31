import { cn } from "@/lib/utils";

export function SectionLabel({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        "font-accent italic text-amber-brand text-base tracking-wide block",
        className,
      )}
    >
      {children}
    </span>
  );
}
