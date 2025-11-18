import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, UserCheck, UserX } from "lucide-react";

export function AdminStats({
  total,
  active,
  suspended,
}: {
  total: number;
  active: number;
  suspended: number;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Total Admins</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Activity className="h-8 w-8 text-primary" />
          <p className="text-2xl font-semibold">{total}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Active</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <UserCheck className="h-8 w-8 text-green-600" />
          <p className="text-2xl font-semibold">{active}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Suspended</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <UserX className="h-8 w-8 text-red-600" />
          <p className="text-2xl font-semibold">{suspended}</p>
        </CardContent>
      </Card>
    </div>
  );
}
