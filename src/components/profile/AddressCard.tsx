import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { UserProfile } from "@/types/user.types";
import { MapPin, Settings } from "lucide-react";
import { Field } from "./Field";

type Props = {
  user: UserProfile;
  editMode?: boolean;
  handleFieldChange: (name: string, value: string) => void;
};

export default function AddressCard({ user, editMode, handleFieldChange }: Props) {
  return (
    <Card className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100">
      <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
        <Settings className="w-5 h-5 text-indigo-500" />
        Address Details
      </CardTitle>
      <CardDescription className="text-sm text-gray-500 mt-1 mb-6 border-b pb-4">
        Your current residential or billing address.
      </CardDescription>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="col-span-1 sm:col-span-2">
          <Field
            icon={MapPin}
            label="Street Address"
            name="address.street"
            value={user.street || ""}
            onChange={handleFieldChange}
            editMode={editMode}
          />
        </div>
        <Field
          icon={MapPin}
          label="City"
          name="address.city"
          value={user.city || ""}
          onChange={handleFieldChange}
          editMode={editMode}
        />
        <Field
          icon={MapPin}
          label="State / Province"
          name="address.state"
          value={user.state || ""}
          onChange={handleFieldChange}
          editMode={editMode}
        />
        <Field
          icon={MapPin}
          label="Zip / Postal Code"
          name="address.zip"
          value={user.zip || ""}
          onChange={handleFieldChange}
          editMode={editMode}
        />
        <Field
          icon={MapPin}
          label="Country"
          name="address.country"
          value={user.country || ""}
          onChange={handleFieldChange}
          editMode={editMode}
        />
      </CardContent>
    </Card>
  );
}
