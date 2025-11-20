
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useDebounce } from "@/hooks/use-debounce";
import { useAddNewAdmin, useAdmins } from "@/hooks/use-admin";
import { AdminStatus, Role } from "@/types/user.types";
import { AdminAction } from "@/types/admin.types";
import useAuthStore from "@/store/useAuthStore";

export interface Admin {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  role: Role.ADMIN;
  status: AdminStatus;
  permissions: string[];
  createdAt: string;
  lastLogin: string;
  activityCount: number;
  createdBy?: string;
}
export function useAdminManagement() {
  const { isForbidden } = useAuthStore.getState();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Filters / Pagination
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Dialogs
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);

  // Selected admin + action
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [actionType, setActionType] = useState<AdminAction | null>(null);

  // New Admin Payload
  const [newAdmin, setNewAdmin] = useState({
    email: "",
  });

  const [debouncedSearch] = useDebounce(search, 500);

  // Query Admins
  const { data, isLoading, error } = useAdmins({
    search: debouncedSearch,
    status,
    page,
    limit,
  });

  const admins: Admin[] = data?.admins ?? [];
  const total = data?.total ?? 0;
  const pages = data?.pages ?? 0;

  // Stats
  const totalAdmins = total;
  const activeAdmins = admins.filter(
    (a) => a.status === AdminStatus.APPROVED
  ).length;
  const suspendedAdmins = admins.filter(
    (a) => a.status === AdminStatus.SUSPENDED
  ).length;

  // Create New Admin
  const { mutate: createAdmin, isPending } = useAddNewAdmin();

  const handleCreateAdmin = () => createAdmin(newAdmin);

  // Update Status Mutation
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
    onError: (err: any) => {
      toast.error(err?.message || "Failed to update admin");
    },
  });

  const handleAdminAction = (admin: Admin, action: AdminAction) => {
    setSelectedAdmin(admin);
    setActionType(action);
    setActionDialogOpen(true);
  };

  const confirmAction = () => {
    if (!selectedAdmin || !actionType) return;
    updateAdminMutation.mutate({
      adminId: selectedAdmin._id,
      action: actionType,
    });
  };

  const handleViewAdmin = (adminId: string) => {
    navigate({ to: `/admin/admins/${adminId}` });
  };

  return {
    // Auth
    isForbidden,

    // Filters + pagination
    search,
    status,
    page,
    limit,
    setSearch,
    setStatus,
    setPage,
    setLimit,

    // Data
    admins,
    total,
    pages,
    data,
    isLoading,
    error,

    // Stats
    totalAdmins,
    activeAdmins,
    suspendedAdmins,

    // Dialogs
    createDialogOpen,
    setCreateDialogOpen,
    actionDialogOpen,
    setActionDialogOpen,

    // Actions
    selectedAdmin,
    setSelectedAdmin,
    actionType,
    setActionType,
    handleAdminAction,
    confirmAction,
    handleCreateAdmin,
    handleViewAdmin,

    // New admin payload
    newAdmin,
    setNewAdmin,

    // Loading states
    isPending,
  };
}
