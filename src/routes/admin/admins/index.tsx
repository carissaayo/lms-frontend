import { useState } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Users,
  Search,
  UserCheck,
  UserX,
  Plus,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDebounce } from "@/hooks/use-debounce";
import { PaginationControls } from "@/components/courses/Pagination";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAddNewAdmin, useAdmins } from "@/hooks/use-admin";
import { AdminStatus } from "@/types/user.types";
import { Admin } from "@/hooks/admins/use-admin-admins";
import { Toaster } from "@/components/ui/sonner";
import useAuthStore from "@/store/useAuthStore";
import Forbidden from "@/components/forbidden";

export const Route = createFileRoute("/admin/admins/")({
  component: AdminManagementPage,
});

const StatCard = ({
  title,
  description,
  count,
  bgColor,
  textColor = "text-gray-900",
  descriptionTextColor = "text-gray-600",
  icon: Icon,
}: {
  title: string;
  description: string;
  count: number | string;
  bgColor: string;
  textColor?: string;
  descriptionTextColor?: string;
  icon: React.ElementType;
}) => (
  <div className={`${bgColor} rounded-xl p-6 shadow-sm`}>
    <div className="flex items-start justify-between">
      <div>
        <p className={`text-sm font-medium ${descriptionTextColor}`}>
          {description}
        </p>
        <p className={`text-3xl font-bold ${textColor} mt-2`}>{count}</p>
        <p className={`text-lg font-semibold ${textColor} mt-1`}>{title}</p>
      </div>
      <div
        className={`h-12 w-12 rounded-lg ${
          bgColor.includes("primary") ||
          bgColor.includes("blue") ||
          bgColor.includes("green")
            ? "bg-white/20"
            : "bg-primary/10"
        } flex items-center justify-center`}
      >
        <Icon className={`h-6 w-6 ${textColor}`} />
      </div>
    </div>
  </div>
);

