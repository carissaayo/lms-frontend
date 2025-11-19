import { createFileRoute, Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import {  Toaster } from "sonner";

import {
  Mail,
  Phone,
  Lock,
  CheckCircle2,
  ArrowLeft,
  Loader2,
  User,
} from "lucide-react";
import { AuthPageHeader } from "@/components/auth/AuthPageHeader";
import { AuthCardHeader } from "@/components/auth/AuthHeader";
import { InputWithIcon } from "@/components/form/InputWithIcon";
import { useAdminRegisterForm } from "@/hooks/auth/use-admin-register-form";

export const Route = createFileRoute("/admin/auth/register")({
  component: RouteComponent,
});

function RouteComponent() {
  
  const { formData, handleChange, handleSubmit, isPending } =
    useAdminRegisterForm();
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-y-auto w-full">
      <Toaster />

      <AuthPageHeader fromColor="purple-400" toColor="pink-400 " />

      {/* Register Card */}
      <div className="flex items-center justify-center px-4 py-4  w-full">
        <Card className="w-3/5 shadow-2xl border border-purple-500/20 bg-slate-800/90 backdrop-blur-sm">
          <AuthCardHeader
            icon={<User className="w-8 h-8 text-white" />}
            title="Admin Login"
            description=" Sign in to access the admin dashboard"
            fromColor="purple-500"
            toColor="pink-500"
            dark={true}
          />

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 px-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="firstName" className="text-sm text-gray-200">
                    First Name
                  </Label>
                  <InputWithIcon
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="John"
                    required
                    icon={<User className="w-5 h-5" />}
                    value={formData.firstName}
                    onChange={handleChange}
                    className="h-11 bg-slate-700/70 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="lastName" className="text-sm text-gray-200">
                    Last Name
                  </Label>
                  <InputWithIcon
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    required
                    icon={<User className="w-5 h-5" />}
                    value={formData.lastName}
                    onChange={handleChange}
                    className="h-11 bg-slate-700/70 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm text-gray-200">
                  Email Address
                </Label>
                <InputWithIcon
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@devlearn.com"
                  required
                  icon={<Mail className="w-5 h-5" />}
                  value={formData.email}
                  onChange={handleChange}
                  className="h-11 bg-slate-700/70 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                />
              </div>

              {/* Phone */}
              <div className="space-y-3">
                <Label htmlFor="phoneNumber" className="text-sm text-gray-200">
                  Phone Number
                </Label>
                <InputWithIcon
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  placeholder="Your phone number"
                  required
                  icon={<Phone className="w-5 h-5" />}
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="h-11 bg-slate-700/70 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                />
              </div>

              {/* Passwords side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <Label htmlFor="password" className="text-sm text-gray-200">
                    Password
                  </Label>
                  <InputWithIcon
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a strong password"
                    required
                    icon={<Lock className="w-5 h-5" />}
                    value={formData.password}
                    onChange={handleChange}
                    className="h-11 bg-slate-700/70 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  />
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm text-gray-200"
                  >
                    Confirm Password
                  </Label>
                  <InputWithIcon
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    required
                    icon={<CheckCircle2 className="w-5 h-5" />}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="h-11 bg-slate-700/70 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col px-6 pb-4 pt-2">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold h-12 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                disabled={isPending}
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin h-5 w-5" />
                    Creating Account...
                  </span>
                ) : (
                  "Request Admin Access"
                )}
              </Button>

              <div className="mt-6 text-center">
                <span className="text-sm text-gray-300">
                  Already have admin access?{" "}
                </span>
                <Link
                  to="/admin/auth/login"
                  className="text-sm font-semibold text-purple-400 hover:text-purple-300 hover:underline"
                >
                  Sign In
                </Link>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-700">
                <Link
                  to="/auth/login"
                  className="text-sm text-gray-400 hover:text-gray-300 flex items-center justify-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to User Login
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </main>
  );
}
