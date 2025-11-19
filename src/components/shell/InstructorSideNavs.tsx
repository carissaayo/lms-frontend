import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  FileText,
  NotebookPen,
  UsersRound,
  Wallet,
} from "lucide-react";
const InstructorSideNavs = () => {
  return (
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
  );
};

export default InstructorSideNavs;
