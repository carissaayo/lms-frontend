import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const CourseStatCard = ({
  title,
  description,
  count,
  bgColor = "var(--color-background-light)",
  textColor = "text-gray-900",
  descriptionTextColor = "text-gray-700",
}: {
  title: string;
  description: string;
  count: number;
  bgColor: string;
  textColor?: string;
  descriptionTextColor?: string;
}) => {
  return (
    <Card
      className={`border border-gray-200 transition duration-200 hover:scale-[1.02] hover:shadow-lg cursor-pointer ${bgColor} ${textColor}`}
    >
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-heading">{title}</CardTitle>
        <CardDescription
          className={`font-secondary text-lg ${descriptionTextColor}`}
        >
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-heading text-center">{count}</div>
      </CardContent>
    </Card>
  );
};

export default CourseStatCard;
