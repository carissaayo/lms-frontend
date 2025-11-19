
import { Link } from "@tanstack/react-router";
import { Bell, CircleUser, Settings } from "lucide-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { LogoutDialog } from "../logout-dialog";
const TopNav = () => {
  return (
    <div className="flex items-center gap-3 flex-1 justify-end">
      <Avatar className="h-8 w-8 cursor-pointer block md:hidden">
        <AvatarImage
          src="/src/assets/menubar.svg"
          alt="@menubar"
          className="text-12 hover:rotate-90"
        />
      </Avatar>

      <Link
        to="/"
        className="h-10 w-10 flex items-center justify-center rounded-full bg-background transition-all duration-200 hover:bg-primary-light/30 hover:shadow-md relative group"
      >
        <Bell className="h-5 w-5 cursor-pointer text-primary-dark transition-transform group-hover:scale-110" />
        <span className="absolute -top-1 -right-1 h-3 w-3 bg-error rounded-full border-2 border-white"></span>
      </Link>

      <Link
        to="/settings"
        className="h-10 w-10 flex items-center justify-center rounded-full bg-background transition-all duration-200 hover:bg-primary-light/30 hover:shadow-md group"
      >
        <Settings className="h-5 w-5 cursor-pointer text-primary-dark transition-transform group-hover:rotate-90" />
      </Link>

      <div className="h-10 w-10 flex items-center justify-center">
        <LogoutDialog />
      </div>

      <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ring-2 ring-primary-light/30">
        <CircleUser className="h-6 w-6 text-white" />
      </div>
    </div>
  );
};

export default TopNav;
