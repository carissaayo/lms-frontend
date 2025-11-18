import { useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAdmins } from "@/hooks/use-admin";
import { AdminStatus, Role } from "@/types/user.types";


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
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [actionType, setActionType] = useState<
    "suspend" | "activate" | "delete" | null
  >(null);

  const [newAdmin, setNewAdmin] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading, error } = useAdmins({
    search: debouncedSearch,
    status,
    page,
    limit,
  });

  const admins = data?.admins ?? [];
  const total = data?.total ?? 0;
  const pages = data?.pages ?? 0;

  const createAdminMutation = useMutation({
    mutationFn: async (adminData: typeof newAdmin) => {
      const response = await fetch("/api/admin-admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminData),
      });
      if (!response.ok) throw new Error("Failed to create admin");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
      toast.success("Admin created successfully");
      setCreateDialogOpen(false);
      setNewAdmin({ firstName: "", lastName: "", email: "" });
    },
    onError: (error: Error) => toast.error(error.message),
  });

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
    onError: (error: Error) => toast.error(error.message),
  });

  const handleCreateAdmin = () => createAdminMutation.mutate(newAdmin);

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

  const handleViewAdmin = (id: string) => {
    navigate({ to: `/admin/admins/${id}` });
  };

  return {
    search,
    status,
    page,
    limit,
    setSearch,
    setStatus,
    setPage,
    setLimit,

    createDialogOpen,
    actionDialogOpen,
    selectedAdmin,
    actionType,
    newAdmin,

    setCreateDialogOpen,
    setActionDialogOpen,
    setNewAdmin,

    admins,
    total,
    pages,
    isLoading,
    error,

    handleCreateAdmin,
    handleAdminAction,
    confirmAction,
    handleViewAdmin,

    AdminStatus,
    updateAdminMutation,
    createAdminMutation,
  };
}
