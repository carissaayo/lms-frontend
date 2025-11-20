import { Link } from "@tanstack/react-router";
import { BookOpen,  ShieldUser, User2, Users } from "lucide-react";

const AdminSideNavs = () => {
  return (
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
        to="/admin/admins"
        className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-white/10 hover:shadow-md text-white/90 hover:text-white hover:translate-x-1"
        activeProps={{
          className:
            "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/20",
        }}
      >
        <ShieldUser className="h-5 w-5" />
        Admins
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
  );
};

export default AdminSideNavs;
