import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Admin } from "@/hooks/admins/use-admin-admins";



export function AdminDialogs({
  createDialogOpen,
  setCreateDialogOpen,
  actionDialogOpen,
  setActionDialogOpen,
  newAdmin,
  setNewAdmin,
  selectedAdmin,
  actionType,
  handleCreateAdmin,
  confirmAction,
  createAdminMutation,
  updateAdminMutation,
}: {
  createDialogOpen: boolean;
  setCreateDialogOpen: (v: boolean) => void;

  actionDialogOpen: boolean;
  setActionDialogOpen: (v: boolean) => void;

  newAdmin: any;
  setNewAdmin: (v: any) => void;

  selectedAdmin: Admin | null;
  actionType: "suspend" | "activate" | "delete" | null;

  handleCreateAdmin: () => void;
  confirmAction: () => void;

  createAdminMutation: any;
  updateAdminMutation: any;
}) {
  return (
    <>
      {/* Create Admin Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Admin</DialogTitle>
            <DialogDescription>
              Add a new admin to the system.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              placeholder="First Name"
              value={newAdmin.firstName}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, firstName: e.target.value })
              }
            />
            <Input
              placeholder="Last Name"
              value={newAdmin.lastName}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, lastName: e.target.value })
              }
            />
            <Input
              placeholder="Email"
              type="email"
              value={newAdmin.email}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, email: e.target.value })
              }
            />
          </div>

          <DialogFooter>
            <Button
              onClick={handleCreateAdmin}
              disabled={createAdminMutation.isPending}
            >
              {createAdminMutation.isPending ? "Creating..." : "Create Admin"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Action Dialog */}
      <Dialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "delete"
                ? "Delete Admin"
                : actionType === "suspend"
                  ? "Suspend Admin"
                  : "Activate Admin"}
            </DialogTitle>
            <DialogDescription>
              {selectedAdmin
                ? `${selectedAdmin.firstName} ${selectedAdmin.lastName}`
                : ""}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="destructive"
              onClick={confirmAction}
              disabled={updateAdminMutation.isPending}
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
    </>
  );
}
