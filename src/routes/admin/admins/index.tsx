import { DashboardShell } from "@/components/dashboard-shell";
import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
} from "@/components/ui/card";
import { PaginationControls } from "@/components/courses/Pagination";

import { Admin, useAdminManagement } from "@/hooks/admins/use-admin-admins";
import { AdminDialogs } from "@/components/admin/AdminDialog";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminFilters } from "@/components/admin/AdminFilter";
import { AdminStats } from "@/components/admin/AdminStats";
import { AdminStatus } from "@/types/user.types";

export const Route = createFileRoute("/admin/admins/")({
  component: AdminManagementPage,
});






function AdminManagementPage() {

  const admin = useAdminManagement();
const suspendedAdmins = admin.admins.filter(
  (admin:Admin) => admin.status === AdminStatus.SUSPENDED
);
const total = admin.total;
const activeAdmins = admin.admins.filter(
  (admin: Admin) => admin.status === AdminStatus.APPROVED
);

  return (
    <DashboardShell>
        <main className="space-y-8 mb-10">
          <AdminStats {...admin} total={total} active={activeAdmins} suspended={suspendedAdmins} />

          <AdminFilters {...admin} />

          <Card>
            <AdminTable
              admins={admin.admins}
              onView={admin.handleViewAdmin}
              onAction={admin.handleAdminAction}
            />
          </Card>

          <PaginationControls
            currentPage={admin.page}
            totalPages={Math.ceil(admin.total / admin.limit)}
            onPageChange={admin.setPage}
            limit={admin.limit}
            onLimitChange={admin.setLimit}
          />

          <AdminDialogs {...admin} />
        </main >
        

    </DashboardShell>
  );
}
