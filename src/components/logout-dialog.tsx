import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import useAuthStore from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { LogOut } from "lucide-react";

export function LogoutDialog() {
  const [open, setOpen] = useState(false);
  const { user, logoutUser } = useAuthStore((state) => state);
  
  const navigate = useNavigate();


  const handleLogout = () => {
    
    logoutUser();
    navigate({ to: user?.role === "admin"?"/admin/auth/login":"/auth/login" });
  };

  return (
    <>
      <Button variant="ghost" onClick={() => setOpen(true)}>
        <LogOut className="h-5 w-5 cursor-pointer text-primary-dark group-hover:text-error transition-colors" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out? You will need to log in again to
              access your account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="bg-error"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
