import type { ReactNode } from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

import {
  Bell,
  BookOpen,
  CircleUser,
  FileText,
  Gauge,
  NotebookPen,
  Settings,
  Store,
  User,
  User2,
  Users,
  UsersRound,
  Wallet,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import useAuthStore from "@/store/useAuthStore";
import { LogoutDialog } from "./logout-dialog";

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const { user } = useAuthStore((state) => state);
  const userRole:string = user?.role;
  

  return (
    <div className="w-full h-screen flex flex-col font-primary text-text overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        {/* Enhanced Sidebar with gradient background */}
        <aside className="hidden w-52 lg:w-64 border-r border-primary/10 md:block bg-gradient-to-b from-primary-dark via-primary to-primary-dark shadow-xl">
          <div className="flex h-full flex-col gap-2 p-4">
            <div className="py-2 pb-4 border-b border-white/10">
              <h1 className="flex items-center gap-2 text-3xl font-bold text-white drop-shadow-lg">
                DevLearn
              </h1>
            </div>
            <nav className="flex-1 space-y-2 text-base lg:text-lg font-medium pt-8 font-heading">
              {/* Instructor Navs */}
              {userRole === "instructor" && (
                <>
                  <Link
                    to="/instructor/analytics"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-white/10 hover:shadow-md text-white/90 hover:text-white hover:translate-x-1"
                    activeProps={{
                      className:
                        "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/20",
                    }}
                  >
                    <FileText className="h-5 w-5" />
                    Analytics
                  </Link>
                  <Link
                    to="/instructor/courses"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-white/10 hover:shadow-md text-white/90 hover:text-white hover:translate-x-1"
                    activeProps={{
                      className:
                        "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/20",
                    }}
                  >
                    <BookOpen className="h-5 w-5" />
                    My Courses
                  </Link>

                  <Link
                    to="/instructor/lessons"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-white/10 hover:shadow-md text-white/90 hover:text-white hover:translate-x-1"
                    activeProps={{
                      className:
                        "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/20",
                    }}
                  >
                    <BookOpen className="h-5 w-5" />
                    My Lessons
                  </Link>
                  <Link
                    to="/instructor/assignments"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-white/10 hover:shadow-md text-white/90 hover:text-white hover:translate-x-1"
                    activeProps={{
                      className:
                        "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/20",
                    }}
                  >
                    <NotebookPen className="h-5 w-5" />
                    Assignments
                  </Link>
                  <Link
                    to="/instructor/students"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-white/10 hover:shadow-md text-white/90 hover:text-white hover:translate-x-1"
                    activeProps={{
                      className:
                        "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/20",
                    }}
                  >
                    <UsersRound className="h-5 w-5" />
                    Students
                  </Link>
                  <Link
                    to="/instructor/earnings"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-white/10 hover:shadow-md text-white/90 hover:text-white hover:translate-x-1"
                    activeProps={{
                      className:
                        "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/20",
                    }}
                  >
                    <Wallet className="h-5 w-5" />
                    Earnings
                  </Link>
                </>
              )}

              {/* Student Navs */}
              {userRole == "student" && (
                <>
                  <Link
                    to="/student/analytics"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-white/10 hover:shadow-md text-white/90 hover:text-white hover:translate-x-1"
                    activeProps={{
                      className:
                        "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/20",
                    }}
                  >
                    <Gauge className="h-5 w-5" />
                    Analytics
                  </Link>
                  <Link
                    to="/student/enrollments"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-white/10 hover:shadow-md text-white/90 hover:text-white hover:translate-x-1"
                    activeProps={{
                      className:
                        "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/20",
                    }}
                  >
                    <BookOpen className="h-5 w-5" />
                    Enrollments
                  </Link>
                  <Link
                    to="/student/courses"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-white/10 hover:shadow-md text-white/90 hover:text-white hover:translate-x-1"
                    activeProps={{
                      className:
                        "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/20",
                    }}
                  >
                    <Store className="h-5 w-5" />
                    Courses
                  </Link>
                  <Link
                    to="/student/assigments"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-white/10 hover:shadow-md text-white/90 hover:text-white hover:translate-x-1"
                    activeProps={{
                      className:
                        "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/20",
                    }}
                  >
                    <FileText className="h-5 w-5" />
                    Assignments
                  </Link>

                  <Link
                    to="/student/payments"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-white/10 hover:shadow-md text-white/90 hover:text-white hover:translate-x-1"
                    activeProps={{
                      className:
                        "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/20",
                    }}
                  >
                    <FileText className="h-5 w-5" />
                    Payments
                  </Link>
                </>
              )}

              {/* Moderator Navs */}
              {userRole === "admin" && (
                <>
                  <Link
                    to="/admin/analytics"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-white/10 hover:shadow-md text-white/90 hover:text-white hover:translate-x-1"
                    activeProps={{
                      className:
                        "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/20",
                    }}
                  >
                    <BookOpen className="h-5 w-5" />
                    Analytics
                  </Link>

                  <Link
                    to="/admin/courses"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-white/10 hover:shadow-md text-white/90 hover:text-white hover:translate-x-1"
                    activeProps={{
                      className:
                        "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/20",
                    }}
                  >
                    <BookOpen className="h-5 w-5" />
                    Courses
                  </Link>

                  <Link
                    to="/admin/instructors"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-white/10 hover:shadow-md text-white/90 hover:text-white hover:translate-x-1"
                    activeProps={{
                      className:
                        "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/20",
                    }}
                  >
                    <Users className="h-5 w-5" />
                    Instructors
                  </Link>
                  <Link
                    to="/admin/students"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-white/10 hover:shadow-md text-white/90 hover:text-white hover:translate-x-1"
                    activeProps={{
                      className:
                        "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/20",
                    }}
                  >
                    <User2 className="h-5 w-5" />
                    Students
                  </Link>
                </>
              )}

              {/* Shared Navs */}
              <div className="pt-4 mt-4 border-t border-white/10">
                <Link
                  to={userRole==="admin" ?"/admin/profile":"/profile"}
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
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Enhanced Header with subtle gradient */}
          <header className="sticky top-0 z-10 border-b border-gray-200 py-2 px-6 sm:px-12 md:px-6 lg:px-12 bg-white/80 backdrop-blur-md text-text shadow-sm">
            <div className="flex h-16 items-center justify-between gap-20 w-full">
              <div className="flex items-center gap-4 justify-between flex-[1.5]">
                <h1 className="text-primary-dark text-3xl font-heading font-semibold">
                  Dashboard
                </h1>
              </div>

              {/* Top Right Icons with enhanced styling */}
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
                  <LogoutDialog/>
                </div>

                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ring-2 ring-primary-light/30">
                  <CircleUser className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </header>

          <section className="px-6 sm:px-12 md:px-6 lg:px-12 pt-12 overflow-auto flex-1 bg-background">
            {children}
          </section>
        </main>
      </div>
    </div>
  );
}