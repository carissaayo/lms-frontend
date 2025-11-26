import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import AddressCard from "@/components/profile/AddressCard";
import PersonalInfoCard from "@/components/profile/PersonInfo";
import ProfileOverview from "@/components/profile/ProfileOverview";

import { useAdminProfileForm } from "@/hooks/admin-profile/use-admin-profile-form";
import { Loader2, Save, X } from "lucide-react";


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
    newPictureFile,
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
          editMode={editMode}
          onEdit={handleEdit}
          onPictureChange={setNewPictureFile}
          newPictureFile={newPictureFile}
        />

        <div className="flex flex-col gap-8">
          <PersonalInfoCard
            user={user}
            editMode={editMode}
            handleFieldChange={handleFieldChange}
          />
          <AddressCard
            user={user}
            editMode={editMode}
            handleFieldChange={handleFieldChange}
          />
        </div>
        {editMode && (
          <div className="flex gap-4 justify-end mt-8 p-4 bg-white rounded-xl shadow-lg border border-indigo-100 sticky bottom-0 z-10">
            <button
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold transition duration-200 hover:bg-gray-100 flex items-center gap-2 shadow-md"
              disabled={updateProfile.isPending}
            >
              <X className="w-4 h-4" />
              Cancel
            </button>

            <button
              onClick={handleSave}
              className={`px-6 py-2 rounded-lg text-white font-semibold transition duration-200 flex items-center gap-2 shadow-md ${
                updateProfile.isPending
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
              disabled={updateProfile.isPending}
            >
              {updateProfile.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving Changes...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save Changes
                </>
              )}
            </button>
          </div>
        )}
      </main>
    </DashboardShell>
  );
}
