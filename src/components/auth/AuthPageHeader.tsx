
import { Link } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import React from "react";

interface AuthPageHeaderProps {
  title?: string; 
  to?: string; 
  fromColor?: string; 
  toColor?: string; 
}

export const AuthPageHeader: React.FC<AuthPageHeaderProps> = ({
  title = "DevLearn",
  to = "/",
  fromColor = "blue-600",
  toColor = "indigo-600",
}) => {
  return (
    <div className="w-full pt-10 pb-6 text-center">
      <Link
        to={to}
        className={`inline-flex items-center gap-2 font-bold text-4xl bg-gradient-to-r from-${fromColor} to-${toColor} bg-clip-text text-transparent hover:from-${fromColor} hover:to-${toColor} transition-all`}
      >
        <BookOpen className={`w-10 h-10 text-${fromColor}`} />
        {title}
      </Link>
    </div>
  );
};
