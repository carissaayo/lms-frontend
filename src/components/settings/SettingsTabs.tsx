import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Lock, Wallet, Eye, Smartphone } from "lucide-react";
import NotificationsTab from "./NotificationsTab";
import SecurityTab from "./SecurityTab";
import PrivacyTab from "./PrivacyTab";
import SessionsTab from "./SessionsTab";
import BankingTab from "./BankingTab";

export default function SettingsTabs() {
  return (
    <Tabs defaultValue="notifications" className="space-y-6">
      <TabsList className="grid grid-cols-5 w-full bg-white shadow-sm border rounded-lg">
        <TabsTrigger value="notifications" className="flex items-center gap-2">
          <Bell className="w-4 h-4" /> Notifications
        </TabsTrigger>
        <TabsTrigger value="security" className="flex items-center gap-2">
          <Lock className="w-4 h-4" /> Security
        </TabsTrigger>
        <TabsTrigger value="banking" className="flex items-center gap-2">
          <Wallet className="w-4 h-4" /> Banking
        </TabsTrigger>
        <TabsTrigger value="privacy" className="flex items-center gap-2">
          <Eye className="w-4 h-4" /> Privacy
        </TabsTrigger>
        <TabsTrigger value="sessions" className="flex items-center gap-2">
          <Smartphone className="w-4 h-4" /> Sessions
        </TabsTrigger>
      </TabsList>

      <TabsContent value="notifications">
        <NotificationsTab />
      </TabsContent>
      <TabsContent value="security">
        <SecurityTab />
      </TabsContent>
      <TabsContent value="banking">
        <BankingTab />
      </TabsContent>
      <TabsContent value="privacy">
        <PrivacyTab />
      </TabsContent>
      <TabsContent value="sessions">
        <SessionsTab />
      </TabsContent>
    </Tabs>
  );
}
