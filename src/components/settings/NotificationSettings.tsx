"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function NotificationSettings() {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);

  return (
    <div className="space-y-4 max-w-md">
      <h2 className="text-lg font-semibold">Notifications</h2>
      <div className="flex items-center justify-between">
        <Label>Email Notifications</Label>
        <Switch checked={emailEnabled} onCheckedChange={setEmailEnabled} />
      </div>
      <div className="flex items-center justify-between">
        <Label>SMS Notifications</Label>
        <Switch checked={smsEnabled} onCheckedChange={setSmsEnabled} />
      </div>
    </div>
  );
}
