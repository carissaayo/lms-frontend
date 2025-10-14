import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Bell,
  Lock,
  Shield,
  Eye,
  Smartphone,
  Wallet,
  Monitor,
  Tablet,
} from "lucide-react";

import { DashboardShell } from "@/components/dashboard-shell";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

import NotificationsTab from "@/components/settings/NotificationsTab";
import SecurityTab from "@/components/settings/SecurityTab";
import BankingTab from "@/components/settings/BankingTab";
import PrivacyTab from "@/components/settings/PrivacyTab";
import SessionsTab from "@/components/settings/SessionsTab";

export const Route = createFileRoute("/settings/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [isAddingBank, setIsAddingBank] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [bankForm, setBankForm] = useState({
    bankName: "",
    accountName: "",
    accountNumber: "",
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    showEmail: false,
    courseEnrollmentVisibility: "public",
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessions] = useState([
    {
      id: 1,
      device: "Chrome on Windows",
      deviceType: "desktop",
      location: "Lagos, Nigeria",
      ipAddress: "197.210.xxx.xxx",
      lastActive: "Active now",
      current: true,
    },
    {
      id: 2,
      device: "Safari on iPhone 14",
      deviceType: "mobile",
      location: "Ibadan, Nigeria",
      ipAddress: "105.112.xxx.xxx",
      lastActive: "2 hours ago",
      current: false,
    },
    {
      id: 3,
      device: "Firefox on MacOS",
      deviceType: "desktop",
      location: "Abuja, Nigeria",
      ipAddress: "102.89.xxx.xxx",
      lastActive: "Yesterday",
      current: false,
    },
  ]);

  const user = {
    id: "123",
    name: "John Doe",
    email: "john@example.com",
  };

  const handleBankFormChange = (field: string, value: string) => {
    setBankForm({ ...bankForm, [field]: value });
  };

  const handleAddBank = () => {
    if (bankForm.bankName && bankForm.accountName && bankForm.accountNumber) {
      if (editingIndex !== null) {
        const updated = [...bankAccounts];
        updated[editingIndex] = bankForm;
        setBankAccounts(updated);
        setEditingIndex(null);
      } else {
        setBankAccounts([...bankAccounts, bankForm]);
      }
      setBankForm({ bankName: "", accountName: "", accountNumber: "" });
      setIsAddingBank(false);
    }
  };

  const handleEditBank = (index: number) => {
    setBankForm(bankAccounts[index]);
    setEditingIndex(index);
    setIsAddingBank(true);
  };

  const handleDeleteBank = (index: number) => {
    setBankAccounts(bankAccounts.filter((_, i) => i !== index));
  };

  const handlePrivacyChange = (setting: string, value: any) => {
    setPrivacySettings({ ...privacySettings, [setting]: value });
  };

  const handleRevokeSession = (sessionId: number) => {
    console.log("Revoking session:", sessionId);
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case "mobile":
        return Smartphone;
      case "tablet":
        return Tablet;
      default:
        return Monitor;
    }
  };

  return (
    <DashboardShell>
      <main className="pb-12 overflow-hidden">
        {/* Header */}
        <div className="w-full mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold font-primary tracking-tight">
              Settings
            </h1>
          </div>
          <p className="text-gray-600 ml-14">
            Manage your account preferences and security settings.
          </p>
        </div>

        {/* Tabs */}
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
            <NotificationsTab user={user} />
          </TabsContent>

          <TabsContent value="security">
            <SecurityTab user={user} />
          </TabsContent>

          <TabsContent value="banking">
            <BankingTab
              accounts={bankAccounts}
              user={user}
              onAddBank={handleAddBank}
              onEditBank={handleEditBank}
              onDeleteBank={handleDeleteBank}
              bankForm={bankForm}
              onFormChange={handleBankFormChange}
              isAddingBank={isAddingBank}
            />
          </TabsContent>

          <TabsContent value="privacy">
            <PrivacyTab
              settings={privacySettings}
              onChange={handlePrivacyChange}
            />
          </TabsContent>

          <TabsContent value="sessions">
            <SessionsTab
              sessions={sessions}
              onRevoke={handleRevokeSession}
              getDeviceIcon={getDeviceIcon}
            />
          </TabsContent>
        </Tabs>
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </DashboardShell>
  );
}

export default RouteComponent;