function AdminManagementPage() {
  const { isForbidden } = useAuthStore.getState();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
console.log(isForbidden,"isFor");

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [role, setRole] = useState("all");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [actionType, setActionType] = useState<
    "suspend" | "activate" | "delete" | null
  >(null);

  const [newAdmin, setNewAdmin] = useState({
    email: "",
  });

  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading, error } = useAdmins({
    search: debouncedSearch,
    status,
    page,
    limit,
  });

  console.log(data, "data");

  const admins: Admin[] = data?.admins ?? [];
  const total = data?.total ?? 0;
  const pages = data?.pages ?? 0;

  // Calculate stats
  const totalAdmins = total;
  const activeAdmins = admins.filter(
    (a) => a.status === AdminStatus.APPROVED
  ).length;
  const suspendedAdmins = admins.filter(
    (a) => a.status === AdminStatus.SUSPENDED
  ).length;

  const { mutate: createAdmin, isPending } = useAddNewAdmin();

  // Update Admin Status Mutation
  const updateAdminMutation = useMutation({
    mutationFn: async ({
      adminId,
      action,
    }: {
      adminId: string;
      action: string;
    }) => {
      const response = await fetch(`/api/admin-admins/${adminId}/${action}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error(`Failed to ${action} admin`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
      toast.success("Admin status updated");
      setActionDialogOpen(false);
      setSelectedAdmin(null);
      setActionType(null);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update admin");
    },
  });

  const handleCreateAdmin = () => {
    createAdmin(newAdmin);
  };

  const handleAdminAction = (
    admin: Admin,
    action: "suspend" | "activate" | "delete"
  ) => {
    setSelectedAdmin(admin);
    setActionType(action);
    setActionDialogOpen(true);
  };

  const confirmAction = () => {
    if (selectedAdmin && actionType) {
      updateAdminMutation.mutate({
        adminId: selectedAdmin._id,
        action: actionType,
      });
    }
  };

  const handleViewAdmin = (adminId: string) => {
    navigate({ to: `/admin/admins/${adminId}` });
  };

  const getStatusBadge = (status: AdminStatus) => {
    const statusConfig = {
      [AdminStatus.APPROVED]: {
        label: "Active",
        className: "bg-green-100 text-green-700 border-green-200",
      },
      [AdminStatus.PENDING]: {
        label: "Inactive",
        className: "bg-gray-100 text-gray-700 border-gray-200",
      },
      [AdminStatus.SUSPENDED]: {
        label: "Suspended",
        className: "bg-red-100 text-red-700 border-red-200",
      },
      [AdminStatus.REJECTED]: {
        label: "Rejected",
        className: "bg-red-100 text-red-700 border-red-200",
      },
    };
    const config = statusConfig[status];
    return <Badge className={config?.className}>{config?.label}</Badge>;
  };



  return (
    <DashboardShell>
      <Toaster />
      <main className="space-y-8 mb-10">
        {/* Header */}
        <div className="flex items-center justify-between flex-col sm:flex-row gap-4 border-b border-gray-300 pb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Admin Management
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage platform administrators and their permissions
            </p>
          </div>


          <Button
            onClick={() => setCreateDialogOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            disabled={!!isForbidden||!!error}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Admin
          </Button>
        </div>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="w-full flex justify-center my-10">
            <div className="h-10 w-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
          </div>
        )}
        {isForbidden && error && (
          <Forbidden/>
        )}

        {error && !isForbidden && (
          <p className="text-red-600 text-center mt-10">
            Failed to load admins.
          </p>
        )}

        {!isLoading && !isForbidden && (
          <>
            {/* Stats Section */}
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

            {/* Filters Section */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Search by name or email..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="w-full lg:w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value={AdminStatus.APPROVED}>
                        Active
                      </SelectItem>
                      <SelectItem value={AdminStatus.PENDING}>
                        Inactive
                      </SelectItem>
                      <SelectItem value={AdminStatus.SUSPENDED}>
                        Suspended
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Showing page <span className="font-semibold">{page}</span>{" "}
                    of <span className="font-semibold">{pages || 1}</span>
                  </p>
                  {(search || status !== "all" || role !== "all") && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSearch("");
                        setStatus("all");
                        setRole("all");
                      }}
                    >
                      Clear filters
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Admins Table */}
            <Card>
              <CardHeader>
                <CardTitle>Administrators</CardTitle>
                <CardDescription>
                  {total} {total === 1 ? "administrator" : "administrators"}{" "}
                  found
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
                          <TableRow
                            key={admin._id}
                            className="hover:bg-gray-50"
                          >
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

                            <TableCell>
                              {getStatusBadge(admin.status)}
                            </TableCell>
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
                                {new Date(
                                  admin?.createdAt
                                ).toLocaleDateString()}
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
                                        handleAdminAction(admin, "suspend")
                                      }
                                      className="text-orange-600"
                                    >
                                      <Lock className="h-4 w-4 mr-2" />
                                      Suspend Admin
                                    </DropdownMenuItem>
                                  ) : (
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleAdminAction(admin, "activate")
                                      }
                                      className="text-green-600"
                                    >
                                      <Unlock className="h-4 w-4 mr-2" />
                                      Activate Admin
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleAdminAction(admin, "delete")
                                    }
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

            <PaginationControls
              currentPage={page}
              totalPages={Math.ceil(total / limit)}
              limit={limit}
              onPageChange={(newPage) => {
                setPage(newPage);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onLimitChange={(newLimit) => {
                setLimit(newLimit);
                setPage(1);
              }}
              className="mt-8"
            />
          </>
        )}

        {/* Create Admin Dialog */}
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Administrator</DialogTitle>
              <DialogDescription>
                Add them by adding up their email
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newAdmin.email}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, email: e.target.value })
                  }
                  placeholder="admin@example.com"
                  className="mt-1.5"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setCreateDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateAdmin}
                disabled={isPending || !newAdmin.email}
                className="bg-gradient-to-r from-blue-600 to-purple-600"
              >
                {isPending ? "Creating..." : "Create Admin"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Action Confirmation Dialog */}
        <Dialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {actionType === "delete"
                  ? "Delete Administrator"
                  : actionType === "suspend"
                    ? "Suspend Administrator"
                    : "Activate Administrator"}
              </DialogTitle>
              <DialogDescription>
                {actionType === "delete" ? (
                  <>
                    Are you sure you want to delete{" "}
                    <span className="font-semibold">
                      {selectedAdmin?.firstName} {selectedAdmin?.lastName}
                    </span>
                    ? This action cannot be undone.
                  </>
                ) : actionType === "suspend" ? (
                  <>
                    Are you sure you want to suspend{" "}
                    <span className="font-semibold">
                      {selectedAdmin?.firstName} {selectedAdmin?.lastName}
                    </span>
                    ? They will lose access to the admin panel.
                  </>
                ) : (
                  <>
                    Are you sure you want to activate{" "}
                    <span className="font-semibold">
                      {selectedAdmin?.firstName} {selectedAdmin?.lastName}
                    </span>
                    ? They will regain access to the admin panel.
                  </>
                )}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setActionDialogOpen(false);
                  setSelectedAdmin(null);
                  setActionType(null);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={confirmAction}
                disabled={updateAdminMutation.isPending}
                className={
                  actionType === "delete"
                    ? "bg-red-600 hover:bg-red-700"
                    : actionType === "suspend"
                      ? "bg-orange-600 hover:bg-orange-700"
                      : "bg-green-600 hover:bg-green-700"
                }
              >
                {updateAdminMutation.isPending
                  ? "Processing..."
                  : actionType === "delete"
                    ? "Delete"
                    : actionType === "suspend"
                      ? "Suspend"
                      : "Activate"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </DashboardShell>
  );
}
