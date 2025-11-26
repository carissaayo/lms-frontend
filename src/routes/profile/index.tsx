import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import AddressCard from "@/components/profile/AddressCard";
import PersonalInfoCard from "@/components/profile/PersonInfo";
import ProfileOverview from "@/components/profile/ProfileOverview";
import { useProfilePage } from "@/hooks/profile/use-profile";
import LoadingForbiddenAndError from "@/components/LoadingForbiddenAndError";
import { Loader2, Save, X } from "lucide-react";

export const Route = createFileRoute("/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    isLoading,
    error,
    user,
    editMode,
    updateProfile,
    handleEdit,
    handleCancel,
    handleFieldChange,
    handleSave,
    setNewPictureFile,
    newPictureFile,
  } = useProfilePage();






  return (
    <DashboardShell>
      <main className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Account Settings
          </h1>
          <p className="text-lg text-gray-500 mt-1">
            Manage your personal and account information.
          </p>
        </header>

        <LoadingForbiddenAndError
          error={error}
          isLoading={isLoading}
          title="Profile"
        />

        {user && (
          <>
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
                      <Loader2 className="w-4 h-4 animate-spin" /> Saving
                      Changes...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" /> Save Changes
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </DashboardShell>
  );
}
