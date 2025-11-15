import { Card, CardContent } from "@/components/ui/card";
import { UserProfile } from "@/types/user.types";

type Props = {
  user: UserProfile;
  editMode?: boolean;
  onFieldChange?: (field: keyof UserProfile, value: string) => void;
};

export default function PersonalInfoCard({
  user,
  editMode,
  onFieldChange,
}: Props) {
  return (
    <Card className="my-12 bg-white border-gray-200">
      <CardContent className="p-6 px-12 space-y-6">
        <h2 className="text-lg font-semibold">Personal Information</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground">First Name</p>
            {editMode ? (
              <input
                type="text"
                value={user.firstName}
                onChange={(e) => onFieldChange?.("firstName", e.target.value)}
                className="border px-2 py-1 rounded w-full"
              />
            ) : (
              <p className="text-base font-medium">{user.firstName}</p>
            )}
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Last Name</p>
            {editMode ? (
              <input
                type="text"
                value={user.lastName}
                onChange={(e) => onFieldChange?.("lastName", e.target.value)}
                className="border px-2 py-1 rounded w-full"
              />
            ) : (
              <p className="text-base font-medium">{user.lastName}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground">Phone Number </p>
            {editMode ? (
              <input
                type="text"
                value={user.phoneNumber}
                onChange={(e) => onFieldChange?.("phoneNumber", e.target.value)}
                className="border px-2 py-1 rounded w-full"
              />
            ) : (
              <p className="text-base font-medium">{user.phoneNumber}</p>
            )}
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>

            <p className="text-base font-medium">{user.email}</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Bio </p>
          {editMode ? (
            <textarea
            minLength={32}
              value={user.bio}
              onChange={(e) => onFieldChange?.("bio", e.target.value)}
              className="border px-2 py-1 rounded w-full"
            />
          ) : (
            <p className="text-base font-medium">{user.bio}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
