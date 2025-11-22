import { InstructorStatus } from '@/types/user.types';
import { Badge, CheckCircle, Clock, PauseCircle, XCircle } from 'lucide-react';


export const getInstructorStatusBadge = (status: InstructorStatus) => {
  const statuses: Record<
    InstructorStatus,
    { label: string; className: string; icon: any }
  > = {
    [InstructorStatus.APPROVED]: {
      label: "Approved",
      className: "bg-green-100 text-green-700 hover:bg-green-100",
      icon: CheckCircle,
    },
    [InstructorStatus.PENDING]: {
      label: "Pending Review",
      className: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
      icon: Clock,
    },
    [InstructorStatus.REJECTED]: {
      label: "Rejected",
      className: "bg-red-100 text-red-700 hover:bg-red-100",
      icon: XCircle,
    },
    [InstructorStatus.SUSPENDED]: {
      label: "Suspended",
      className: "bg-gray-100 text-gray-700",
      icon: PauseCircle,
    },
  };

  const cfg = statuses[status];
  if (!cfg) return null;

  const Icon = cfg.icon;

  return (
    <Badge className={`flex items-center gap-1 ${cfg.className}`}>
      <Icon className="h-4 w-4" />
      {cfg.label}
    </Badge>
  );
};

export default getInstructorStatusBadge;