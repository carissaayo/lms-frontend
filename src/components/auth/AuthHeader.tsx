
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import React from "react";

interface AuthCardHeaderProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const AuthCardHeader: React.FC<AuthCardHeaderProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <CardHeader className="space-y-3 text-center pb-4 pt-8">
      <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
        {icon}
      </div>
      <CardTitle className="text-3xl font-bold text-gray-900">
        {title}
      </CardTitle>
      <CardDescription className="text-base text-gray-600">
        {description}
      </CardDescription>
    </CardHeader>
  );
};
