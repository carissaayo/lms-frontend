import { Link } from "@tanstack/react-router";
import {
  Settings,
  User,
} from "lucide-react";
import useAuthStore from "@/store/useAuthStore";
const SharedSideNavs = () => {
     const { user } = useAuthStore((state) => state);
     const userRole: string = user?.role;
  return (
    <div className="pt-4 mt-4 border-t border-white/10">
      <Link
        to={userRole === "admin" ? "/admin/profile" : "/profile"}
        className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-white/10 hover:shadow-md text-white/90 hover:text-white hover:translate-x-1"
        activeProps={{
          className:
            "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/20",
        }}
      >
        <User className="h-5 w-5" />
        Profile
      </Link>
      <Link
        to="/settings"
        className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-white/10 hover:shadow-md text-white/90 hover:text-white hover:translate-x-1"
        activeProps={{
          className:
            "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/20",
        }}
      >
        <Settings className="h-5 w-5" />
        Settings
      </Link>
    </div>
  );
};

export default SharedSideNavs;
