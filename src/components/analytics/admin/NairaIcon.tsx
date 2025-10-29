import { cn } from "@/lib/utils";

export function NairaIcon({ className }: { className?: string }) {
  return <span className={cn("font-semibold text-base", className)}>₦</span>;
}
