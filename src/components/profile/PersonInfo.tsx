import { Card,CardContent,CardDescription,CardTitle } from "@/components/ui/card";
import { UserProfile } from "@/types/user.types";
import { Field } from "./Field";
import { AlignLeft, Mail, Phone, Settings, User } from "lucide-react";

type Props = {
  user: UserProfile;
  editMode?: boolean;
  handleFieldChange: (name: string, value: string) => void;
};

export default function PersonalInfoCard({ user, editMode, handleFieldChange }: Props) {
  return (
    <Card className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100">
      <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
        <Settings className="w-5 h-5 text-indigo-500" />
        Personal Information
      </CardTitle>
      <CardDescription className="text-sm text-gray-500 mt-1 mb-6 border-b pb-4">
        Update your name, contact details, and professional bio.
      </CardDescription>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field
          icon={User}
          label="First Name"
          name="firstName"
          value={user.firstName}
          onChange={handleFieldChange}
          editMode={editMode}
        />
        <Field
          icon={User}
          label="Last Name"
          name="lastName"
          value={user.lastName}
          onChange={handleFieldChange}
          editMode={editMode}
        />
        <Field
          icon={Mail}
          label="Email Address"
          name="email"
          value={user.email}
          onChange={handleFieldChange}
          editMode={false}
          type="email"
        />
        <Field
          icon={Phone}
          label="Phone Number"
          name="phone"
          value={user.phoneNumber}
          onChange={handleFieldChange}
          editMode={editMode}
          type="tel"
        />

        <div className="col-span-1 sm:col-span-2">
          <Field
            icon={AlignLeft}
            label="Professional Bio"
            name="bio"
            value={user.bio || ""}
            onChange={handleFieldChange}
            editMode={editMode}
            type="textarea"
          />
        </div>
      </CardContent>
    </Card>
  );
}
