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

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  // In a real app, you would get the user role from your auth context/state
  const userRole = "instructor"; // or "student" or "moderator"

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <span className="text-primary">EduLearn</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link
                to="/"
                className="text-sm font-medium hover:underline underline-offset-4"
              >
                Dashboard
              </Link>
              <Link
                to="/"
                className="text-sm font-medium hover:underline underline-offset-4"
              >
                Courses
              </Link>
              {userRole === "instructor" && (
                <Link
                  to="/"
                  className="text-sm font-medium hover:underline underline-offset-4"
                >
                  My Courses
                </Link>
              )}
              {/* {userRole === "moderator" && ( */}
              <Link
                to="/"
                className="text-sm font-medium hover:underline underline-offset-4"
              >
                Moderation
              </Link>
              {/* )} */}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
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
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-muted/40 md:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <div className="py-2">
              <h2 className="px-4 text-lg font-semibold tracking-tight">
                {userRole === "instructor"
                  ? "Instructor Dashboard"
                  : userRole === "student"
                    ? "Student Dashboard"
                    : "Moderator Dashboard"}
              </h2>
            </div>
            <nav className="flex-1 space-y-1">
              <Link
                to="/"
                className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium hover:bg-muted"
              >
                <Home className="h-4 w-4" />
                Home
              </Link>

              {/* {userRole === "instructor" && ( */}
              <>
                <Link
                  to="/"
                  className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium hover:bg-muted"
                >
                  <BookOpen className="h-4 w-4" />
                  My Courses
                </Link>
                <Link
                  to="/"
                  className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium hover:bg-muted"
                >
                  <FileText className="h-4 w-4" />
                  Analytics
                </Link>
              </>
              {/* )} */}

              {/* {userRole === "student" && ( */}
              <>
                <Link
                  to="/"
                  className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium hover:bg-muted"
                >
                  <BookOpen className="h-4 w-4" />
                  My Learning
                </Link>
                <Link
                  to="/"
                  className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium hover:bg-muted"
                >
                  <FileText className="h-4 w-4" />
                  Assignments
                </Link>
              </>
              {/* )} */}

              {/* {userRole === "moderator" && ( */}
              <>
                <Link
                  to="/"
                  className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium hover:bg-muted"
                >
                  <BookOpen className="h-4 w-4" />
                  Course Reviews
                </Link>
                <Link
                  to="/"
                  className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium hover:bg-muted"
                >
                  <Users className="h-4 w-4" />
                  User Management
                </Link>
              </>
              {/* )} */}

              <Link
                to="/"
                className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium hover:bg-muted"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </nav>
          </div>
        </aside>
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="mx-auto max-w-5xl space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
