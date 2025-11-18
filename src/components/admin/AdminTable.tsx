import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, UserCog, Lock, Unlock, Trash2, Mail } from "lucide-react";
import { AdminStatus } from "@/types/user.types";
import { Admin } from "@/hooks/admins/use-admin-admins";


export function AdminTable({
  admins,
  onView,
  onAction,
}: {
  admins: Admin[];
  onView: (id: string) => void;
  onAction: (admin: Admin, action: "suspend" | "activate" | "delete") => void;
}) {
  const getStatusBadge = (status: AdminStatus) => {
    const map = {
      [AdminStatus.APPROVED]: "bg-green-100 text-green-700",
      [AdminStatus.PENDING]: "bg-gray-100 text-gray-700",
      [AdminStatus.SUSPENDED]: "bg-red-100 text-red-700",
      [AdminStatus.REJECTED]: "bg-red-100 text-red-700",
    };
    return <Badge className={map[status]}>{status}</Badge>;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Admin</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Login</TableHead>
          <TableHead>Activity</TableHead>
          <TableHead>Joined</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {admins.map((admin) => (
          <TableRow key={admin._id} className="hover:bg-gray-50">
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center">
                  {admin.firstName[0]}
                </div>
                <div>
                  <p className="font-medium">{admin.firstName} {admin.lastName}</p>
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-3 w-3 mr-1" /> {admin.email}
                  </div>
                </div>
              </div>
            </TableCell>

            <TableCell>{getStatusBadge(admin.status)}</TableCell>
            <TableCell>{new Date(admin.lastLogin).toLocaleDateString()}</TableCell>
            <TableCell>{admin.activityCount} actions</TableCell>
            <TableCell>{new Date(admin.createdAt).toLocaleDateString()}</TableCell>

            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => onView(admin._id)}>
                    <UserCog className="h-4 w-4 mr-2" /> View Details
                  </DropdownMenuItem>

                  {admin.status === AdminStatus.APPROVED ? (
                    <DropdownMenuItem
                      className="text-orange-600"
                      onClick={() => onAction(admin, "suspend")}
                    >
                      <Lock className="h-4 w-4 mr-2" /> Suspend
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem
                      className="text-green-600"
                      onClick={() => onAction(admin, "activate")}
                    >
                      <Unlock className="h-4 w-4 mr-2" /> Activate
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => onAction(admin, "delete")}
                  >
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
