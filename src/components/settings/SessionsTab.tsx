import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, Globe2, Monitor, Tablet, CheckCircle } from "lucide-react";

interface Session {
  id: number | string;
  device: string;
  deviceType: "desktop" | "mobile" | "tablet";
  location: string;
  ipAddress: string;
  lastActive: string;
  current?: boolean;
}

export default function SessionsTab({
  sessions = [],
}: {
  sessions: Session[];
}) {
  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "mobile":
        return Smartphone;
      case "tablet":
        return Tablet;
      default:
        return Monitor;
    }
  };

  return (
    <Card className="animate-fadeIn">
      <CardHeader>
        <CardTitle>Active Sessions</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {sessions.length === 0 ? (
          <p className="text-gray-500 text-center py-6">
            No active sessions found
          </p>
        ) : (
          sessions.map((s) => {
            const Icon = getDeviceIcon(s.deviceType);
            return (
              <div
                key={s.id}
                className={`flex items-center justify-between border rounded-lg p-4 ${
                  s.current ? "bg-indigo-50 border-indigo-200" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-5 h-5 ${
                      s.deviceType === "mobile"
                        ? "text-indigo-600"
                        : "text-gray-600"
                    }`}
                  />
                  <div>
                    <p className="font-medium text-gray-900 flex items-center gap-1">
                      {s.device}
                      {s.current && (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      )}
                    </p>
                    <p className="text-sm text-gray-500">{s.location}</p>
                    <p className="text-xs text-gray-400">
                      {s.ipAddress} • {s.lastActive}
                    </p>
                  </div>
                </div>
                <Globe2 className="w-4 h-4 text-gray-400" />
              </div>
            );
          })
        )}
      </CardContent>

     
    </Card>
  );
}
