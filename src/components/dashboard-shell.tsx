import type { ReactNode } from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

import {
  Bell,
  BookOpen,
  CircleUser,
  FileText,
  Home,
  LogOut,
  NotebookPen,
  Settings,
  Users,
  UsersRound,
  Wallet,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import useAuthStore from "@/store/useAuthStore";

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const { user } = useAuthStore((state) => state);

  const userRole = user?.role;

  return (
    <div className="w-full h-screen flex flex-col font-primary text-text overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden w-52 lg:w-64  border-r-2  md:block bg-primary-light text-white ">
          <div className="flex h-full flex-col gap-2 p-4">
            <div className="py-2">
              <h1 className="flex items-center gap-2 text-3xl font-bold">
                DevLearn
              </h1>
            </div>
            <nav className="flex-1 space-y-4 text-base lg:text-xl font-medium pt-12 font-heading">
              <Link
                to={
                  userRole === "instructor"
                    ? "/dashboard/instructor"
                    : "/dashboard/student"
                }
                className="flex items-center gap-3 rounded-lg px-4 py-2   hover:bg-muted"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              {/* Instructor Navs */}
              {userRole === "instructor" && (
                <>
                  <Link
                    to="/dashboard/instructor/courses"
                    className="flex items-center gap-3 rounded-lg px-4 py-2   hover:bg-muted"
                  >
                    <BookOpen className="h-4 w-4" />
                    My Courses
                  </Link>
                  <Link
                    to="/dashboard/instructor/assignments"
                    className="flex items-center gap-3 rounded-lg px-4 py-2   hover:bg-muted"
                  >
                    <NotebookPen className="h-4 w-4" />
                    Assignments
                  </Link>
                  <Link
                    to="/dashboard/instructor/students"
                    className="flex items-center gap-3 rounded-lg px-4 py-2   hover:bg-muted"
                  >
                    <UsersRound className="h-4 w-4" />
                    Students
                  </Link>
                  <Link
                    to="/dashboard/instructor/earnings"
                    className="flex items-center gap-3 rounded-lg px-4 py-2   hover:bg-muted"
                  >
                    <Wallet className="h-4 w-4" />
                    Earnings
                  </Link>
                  <Link
                    to="/dashboard/instructor/analytics"
                    className="flex items-center gap-3 rounded-lg px-4 py-2   hover:bg-muted"
                  >
                    <FileText className="h-4 w-4" />
                    Analytics
                  </Link>
                </>
              )}

              {userRole === "student" && (
                <>
                  <Link
                    to="/"
                    className="flex items-center gap-3 rounded-lg px-4 py-2   hover:bg-muted"
                  >
                    <BookOpen className="h-4 w-4" />
                    My Learning
                  </Link>
                  <Link
                    to="/"
                    className="flex items-center gap-3 rounded-lg px-4 py-2   hover:bg-muted"
                  >
                    <FileText className="h-4 w-4" />
                    Assignments
                  </Link>
                </>
              )}

              {userRole === "moderator" && (
                <>
                  <Link
                    to="/"
                    className="flex items-center gap-3 rounded-lg px-4 py-2   hover:bg-muted"
                  >
                    <BookOpen className="h-4 w-4" />
                    Course Reviews
                  </Link>
                  <Link
                    to="/"
                    className="flex items-center gap-3 rounded-lg px-4 py-2   hover:bg-muted"
                  >
                    <Users className="h-4 w-4" />
                    User Management
                  </Link>
                </>
              )}

              <Link
                to="/"
                className="flex items-center gap-3 rounded-lg px-4 py-2   hover:bg-muted"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </nav>
          </div>
        </aside>
        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="sticky top-0 z-10 border-b-2 border-gray-300 py-2 px-6 sm:px-12 md:px-6 lg:px-12 bg-background-light text-text">
            <div className=" flex h-16 items-center justify-between gap-20 w-full">
              <div className="flex items-center gap-4 justify-between flex-[1.5]">
                <h1 className="text-primary-dark text-3xl font-heading">
                  Dashboard
                </h1>
              </div>

              {/* DropDown */}
              <div className="flex items-center gap-4 flex-1 justify-end  ">
                <Avatar className="h-8 w-8 cursor-pointer block md:hidden ">
                  <AvatarImage
                    src="/src/assets/menubar.svg"
                    alt="@menubar"
                    className="text-12 hover:rotate-90"
                  />
                </Avatar>

                <Link
                  to="/"
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100"
                >
                  <Bell className="h-6 w-6 cursor-pointer text-primary-dark" />
                </Link>

                <Link
                  to="/"
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100"
                >
                  <Settings className="h-6 w-6 cursor-pointer text-primary-dark" />
                </Link>
                <Link
                  to="/"
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100"
                >
                  <LogOut className="h-6 w-6 cursor-pointer text-primary-dark" />
                </Link>
                <div className="h-10 w-10 flex items-center justify-center rounded-full ">
                  <CircleUser className="h-8 w-8 cursor-pointer text-primary-dark" />
                </div>
              </div>
            </div>
          </header>
          <section className="px-6 sm:px-12 md:px-6 lg:px-12 pt-12 overflow-auto flex-1">
            {children}
          </section>
        </main>
      </div>
    </div>
  );
}
