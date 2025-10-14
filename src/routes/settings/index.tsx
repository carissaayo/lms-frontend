import { DashboardShell } from "@/components/dashboard-shell";
import NotificationSettings from "@/components/settings/NotificationSettings";
import PasswordChangeForm from "@/components/settings/PasswordChangeForm";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, Lock, User, Shield, Palette, Globe, Wallet, Plus, Trash2, Edit2, Building2, Eye, EyeOff, Smartphone, Monitor, Tablet, MapPin, Clock, CheckCircle } from "lucide-react";

export const Route = createFileRoute("/settings/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [activeTab, setActiveTab] = useState("notifications");
  const [bankAccounts, setBankAccounts] = useState([]);
  const [isAddingBank, setIsAddingBank] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [bankForm, setBankForm] = useState({
    bankName: "",
    accountName: "",
    accountNumber: "",
  });

  // Privacy settings state
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    showEmail: false,
    courseEnrollmentVisibility: "public",
  });

  // Sessions state
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [activeSessions] = useState([
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

  const [loginHistory] = useState([
    {
      id: 1,
      action: "Successful login",
      device: "Chrome on Windows",
      location: "Lagos, Nigeria",
      timestamp: "Today at 09:30 AM",
      status: "success",
    },
    {
      id: 2,
      action: "Successful login",
      device: "Safari on iPhone",
      location: "Ibadan, Nigeria",
      timestamp: "Oct 13 at 03:45 PM",
      status: "success",
    },
    {
      id: 3,
      action: "Password changed",
      device: "Chrome on Windows",
      location: "Lagos, Nigeria",
      timestamp: "Oct 12 at 11:20 AM",
      status: "success",
    },
    {
      id: 4,
      action: "Failed login attempt",
      device: "Unknown device",
      location: "Unknown location",
      timestamp: "Oct 10 at 02:15 AM",
      status: "failed",
    },
  ]);

  const tabs = [
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
    { id: "banking", label: "Bank Accounts", icon: Wallet },
    { id: "privacy", label: "Privacy", icon: Eye },
    { id: "sessions", label: "Sessions & Devices", icon: Smartphone },
  ];

  const handleBankFormChange = (field, value) => {
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

  const handleEditBank = (index) => {
    setBankForm(bankAccounts[index]);
    setEditingIndex(index);
    setIsAddingBank(true);
  };

  const handleDeleteBank = (index) => {
    setBankAccounts(bankAccounts.filter((_, i) => i !== index));
  };

  const handleCancelForm = () => {
    setBankForm({ bankName: "", accountName: "", accountNumber: "" });
    setIsAddingBank(false);
    setEditingIndex(null);
  };

  const handlePrivacyChange = (setting, value) => {
    setPrivacySettings({ ...privacySettings, [setting]: value });
  };

  const handleRevokeSession = (sessionId) => {
    // In production, this would call an API to revoke the session
    console.log("Revoking session:", sessionId);
  };

  const getDeviceIcon = (deviceType) => {
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
        {/* Header Section */}
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
            Manage your account preferences and security settings
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex gap-8" aria-label="Settings tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 pb-4 px-1 border-b-2 transition-all duration-200 ${
                      isActive
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content Area with Animation */}
        <div className="space-y-6">
          {/* {activeTab === "notifications" && (
            <div className="animate-fadeIn">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Bell className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">Notification Preferences</h2>
                      <p className="text-sm text-gray-600 mt-1">
                        Choose how you want to be notified about activity
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <NotificationSettings />
                </div>
              </div>
            </div>
          )} */}

          {activeTab === "privacy" && (
            <div className="animate-fadeIn">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Eye className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">Privacy Settings</h2>
                      <p className="text-sm text-gray-600 mt-1">
                        Control who can see your information and activity
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* Profile Visibility */}
                  <div className="pb-6 border-b border-gray-100">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          Profile Visibility
                        </h3>
                        <p className="text-sm text-gray-600">
                          Control who can view your profile page and information
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 space-y-3">
                      <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50" style={{ borderColor: privacySettings.profileVisibility === "public" ? "#3b82f6" : "#e5e7eb" }}>
                        <input
                          type="radio"
                          name="profileVisibility"
                          value="public"
                          checked={privacySettings.profileVisibility === "public"}
                          onChange={(e) => handlePrivacyChange("profileVisibility", e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <div className="ml-3">
                          <div className="font-medium text-gray-900">Public</div>
                          <div className="text-sm text-gray-600">Anyone can view your profile</div>
                        </div>
                      </label>
                      <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50" style={{ borderColor: privacySettings.profileVisibility === "private" ? "#3b82f6" : "#e5e7eb" }}>
                        <input
                          type="radio"
                          name="profileVisibility"
                          value="private"
                          checked={privacySettings.profileVisibility === "private"}
                          onChange={(e) => handlePrivacyChange("profileVisibility", e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <div className="ml-3">
                          <div className="font-medium text-gray-900">Private</div>
                          <div className="text-sm text-gray-600">Only you can view your profile</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Email Visibility */}
                  <div className="pb-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          Email Visibility
                        </h3>
                        <p className="text-sm text-gray-600">
                          Allow other users to see your email address
                        </p>
                      </div>
                      <button
                        onClick={() => handlePrivacyChange("showEmail", !privacySettings.showEmail)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          privacySettings.showEmail ? "bg-blue-600" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            privacySettings.showEmail ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Course Enrollment Visibility */}
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          Course Enrollment Visibility
                        </h3>
                        <p className="text-sm text-gray-600">
                          Control who can see which courses you're enrolled in
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50" style={{ borderColor: privacySettings.courseEnrollmentVisibility === "public" ? "#3b82f6" : "#e5e7eb" }}>
                        <input
                          type="radio"
                          name="courseVisibility"
                          value="public"
                          checked={privacySettings.courseEnrollmentVisibility === "public"}
                          onChange={(e) => handlePrivacyChange("courseEnrollmentVisibility", e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <div className="ml-3">
                          <div className="font-medium text-gray-900">Public</div>
                          <div className="text-sm text-gray-600">Everyone can see your enrolled courses</div>
                        </div>
                      </label>
                      <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50" style={{ borderColor: privacySettings.courseEnrollmentVisibility === "connections" ? "#3b82f6" : "#e5e7eb" }}>
                        <input
                          type="radio"
                          name="courseVisibility"
                          value="connections"
                          checked={privacySettings.courseEnrollmentVisibility === "connections"}
                          onChange={(e) => handlePrivacyChange("courseEnrollmentVisibility", e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <div className="ml-3">
                          <div className="font-medium text-gray-900">Connections Only</div>
                          <div className="text-sm text-gray-600">Only people you follow can see your courses</div>
                        </div>
                      </label>
                      <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50" style={{ borderColor: privacySettings.courseEnrollmentVisibility === "private" ? "#3b82f6" : "#e5e7eb" }}>
                        <input
                          type="radio"
                          name="courseVisibility"
                          value="private"
                          checked={privacySettings.courseEnrollmentVisibility === "private"}
                          onChange={(e) => handlePrivacyChange("courseEnrollmentVisibility", e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <div className="ml-3">
                          <div className="font-medium text-gray-900">Private</div>
                          <div className="text-sm text-gray-600">Keep your course enrollments private</div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "sessions" && (
            <div className="animate-fadeIn space-y-6">
              {/* Two-Factor Authentication */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Shield className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">Two-Factor Authentication</h2>
                      <p className="text-sm text-gray-600 mt-1">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${twoFactorEnabled ? "bg-green-100" : "bg-gray-100"}`}>
                        {twoFactorEnabled ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <Shield className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {twoFactorEnabled ? "2FA Enabled" : "2FA Disabled"}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {twoFactorEnabled 
                            ? "Your account is protected with two-factor authentication" 
                            : "Enable 2FA to secure your account"}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                      className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                        twoFactorEnabled
                          ? "bg-red-600 text-white hover:bg-red-700"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      {twoFactorEnabled ? "Disable" : "Enable"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Sessions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyan-100 rounded-lg">
                      <Smartphone className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">Active Sessions</h2>
                      <p className="text-sm text-gray-600 mt-1">
                        Manage devices where you're currently logged in
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {activeSessions.map((session) => {
                      const DeviceIcon = getDeviceIcon(session.deviceType);
                      return (
                        <div
                          key={session.id}
                          className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                            session.current
                              ? "bg-green-50 border-green-200"
                              : "bg-white border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-lg ${
                              session.current ? "bg-green-100" : "bg-gray-100"
                            }`}>
                              <DeviceIcon className={`w-6 h-6 ${
                                session.current ? "text-green-600" : "text-gray-600"
                              }`} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-gray-900">
                                  {session.device}
                                </h4>
                                {session.current && (
                                  <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">
                                    Current
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {session.location}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {session.lastActive}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                IP: {session.ipAddress}
                              </p>
                            </div>
                          </div>
                          {!session.current && (
                            <button
                              onClick={() => handleRevokeSession(session.id)}
                              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                            >
                              Revoke
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Security tip:</span> If you see an unfamiliar device, revoke it immediately and change your password.
                    </p>
                  </div>
                </div>
              </div>

              {/* Login History */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Clock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">Login History</h2>
                      <p className="text-sm text-gray-600 mt-1">
                        Recent login activity and security events
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-2">
                    {loginHistory.map((log) => (
                      <div
                        key={log.id}
                        className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg ${
                            log.status === "success" ? "bg-green-100" : "bg-red-100"
                          }`}>
                            {log.status === "success" ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <EyeOff className="w-5 h-5 text-red-600" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{log.action}</h4>
                            <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                              <span>{log.device}</span>
                              <span>•</span>
                              <span>{log.location}</span>
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{log.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="animate-fadeIn">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Lock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">Security Settings</h2>
                      <p className="text-sm text-gray-600 mt-1">
                        Keep your account secure by updating your password regularly
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <PasswordChangeForm />
                </div>
              </div>
            </div>
          )}

          {activeTab === "banking" && (
            <div className="animate-fadeIn">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Wallet className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold">Bank Accounts</h2>
                        <p className="text-sm text-gray-600 mt-1">
                          Manage your payout bank accounts (up to 3 accounts)
                        </p>
                      </div>
                    </div>
                    {bankAccounts.length < 3 && !isAddingBank && (
                      <button
                        onClick={() => setIsAddingBank(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Add Account
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  {/* Add/Edit Form */}
                  {isAddingBank && (
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border-2 border-blue-200 animate-fadeIn">
                      <h3 className="font-semibold text-gray-900 mb-4">
                        {editingIndex !== null ? "Edit Bank Account" : "Add New Bank Account"}
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bank Name
                          </label>
                          <input
                            type="text"
                            value={bankForm.bankName}
                            onChange={(e) => handleBankFormChange("bankName", e.target.value)}
                            placeholder="e.g., First Bank of Nigeria"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Account Name
                          </label>
                          <input
                            type="text"
                            value={bankForm.accountName}
                            onChange={(e) => handleBankFormChange("accountName", e.target.value)}
                            placeholder="e.g., John Doe"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Account Number
                          </label>
                          <input
                            type="text"
                            value={bankForm.accountNumber}
                            onChange={(e) => handleBankFormChange("accountNumber", e.target.value)}
                            placeholder="e.g., 1234567890"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div className="flex gap-3 pt-2">
                          <button
                            onClick={handleAddBank}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                          >
                            {editingIndex !== null ? "Update Account" : "Save Account"}
                          </button>
                          <button
                            onClick={handleCancelForm}
                            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bank Accounts List */}
                  {bankAccounts.length === 0 && !isAddingBank ? (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                        <Building2 className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No bank accounts added
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Add your bank account to receive payouts
                      </p>
                      <button
                        onClick={() => setIsAddingBank(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Add Your First Account
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {bankAccounts.map((account, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg">
                              <Building2 className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                {account.bankName}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {account.accountName}
                              </p>
                              <p className="text-sm text-gray-500 font-mono">
                                {account.accountNumber}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditBank(index)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit account"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteBank(index)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete account"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Account Limit Info */}
                  {bankAccounts.length > 0 && (
                    <div className="flex items-center justify-between px-4 py-3 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold text-blue-600">
                          {bankAccounts.length} of 3
                        </span>{" "}
                        accounts added
                      </p>
                      {bankAccounts.length >= 3 && (
                        <span className="text-xs text-gray-600 bg-white px-3 py-1 rounded-full">
                          Maximum reached
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Need help with your settings?
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Check our documentation or contact support for assistance with your account configuration.
              </p>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                View Documentation →
              </button>
            </div>
          </div>
        </div>
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