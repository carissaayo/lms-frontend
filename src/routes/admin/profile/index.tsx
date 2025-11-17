import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import AddressCard from "@/components/profile/AddressCard";
import PersonalInfoCard from "@/components/profile/PersonInfo";
import ProfileOverview from "@/components/profile/ProfileOverview";

import { useAdminProfileForm } from "@/hooks/admin-profile/use-admin-profile-form";


export const Route = createFileRoute("/admin/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    user,
    isLoading,
    isError,
    editMode,
    updateProfile,
    handleEdit,
    handleCancel,
    handleFieldChange,
    handleSave,
    setNewPictureFile,
  } = useAdminProfileForm();
  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex justify-center items-center h-96">
          <div className="h-10 w-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
        </div>
      </DashboardShell>
    );
  }

  if (isError || !user) {
    return (
      <DashboardShell>
        <p className="text-center text-red-500 py-8">
          Failed to load profile. Please try again.
        </p>
      </DashboardShell>
    );
  }



  return (
    <DashboardShell>
      <main className="pb-12 overflow-hidden">
        <div className="w-full">
          <h1 className="text-3xl font-bold font-primary tracking-normal pb-4">
            My Profile
          </h1>
        </div>

        <ProfileOverview
          user={user}
          onEdit={handleEdit}
          onPictureChange={(file: File) => setNewPictureFile(file)}
          editMode={editMode}
        />
        <PersonalInfoCard
          user={user}
          editMode={editMode}
          onFieldChange={handleFieldChange}
        />
        <AddressCard
          user={user}
          editMode={editMode}
          onFieldChange={handleFieldChange}
        />
        <div className="flex gap-4 justify-end mt-4">
          {editMode ? (
            <>
              {/* Cancel Button */}
              <button
                onClick={handleCancel}
                className="px-4 py-2 border rounded-md cursor-pointer hover:bg-gray-100"
              >
                Cancel
              </button>

              {/* Save Button */}
              <button
                onClick={handleSave}
                className={`px-4 py-2 bg-primary text-white rounded-md cursor-pointer ${
                  updateProfile.isPending
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-primary-dark"
                }`}
                disabled={updateProfile.isPending}
              >
                {updateProfile.isPending ? "Saving Changes..." : "Save Changes"}
              </button>
            </>
          ) : (
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-primary text-white rounded-md cursor-pointer hover:bg-primary-dark"
            >
              Edit Profile
            </button>
          )}
        </div>
      </main>
    </DashboardShell>
  );
}
