import { Link } from "@tanstack/react-router";
import { BookOpen, FileText, Gauge, Store } from "lucide-react";

const AdminSideNavs = () => {
  return (
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
  );
};

export default AdminSideNavs;
