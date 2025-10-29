import { Card } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

export const StatsCard = ({
  title,
  value,
  change,
  icon: Icon,
  trend,
  color,
}: any) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
    red: "bg-red-50 text-red-600",
    yellow: "bg-yellow-50 text-yellow-600",
  };

  return (
    <Card className="p-6 border border-gray-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          <div className="flex items-center mt-2">
            {trend === "up" ? (
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
            ) : trend === "down" ? (
              <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
            ) : null}
            <span
              className={`text-xs ${trend === `up` ? `text-green-600` : trend === `down` ? `text-red-600` : `text-gray-600`}`}
            >
              {change}
            </span>
          </div>
        </div>
        <div
          className={`h-12 w-12 rounded-lg flex items-center justify-center ${colorClasses[color as keyof typeof colorClasses]}`}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );
};
