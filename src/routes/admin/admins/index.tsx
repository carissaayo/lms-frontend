import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { PaginationControls } from "@/components/courses/Pagination";
import { DashboardShell } from "@/components/dashboard-shell";
import Forbidden from "@/components/forbidden";
import { AdminStats } from "@/components/admin/AdminStats";
import { AdminFilters } from "@/components/admin/AdminFilter";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminDialogs } from "@/components/admin/AdminDialog";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";

import { useAdminManagement } from "@/hooks/admins/use-admin-admins";


export const Route = createFileRoute("/admin/admins/")({
  component: AdminManagementPage,
});
function AdminManagementPage() {
  const admin = useAdminManagement();

  const {
    isForbidden,
    error,
    isLoading,
    totalAdmins,
    activeAdmins,
    suspendedAdmins,
    search,
    status,
    setSearch,
    setStatus,
    page,
    pages,
    setPage,
    limit,
    setLimit,
    admins,
    total,
    handleAdminAction,
    handleViewAdmin,
    createDialogOpen,
    setCreateDialogOpen,
    actionDialogOpen,
    setActionDialogOpen,
    actionType,
    setActionType,
    selectedAdmin,
    setSelectedAdmin,
    newAdmin,
    setNewAdmin,
    isPending,
    handleCreateAdmin,
    confirmAction,
  } = admin;

  return (
    <DashboardShell>
      <Toaster />

      <main className="space-y-8 mb-10">
        {/* Header */}
        <div className="flex items-center justify-between ...">
          <div>
            <h1 className="text-3xl font-bold">Admin Management</h1>
            <p className="text-lg text-muted-foreground">
              Manage platform administrators and their permissions
            </p>
          </div>

          <Button
            onClick={() => setCreateDialogOpen(true)}
            disabled={!!isForbidden || !!error}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Admin
          </Button>
        </div>

        {/* Loading */}
        {isLoading && <div className="flex justify-center my-10">...</div>}
        {isForbidden && error && <Forbidden />}
        {error && !isForbidden && (
          <p className="text-red-600 text-center mt-10">
            Failed to load admins.
          </p>
        )}

        {!isLoading && !isForbidden && (
          <>
            <AdminStats
              totalAdmins={totalAdmins}
              activeAdmins={activeAdmins}
              suspendedAdmins={suspendedAdmins}
            />

            <AdminFilters
              search={search}
              status={status}
              setSearch={setSearch}
              setStatus={setStatus}
              setPage={setPage}
              pages={pages}
              page={page}
            />

            <AdminTable
              admins={admins}
              handleAdminAction={handleAdminAction}
              handleViewAdmin={handleViewAdmin}
              total={total}
            />

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
            />
          </>
        )}

        <AdminDialogs
          createDialogOpen={createDialogOpen}
          setCreateDialogOpen={setCreateDialogOpen}
          actionDialogOpen={actionDialogOpen}
          setActionDialogOpen={setActionDialogOpen}
          actionType={actionType}
          setActionType={setActionType}
          selectedAdmin={selectedAdmin}
          setSelectedAdmin={setSelectedAdmin}
          newAdmin={newAdmin}
          setNewAdmin={setNewAdmin}
          isPending={isPending}
          handleCreateAdmin={handleCreateAdmin}
          confirmAction={confirmAction}
        />
      </main>
    </DashboardShell>
  );
}

export default AdminManagementPage;
