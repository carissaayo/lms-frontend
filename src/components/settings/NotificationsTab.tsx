import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function NotificationsTab() {
  const notifications = [
    { id: "email", label: "Email Alerts", description: "Receive updates via email" },
    { id: "sms", label: "SMS Notifications", description: "Receive updates via text messages" },
    { id: "push", label: "Push Notifications", description: "Get real-time notifications" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
          >
            <div>
              <Label className="font-medium">{n.label}</Label>
              <p className="text-sm text-gray-500">{n.description}</p>
            </div>
            <Switch />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
