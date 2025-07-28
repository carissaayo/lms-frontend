import type { ReactNode } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BookOpen,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

const mobileNavBar = () => {
  return (
    <div className="flex items-center gap-4 flex-1 justify-end  ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full ">
            <Avatar className="h-8 w-8 cursor-pointer hidden sm:block">
              <AvatarImage
                src="/src/assets/avatar.svg"
                alt="@menubar"
                className="text-12 "
              />

              <AvatarFallback>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="48px"
                  viewBox="0 -960 960 960"
                  width="48px"
                  fill="#000000"
                >
                  <path d="M226-266q62-42 123-64.5T480.43-353q70.44 0 132.42 23.27Q674.84-306.46 735-266q42-55 59-105.46 17-50.45 17-108.54 0-140.25-95.33-235.62Q620.35-811 480.17-811 340-811 244.5-715.62 149-620.25 149-480q0 58 17.03 108.22Q183.05-321.57 226-266Zm253.81-177q-60.97 0-101.89-41.19Q337-525.37 337-585.69q0-60.31 41.11-101.81 41.1-41.5 102.08-41.5 60.97 0 101.89 41.69 40.92 41.68 40.92 102Q623-525 581.89-484q-41.1 41-102.08 41Zm.07 388Q393-55 315.61-88.29q-77.39-33.29-135.69-91.58-58.31-58.28-91.62-135.49Q55-392.57 55-480.35 55-567 88.5-644.5T180-780q58-58 135.26-92 77.25-34 165.09-34 86.65 0 164.15 34T780-780q58 58 92 135.62 34 77.61 34 164.5 0 86.88-34 164.38T780-180q-58 58-135.62 91.5Q566.77-55 479.88-55Zm.12-94q52 0 99.5-14t98.5-51q-52-35-99-51.5T480-282q-52 0-98.5 16.5T283-214q51 37 98 51t99 14Zm0-366q30.87 0 50.93-19.5Q551-554 551-585.5T530.93-637q-20.06-20-50.93-20t-50.93 20Q409-617 409-585.5t20.07 51Q449.13-515 480-515Zm0-71Zm1 371Z" />
                </svg>
              </AvatarFallback>
            </Avatar>
            <Avatar className="h-8 w-8 cursor-pointer block md:hidden ">
              <AvatarImage
                src="/src/assets/menubar.svg"
                alt="@menubar"
                className="text-12 hover:rotate-90"
              />

              <AvatarFallback className="hover:rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="48px"
                  viewBox="0 -960 960 960"
                  width="48px"
                  fill="#000000"
                >
                  <path d="M95-203v-95h771v95H95Zm0-230v-94h771v94H95Zm0-229v-95h771v95H95Z" />
                </svg>
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="center" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">John Doe</p>
              <p className="text-xs leading-none text-muted-foreground">
                john@example.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link to="/" className="flex w-full items-center">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/" className="flex w-full items-center">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default mobileNavBar;
