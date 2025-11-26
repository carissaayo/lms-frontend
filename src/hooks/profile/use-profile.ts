import { useState } from "react";
import { toast } from "sonner";
import { useProfile, useUpdateProfile } from "@/hooks/use-profile";
import { UserProfile } from "@/types/user.types";

export function useProfilePage() {
  const { data, isLoading, isError, refetch,error } = useProfile();
  const updateProfile = useUpdateProfile();

  const [editMode, setEditMode] = useState(false);
  const [newPictureFile, setNewPictureFile] = useState<File | null>(null);
  const [editedUser, setEditedUser] = useState<UserProfile | null>(null);

  const editableFields = [
    "firstName",
    "lastName",
    "phoneNumber",
    "street",
    "city",
    "state",
    "country",
    "street",
    "bio",
  ] as const;

  const user: UserProfile  = editedUser ?? data?.profile;

  function handleEdit() {
    if (!data?.profile) return;
    setEditedUser(data.profile);
    setEditMode(true);
  }

  function handleCancel() {
    setEditedUser(null);
    setNewPictureFile(null);
    setEditMode(false);
  }

  function handleFieldChange(field: string, value: string) {
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
    if (editedUser?.city) formData.append("city", editedUser.city);
    if (editedUser?.country) formData.append("country", editedUser.country);
    if (editedUser?.state) formData.append("state", editedUser.state);
    if (editedUser?.bio) formData.append("bio", editedUser.bio);
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

  return {
    data,
    isLoading,
    isError,
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
  };
}
