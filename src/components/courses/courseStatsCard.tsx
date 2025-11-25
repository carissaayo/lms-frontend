import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { LucideIcon } from "lucide-react"; // Import LucideIcon type

const CourseStatCard = ({
  title,
  description,
  count,
  bgColor = "bg-white",
  textColor = "text-gray-900",
  descriptionTextColor = "text-gray-700",
  icon: Icon, // Destructure the Icon component
}: {
  title: string;
  description: string;
  count: number;
  bgColor: string;
  textColor?: string;
  descriptionTextColor?: string;
  icon: LucideIcon; // New icon prop
}) => {
  return (
    <Card
      className={`border border-gray-200 transition duration-200 hover:scale-[1.01] hover:shadow-2xl cursor-pointer shadow-lg rounded-xl overflow-hidden ${bgColor}`}
    >
      <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
        <div className="space-y-1">
          <CardTitle className={`text-sm font-semibold uppercase ${textColor}`}>
            {title}
          </CardTitle>
          <CardDescription
            className={`text-xs ${descriptionTextColor} font-medium`}
          >
            {description}
          </CardDescription>
        </div>
        {/* Icon container - styled for prominence */}
        <div
          className={`p-2 rounded-full ${textColor === "text-white" ? "bg-white/20" : "bg-gray-100"}`}
        >
          <Icon className={`w-6 h-6 ${textColor}`} />
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className={`text-4xl font-extrabold ${textColor}`}>{count}</div>
      </CardContent>
    </Card>
  );
};

export default CourseStatCard;
