import { BookOpen } from "lucide-react";


const CourseStatCard = ({
  title,
  description,
  count,
  bgColor,
  textColor = "text-gray-900",
  descriptionTextColor = "text-gray-600",
}: {
  title: string;
  description: string;
  count: number;
  bgColor: string;
  textColor?: string;
  descriptionTextColor?: string;
}) => (
  <div className={`${bgColor} rounded-xl p-6 shadow-sm`}>
    <div className="flex items-start justify-between">
      <div>
        <p className={`text-sm font-medium ${descriptionTextColor}`}>
          {description}
        </p>
        <p className={`text-3xl font-bold ${textColor} mt-2`}>{count}</p>
        <p className={`text-lg font-semibold ${textColor} mt-1`}>{title}</p>
      </div>
      <div
        className={`h-12 w-12 rounded-lg ${
          bgColor === "bg-primary" ? "bg-primary/20" : "bg-white/20"
        } flex items-center justify-center`}
      >
        <BookOpen className={`h-6 w-6 ${textColor}`} />
      </div>
    </div>
  </div>
);

export default CourseStatCard