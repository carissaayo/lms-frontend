import { DashboardShell } from "@/components/dashboard-shell";
import AddressCard from "@/components/profile/AddressCard";
import PersonalInfoCard from "@/components/profile/PersonInfo";
import ProfileOverview from "@/components/profile/ProfileOverview";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/student/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <DashboardShell>
      <main className="pb-12 overflow-hidden">
        <div className="w-full">
          <h1 className="text-3xl font-bold font-primary tracking-normal pb-4">
            My Profile
          </h1>
        </div>
        <ProfileOverview />
        <PersonalInfoCard />
        <AddressCard />
      </main>
    </DashboardShell>
  );
}
