import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreVertical,
  Mail,
  Calendar,
  Activity,
  Lock,
  Unlock,
  Trash2,
  UserCog,
  User2Icon,
} from "lucide-react";
import { AdminStatus } from "@/types/user.types";
import { Admin } from "@/hooks/admins/use-admin-admins";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminAction } from "@/types/admin.types";


export function AdminTable({
  admins,
  handleViewAdmin,
  handleAdminAction,
  total,
}: {
  admins: Admin[];
  handleAdminAction: (admin: Admin, action: AdminAction) => void;
  handleViewAdmin: (id: string) => void;
  total: number;
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
    <Card>
      <CardHeader>
        <CardTitle>Administrators</CardTitle>
        <CardDescription>
          {total} {total === 1 ? "administrator" : "administrators"} found
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
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
              {admins.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">
                    <UserCog className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">No admins found</p>
                  </TableCell>
                </TableRow>
              ) : (
                admins.map((admin) => (
                  <TableRow key={admin._id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                          {admin?.avatar ? (
                            <img
                              src={admin?.avatar}
                              alt={admin?.firstName}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            // `${admin?.firstName?.charAt(0)}${admin?.lastName?.charAt(0)}`
                            <User2Icon className="rounded-full" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {admin?.firstName} {admin?.lastName}
                          </p>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Mail className="h-3 w-3" />
                            {admin?.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>{getStatusBadge(admin.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Activity className="h-3 w-3" />
                        {new Date(admin.lastLogin).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">
                        {admin?.activityCount} actions
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar className="h-3 w-3" />
                        {new Date(admin?.createdAt).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleViewAdmin(admin._id)}
                          >
                            <UserCog className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          {admin.status === AdminStatus.APPROVED ? (
                            <DropdownMenuItem
                              onClick={() =>
                                handleAdminAction(admin,AdminAction.SUSPENDED)
                              }
                              className="text-orange-600"
                            >
                              <Lock className="h-4 w-4 mr-2" />
                              Suspend Admin
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() =>
                                handleAdminAction(admin, AdminAction.APPROVED)
                              }
                              className="text-green-600"
                            >
                              <Unlock className="h-4 w-4 mr-2" />
                              Activate Admin
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleAdminAction(admin,AdminAction.REJECTED)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Admin
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
