import { useState } from "react";
import { TrendingUp, Users, Clock, CheckCircle, Target } from "lucide-react";

type SummaryProps = {
  summary: {
    totalEarnings: number;
    totalWithdrawals: number;
    availableBalance: number;
  };
  stats?: {
    lastPayout?: number;
    coursesSold?: number;
    earningsGrowth?: string;
    courseGrowth?: string;
  };
};

const StatCard = ({
  title,
  amount,
  icon: Icon,
  trend,
  trendValue,
  color,
}: {
  title?: string;
  amount?: string | number;
  icon?: any;
  trend?: "up" | "down";
  trendValue?: string;
  color: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-white rounded-2xl border border-gray-200 p-6 transition-all duration-300 cursor-pointer ${
        isHovered
          ? "shadow-xl scale-105 border-indigo-300"
          : "shadow-sm hover:shadow-lg"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
          <Icon className={`w-6 h-6 ${color.replace("bg-", "text-")}`} />
        </div>
        {trend && (
          <div
            className={`flex items-center text-sm font-medium ${
              trend === "up" ? "text-green-600" : "text-red-600"
            }`}
          >
            <TrendingUp
              className={`w-4 h-4 mr-1 ${trend === "down" ? "rotate-180" : ""}`}
            />
            {trendValue}
          </div>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-sm text-gray-600 font-medium">{title}</p>
        <p className="text-3xl font-bold text-gray-900">
          {typeof amount === "number" ? `₦${amount.toLocaleString()}` : amount}
        </p>
      </div>
      <div
        className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${color.replace(
          "bg-",
          "from-"
        )} to-transparent transition-all duration-300`}
        style={{ width: isHovered ? "100%" : "0%" }}
      />
    </div>
  );
};

const EarningsSummary = ({ summary, stats }: SummaryProps) => {
  const {
    totalEarnings = 0,
    totalWithdrawals = 0,
    availableBalance = 0,
  } = summary || {};

  const lastPayout = stats?.lastPayout || totalWithdrawals;
  const coursesSold = stats?.coursesSold || 0;
  const earningsGrowth = stats?.earningsGrowth || "+0%";
  const courseGrowth = stats?.courseGrowth || "+0%";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Total Earnings"
        amount={totalEarnings}
        icon={Target}
        trend="up"
        trendValue={earningsGrowth}
        color="bg-indigo-600"
      />
      <StatCard
        title="Available Balance"
        amount={availableBalance}
        icon={Clock}
        color="bg-yellow-500"
      />
      <StatCard
        title="Last Payout"
        amount={lastPayout}
        icon={CheckCircle}
        color="bg-green-600"
      />
      <StatCard
        title="Courses Sold"
        amount={coursesSold}
        icon={Users}
        trend="up"
        trendValue={courseGrowth}
        color="bg-purple-600"
      />
    </div>
  );
};

export default EarningsSummary;
