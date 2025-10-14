import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Key } from "lucide-react";

export default function SecurityTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center border-b pb-4">
          <div>
            <p className="font-medium">Change Password</p>
            <p className="text-sm text-gray-500">Update your account password regularly.</p>
          </div>
          <Button>
            <Key className="w-4 h-4 mr-2" /> Change
          </Button>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Two-Factor Authentication</p>
            <p className="text-sm text-gray-500">Add extra security to your account.</p>
          </div>
          <Button variant="outline">
            <Lock className="w-4 h-4 mr-2" /> Enable 2FA
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
