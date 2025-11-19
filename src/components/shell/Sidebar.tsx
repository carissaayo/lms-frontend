import useAuthStore from "@/store/useAuthStore";
import AdminSideNavs from "./AdminSideNavs";
import StudentSideNavs from "./StudentSideNavs";
import InstructorSideNavs from "./InstructorSideNavs";
import SharedSideNavs from "./SharedSideNavs";

const Sidebar = () => {
  const { user } = useAuthStore((state) => state);
  const userRole: string = user?.role;
  return (
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
           <InstructorSideNavs/>
          )}

          {/* Student Navs */}
          {userRole == "student" && (
            <StudentSideNavs/>
          )}

          {/* Admin Navs */}
          {userRole === "admin" && <AdminSideNavs />}

          {/* Shared Navs */}
         <SharedSideNavs/>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
