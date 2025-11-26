import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { LucideIcon } from "lucide-react";

export interface FieldProps {
  icon: LucideIcon;
  label: string;
  value: string;
  name: string;
  onChange: (name: string, value: string) => void;
  editMode?: boolean;
  type?: "text" | "email" | "tel" | "textarea";
}

export const Field = ({
  icon: Icon,
  label,
  value,
  name,
  onChange,
  editMode = false,
  type = "text",
}: FieldProps) => {
  const inputId = `field-${name.replace(".", "-")}`;

  return (
    <div className="space-y-1">
      <Label
        htmlFor={inputId}
        className="flex items-center gap-1.5 text-xs font-medium text-gray-500"
      >
        <Icon className="w-3.5 h-3.5 text-indigo-400" />
        {label}
      </Label>

      {editMode ? (
        type === "textarea" ? (
          <Textarea
            id={inputId}
            name={name}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            rows={4}
            className="text-sm"
          />
        ) : (
          <Input
            id={inputId}
            type={type}
            name={name}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            className="text-sm"
          />
        )
      ) : (
        <p
          className={`text-base font-semibold text-gray-800 p-2 border-b border-gray-50 bg-gray-50 rounded-lg ${
            type === "textarea" ? "whitespace-pre-wrap" : ""
          }`}
        >
          {value || "N/A"}
        </p>
      )}
    </div>
  );
};
