import { Card } from "@/components/ui/card";
import { EngagementMetrics, RecentWithdrawal } from "@/types/adminAnalytics.types";

interface EngagementProps {
  engagementMetrics: EngagementMetrics;
  recentWithdrawals: RecentWithdrawal[];
}

const EngagementMetricsCon: React.FC<EngagementProps> = ({engagementMetrics,recentWithdrawals}) => {
  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <Card className="p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Engagement Metrics
        </h2>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Avg. Session Duration
              </span>
              <span className="text-lg font-bold text-gray-900">
                {engagementMetrics?.avgSessionDuration}m
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full"
                style={{
                  width: `${(engagementMetrics?.avgSessionDuration / 60) * 100}%`,
                }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Avg. Completion Rate
              </span>
              <span className="text-lg font-bold text-gray-900">
                {engagementMetrics?.avgCompletionRate}%
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-600 rounded-full"
                style={{
                  width: `${engagementMetrics?.avgCompletionRate}%`,
                }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Avg. Course Rating
              </span>
              <span className="text-lg font-bold text-gray-900">
                {engagementMetrics?.avgCourseRating}/5
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-500 rounded-full"
                style={{
                  width: `${(engagementMetrics?.avgCourseRating / 5) * 100}%`,
                }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Student Retention
              </span>
              <span className="text-lg font-bold text-gray-900">
                {engagementMetrics?.studentRetentionRate}%
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-600 rounded-full"
                style={{
                  width: `${engagementMetrics?.studentRetentionRate}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="lg:col-span-2 p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Recent Withdrawals
        </h2>

        {recentWithdrawals?.length ? (
          <div className="space-y-4">
            {recentWithdrawals.map((w: any) => (
              <div
                key={w._id}
                className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition rounded-lg p-4 border border-gray-200"
              >
                <div>
                  <p className="text-gray-800 font-medium">
                    {w.instructor?.firstName} {w.instructor?.lastName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(w.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      w.status === "successful"
                        ? "text-green-600"
                        : w.status === "pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                    }`}
                  >
                    ₦{w.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{w.status}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-6">
            No recent withdrawals found.
          </p>
        )}
      </Card>
    </div>
  );
};

export default EngagementMetricsCon;
