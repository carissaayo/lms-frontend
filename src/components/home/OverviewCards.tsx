import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const items = [
  { title: "Earnings this Month", value: "₦30,000" },
  { title: "New Students This Week", value: "12" },
  { title: "Active Courses", value: "4" },
  { title: "Pending Assignments", value: "6" },
];

export default function OverviewCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 my-12">
      {items.map(({ title, value }) => (
        <Card key={title} className="border border-gray-200  gap-3 py-6 ">
          <CardHeader className="text-center">
            <CardTitle className="text-lg font-heading">{title}</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-3xl font-heading text-center">{value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
