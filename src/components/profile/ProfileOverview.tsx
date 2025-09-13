import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserProfile } from "@/types/user.types";
import { useState } from "react";

export type Props = {
  user: UserProfile;
  onEdit?: () => void;
  editMode?: boolean;
  onPictureChange?: (file: File) => void;
};

export default function ProfileOverview({
  user,
  onEdit,
  onPictureChange,
  editMode,
}: Props) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onPictureChange) {
      onPictureChange(file); // notify parent
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file); // show preview immediately
    }
  };
  return (
    <Card className="my-12 bg-white border-gray-200">
      <CardContent className="p-6 px-12 flex items-center justify-between flex-wrap gap-12">
        {/* Profile Image */}
        <div className="bg-gray-300 h-40 w-40 rounded-full overflow-hidden relative">
          <Avatar className="w-full h-full">
            <AvatarImage
              src={preview ?? user?.picture ?? ""}
              alt={user.firstName || "Profile Picture"}
              className="object-cover"
            />
            <AvatarFallback className="text-7xl font-bold font-heading">
              {user?.firstName?.[0]?.toUpperCase() ?? "?"}
            </AvatarFallback>
          </Avatar>

          {/* Show file input only in edit mode */}
          {editMode && (
            <label className="absolute bottom-0 right-10 bg-white px-2 py-1 rounded cursor-pointer text-sm border border-gray-300 hover:bg-gray-100">
              Change
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          )}
        </div>
        {/* Info */}
        <div className="flex-1 min-w-[200px] text-center sm:text-left space-y-1">
          <h2 className="text-xl font-semibold">
            {user?.firstName} {user?.lastName}
          </h2>
          <p className="text-muted-foreground text-sm">{user?.email}</p>
          {user?.street && (
            <p className="text-muted-foreground text-sm">{user.street}</p>
          )}
        </div>

        {/* Edit button triggers parent handler */}
        <div>
          <Button
            variant="outline"
            className="cursor-pointer bg-white hover:bg-primary-light border-gray-300 rounded-full flex gap-2 justify-between items-center w-20 px-6"
            onClick={onEdit}
          >
            Edit
            <Pencil />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
