import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const StatsCard = ({ title, count }: { title: string; count: number }) => {
  return (
    <Card
      className={`border border-gray-200 transition duration-200 hover:scale-[1.02] hover:shadow-lg cursor-pointer `}
    >
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-heading">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-heading text-center">{count}</div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
