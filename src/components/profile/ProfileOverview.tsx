
import { Camera, Edit,  Mail } from "lucide-react";
import { UserProfile } from "@/types/user.types";
import { useRef } from "react";

export type Props = {
  user: UserProfile;
  onEdit?: () => void;
  editMode?: boolean;
  onPictureChange?: (file: File) => void;
  newPictureFile: File | null;
};

export default function ProfileOverview({
  user,
  onEdit,
  onPictureChange,
  editMode,
  newPictureFile,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const imageSrc = newPictureFile
    ? URL.createObjectURL(newPictureFile)
    : user?.picture;
  const imageText = newPictureFile ? "New Image" : "AR";

  const handleImageClick = () => {
    if (editMode && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onPictureChange) {
      onPictureChange(file);
    }
  };

  return (
    <div className="bg-indigo-700 text-white rounded-xl p-8 shadow-xl mb-8 flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center space-x-6">
        <div className="relative">
          <img
            src={imageSrc}
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.onerror = null;
              img.src = `https://placehold.co/100x100/312e81/ffffff?text=${imageText}`;
            }}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-24 h-24 object-cover rounded-full border-4 border-indigo-400 shadow-2xl cursor-pointer"
            onClick={handleImageClick}
          />
          {editMode && (
            <div
              className="absolute bottom-0 right-0 p-2 bg-indigo-500 rounded-full border-2 border-white cursor-pointer hover:bg-indigo-600 transition"
              onClick={handleImageClick}
              aria-label="Change profile picture"
            >
              <Camera className="w-4 h-4 text-white" />
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
        </div>

        <div>
          <h2 className="text-3xl font-extrabold">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-indigo-200 mt-1 flex items-center gap-1">
            <Mail className="w-4 h-4" /> {user.email}
          </p>
        </div>
      </div>

      <div className="flex space-x-4 mt-6 md:mt-0">
        <button
          onClick={onEdit}
          disabled={editMode}
          className={`px-4 py-2 flex items-center gap-2 rounded-lg font-semibold transition duration-200 cursor-pointer ${
            editMode
              ? "bg-indigo-500/50 text-indigo-200 cursor-not-allowed"
              : "bg-indigo-500 hover:bg-indigo-400 text-white shadow-md"
          }`}
        >
          <Edit className="w-4 h-4" />
          Edit Profile
        </button>
     
      </div>
    </div>
  );
}
