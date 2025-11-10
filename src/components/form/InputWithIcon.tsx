import { Input } from "@/components/ui/input";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
  dark?: boolean;
}

export function InputWithIcon({
  icon,
  dark = false,
  className = "",
  ...props
}: Props) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5">
        {icon}
      </div>
      <Input
        {...props}
        className={`pl-10 h-12 transition-all ${
          dark
            ? //  Dark
              "bg-slate-800 border-slate-700 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
            : //  Light
              "bg-white/90 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
        } ${className}`}
      />
    </div>
  );
}
