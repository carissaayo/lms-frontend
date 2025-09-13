import { Card, CardContent } from "@/components/ui/card";
import { UserProfile } from "@/types/user.types";

type Props = {
  user: UserProfile;
  editMode?: boolean;
  onFieldChange?: (field: keyof UserProfile, value: string) => void;
};

export default function AddressCard({ user, editMode, onFieldChange }: Props) {
  return (
    <Card className="my-12 bg-white border-gray-200">
      <CardContent className="px-12 py-2 space-y-4">
        <h2 className="text-xl font-semibold font-secondary">Address</h2>

        {/* Country & State */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground">Country</p>
            {editMode ? (
              <input
                type="text"
                value={user.country ?? ""}
                onChange={(e) => onFieldChange?.("country", e.target.value)}
                className="border px-2 py-1 rounded w-full"
              />
            ) : (
              <p className="text-base font-medium">{user?.country || "N/A"}</p>
            )}
          </div>
          <div>
            <p className="text-sm text-muted-foreground">State</p>
            {editMode ? (
              <input
                type="text"
                value={user.state ?? ""}
                onChange={(e) => onFieldChange?.("state", e.target.value)}
                className="border px-2 py-1 rounded w-full"
              />
            ) : (
              <p className="text-base font-medium">{user?.state || "N/A"}</p>
            )}
          </div>
        </div>

        {/* City & Street */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground">City</p>
            {editMode ? (
              <input
                type="text"
                value={user.city ?? ""}
                onChange={(e) => onFieldChange?.("city", e.target.value)}
                className="border px-2 py-1 rounded w-full"
              />
            ) : (
              <p className="text-base font-medium">{user?.city || "N/A"}</p>
            )}
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Street</p>
            {editMode ? (
              <input
                type="text"
                value={user.street ?? ""}
                onChange={(e) => onFieldChange?.("street", e.target.value)}
                className="border px-2 py-1 rounded w-full"
              />
            ) : (
              <p className="text-base font-medium">{user?.street || "N/A"}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
