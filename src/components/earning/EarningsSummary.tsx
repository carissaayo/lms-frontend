import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const CardStat = ({ title, amount }: { title: string; amount: string }) => (
  <Card
    className={`border border-gray-200  gap-3 py-3 
        `}
  >
    <CardHeader className="text-center">
      <CardTitle className="text-lg font-heading">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-heading text-center">{amount}</div>
    </CardContent>
  </Card>
);
const EarningsSummary = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
      <CardStat title="Total Earnings" amount="₦1,200,000" />
      <CardStat title="Pending Payouts" amount="₦300,000" />
      <CardStat title="Last Payout" amount="₦150,000" />
      <CardStat title="Courses Sold" amount="250" />
    </div>
  );
};

export default EarningsSummary;
