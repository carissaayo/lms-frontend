import { Input } from "@/components/ui/input";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
}

export function InputWithIcon({ icon, ...props }: Props) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5">
        {icon}
      </div>
      <Input
        {...props}
        className="pl-10 h-12 border-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 text-[var(--color-text)] placeholder:text-gray-400 bg-white/90"
      />
    </div>
  );
}
