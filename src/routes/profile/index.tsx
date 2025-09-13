import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import AddressCard from "@/components/profile/AddressCard";
import PersonalInfoCard from "@/components/profile/PersonInfo";
import ProfileOverview from "@/components/profile/ProfileOverview";
import { useProfile, useUpdateProfile } from "@/hooks/use-profile";
import { UserProfile } from "@/types/user.types";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading, isError, refetch } = useProfile();
  const [editMode, setEditMode] = useState(false);
  const [newPictureFile, setNewPictureFile] = useState<File | null>(null);
  const [editedUser, setEditedUser] = useState<UserProfile | null>(null);
  const updateProfile = useUpdateProfile();
  const editableFields = [
    "firstName",
    "lastName",
    "phoneNumber",
    "street",
    "city",
    "state",
    "country",
    "street",
  ] as const;

  if (isLoading) {
    return (
      <DashboardShell>
        <p className="text-center py-8">Loading profile...</p>
      </DashboardShell>
    );
  }

  if (isError || !data?.profile) {
    return (
      <DashboardShell>
        <p className="text-center text-red-500 py-8">
          Failed to load profile. Please try again.
        </p>
      </DashboardShell>
    );
  }

  const user: UserProfile = editedUser ?? data.profile;

  function handleEdit() {
    setEditedUser(data.profile);
    setEditMode(true);
  }

  function handleCancel() {
    setEditedUser(null);
    setNewPictureFile(null);
    setEditMode(false);
  }

  function handleFieldChange(field: string, value: string) {
    // Prevent editing of fields not in the editable list
    if (!editableFields.includes(field as any)) return;

    setEditedUser((prev) => (prev ? { ...prev, [field]: value } : prev));
  }

  async function handleSave() {
    if (!editedUser && !newPictureFile) return;

    const formData = new FormData();
    if (editedUser?.firstName)
      formData.append("firstName", editedUser.firstName);
    if (editedUser?.lastName) formData.append("lastName", editedUser.lastName);
    if (editedUser?.phoneNumber)
      formData.append("phoneNumber", editedUser.phoneNumber);
    if (editedUser?.street) formData.append("street", editedUser.street);
    if (newPictureFile) formData.append("picture", newPictureFile);

    updateProfile.mutate(formData, {
      onSuccess: () => {
        toast.success("Profile updated successfully!", {
          position: "top-center",
        });

        refetch();
        setEditMode(false);
        setEditedUser(null);
        setNewPictureFile(null);
      },
      onError: () => {
        toast.error("Failed to update profile", {
          description: "Please try again later.",
          position: "top-center",
        });
      },
    });
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
