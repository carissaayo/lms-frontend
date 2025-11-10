// src/components/auth/AuthCardHeader.tsx
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import React from "react";

interface AuthCardHeaderProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  fromColor?: string;
  toColor?: string;
  dark?: boolean; 
}

export const AuthCardHeader: React.FC<AuthCardHeaderProps> = ({
  icon,
  title,
  description,
  fromColor = "blue-500",
  toColor = "indigo-600",
  dark = false,
}) => {
  return (
    <CardHeader className="space-y-3 text-center pb-6 pt-8">
      <div
        className={`mx-auto w-16 h-16 bg-gradient-to-br from-${fromColor} to-${toColor} rounded-2xl flex items-center justify-center shadow-lg`}
      >
        {icon}
      </div>
      <CardTitle
        className={`text-3xl font-bold ${
          dark ? "text-gray-100" : "text-gray-900"
        }`}
      >
        {title}
      </CardTitle>
      <CardDescription
        className={`text-base ${
          dark ? "text-gray-400" : "text-gray-600"
        } max-w-md mx-auto`}
      >
        {description}
      </CardDescription>
    </CardHeader>
  );
};
