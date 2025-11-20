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
import { Label } from "../ui/label";
import { AdminAction } from "@/types/admin.types";

export function AdminDialogs({
  createDialogOpen,
  setCreateDialogOpen,

  actionDialogOpen,
  setActionDialogOpen,

  newAdmin,
  setNewAdmin,

  selectedAdmin,
  setSelectedAdmin,

  actionType,
  setActionType,

  confirmAction,
  handleCreateAdmin,
  isPending,
  
}: {
  createDialogOpen: boolean;
  setCreateDialogOpen: (v: boolean) => void;

  actionDialogOpen: boolean;
  setActionDialogOpen: (v: boolean) => void;

  newAdmin: any;
  setNewAdmin: (v: any) => void;

  selectedAdmin: Admin | null;
  setSelectedAdmin: (admin: Admin | null) => void;
  
  actionType: AdminAction | null;
  setActionType: (id:AdminAction | null) => void;

  handleCreateAdmin: () => void;
  confirmAction: () => void;


  isPending: boolean;
  
}) {
  return (
    <>
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

      {/* Action Dialog */}
      <Dialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType ===AdminAction.REJECTED
                ? "Delete Administrator"
                : actionType === AdminAction.SUSPENDED
                  ? "Suspend Administrator"
                  : "Activate Administrator"}
            </DialogTitle>
            <DialogDescription>
              {actionType === AdminAction.REJECTED ? (
                <>
                  Are you sure you want to delete{" "}
                  <span className="font-semibold">
                    {selectedAdmin?.firstName} {selectedAdmin?.lastName}
                  </span>
                  ? This action cannot be undone.
                </>
              ) : actionType === AdminAction.SUSPENDED ? (
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
              disabled={isPending}
              className={
                actionType === AdminAction.REJECTED
                  ? "bg-red-600 hover:bg-red-700"
                  : actionType === AdminAction.SUSPENDED
                    ? "bg-orange-600 hover:bg-orange-700"
                    : "bg-green-600 hover:bg-green-700"
              }
            >
              {isPending
                ? "Processing..."
                : actionType ===AdminAction.REJECTED
                  ? "Delete"
                  : actionType ===AdminAction.SUSPENDED
                    ? "Suspend"
                    : "Activate"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
