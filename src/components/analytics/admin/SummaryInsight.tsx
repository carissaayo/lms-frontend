import { Card } from '@/components/ui/card';
import { OverviewData } from '@/types/adminAnalytics.types';
import { Award } from 'lucide-react';
interface OverviewProps {
  overview: OverviewData ;
}


const SummaryInsight: React.FC<OverviewProps> = ({overview}) => {
  return (
    <Card className="p-6 border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="flex items-start">
        <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
          <Award className="h-6 w-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Platform Performance Summary
          </h3>
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Growth Rate</p>
              <p className="text-lg font-bold text-blue-600">+15.3%</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Active Rate</p>
              <p className="text-lg font-bold text-blue-600">
                {(
                  (overview?.activeStudents / overview?.totalStudents) *
                  100
                ).toFixed(1)}
                %
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                Avg. Revenue/Student
              </p>
              <p className="text-lg font-bold text-blue-600">
                ₦
                {Math.round(
                  overview?.totalRevenue / overview?.totalStudents
                ).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                Withdrawal Rate
              </p>
              <p className="text-lg font-bold text-blue-600">
                {(
                  (overview?.totalWithdrawals / overview?.totalEnrollments) *
                  100
                ).toFixed(1)}
                %
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SummaryInsight