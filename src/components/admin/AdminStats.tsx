
import {  UserCheck, Users, UserX } from "lucide-react";
import StatCard from "./Stat";
interface AdminStatsProps {
  totalAdmins: number;
  activeAdmins: number;
  suspendedAdmins: number;
}

export const AdminStats: React.FC<AdminStatsProps>= ({
  totalAdmins,
  activeAdmins,
  suspendedAdmins,
})=> {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Admins"
        description="All administrators"
        count={totalAdmins}
        bgColor="bg-blue-500"
        textColor="text-white"
        descriptionTextColor="text-white/90"
        icon={Users}
      />
      <StatCard
        title="Active"
        description="Currently active"
        count={activeAdmins}
        bgColor="bg-green-600"
        textColor="text-white"
        descriptionTextColor="text-white/90"
        icon={UserCheck}
      />
      <StatCard
        title="Suspended"
        description="Account suspended"
        count={suspendedAdmins}
        bgColor="bg-red-200"
        icon={UserX}
      />
    </div>
  );
}
