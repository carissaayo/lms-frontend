import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function PrivacyTab() {
  const settings = [
    { label: "Show profile publicly", id: "publicProfile" },
    { label: "Allow message requests", id: "messageRequests" },
    { label: "Display online status", id: "onlineStatus" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {settings.map((s) => (
          <div
            key={s.id}
            className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0"
          >
            <Label>{s.label}</Label>
            <Switch />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
