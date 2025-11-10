import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Lock, ArrowLeft, Loader2, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {  Toaster } from "sonner";
import { AuthPageHeader } from "@/components/auth/AuthPageHeader";
import { AuthCardHeader } from "@/components/auth/AuthHeader";
import { InputWithIcon } from "@/components/form/InputWithIcon";

import { useAdminLoginForm } from "@/hooks/auth/use-admin-login-form";

export const Route = createFileRoute("/admin/auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
 
const { formData, handleChange, handleSubmit, isPending } = useAdminLoginForm();
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Toaster />

      {/* Header */}
      <AuthPageHeader fromColor="purple-400" toColor="pink-400 " />

      {/* Login Card */}
      <div className="flex items-center justify-center px-4 py-8 w-full">
        <Card className="w-3/5 max-w-md shadow-2xl border border-purple-500/20 bg-slate-800/90 backdrop-blur-sm">
          <AuthCardHeader
            icon={<User className="w-8 h-8 text-white" />}
            title="Admin Login"
            description=" Sign in to access the admin dashboard"
            fromColor="purple-500"
            toColor="pink-500"
            dark
          />

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-5 px-6">
              {/* Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-200"
                >
                  Admin Email
                </Label>
                <InputWithIcon
                dark
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@devlearn.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  icon={<Mail className="w-5 h-5 text-gray-400" />}
                  className="h-12 pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 
                   focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>

              {/* Password */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-200"
                  >
                    Password
                  </Label>
                  <Link
                    to="/"
                    className="text-sm text-purple-400 hover:text-purple-300 hover:underline font-medium transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <InputWithIcon
                dark 
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  icon={<Lock className="w-5 h-5 text-gray-400" />}
                  className="h-12 pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 
                   focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col px-6 pb-6 pt-2">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold h-12 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={isPending}
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin w-5 h-5" />
                    Signing in...
                  </span>
                ) : (
                  "Sign In as Admin"
                )}
              </Button>

              <div className="mt-6 text-center">
                <span className="text-sm text-gray-300">
                  Need admin access?{" "}
                </span>
                <Link
                  to="/admin/auth/register"
                  className="text-sm font-semibold text-purple-400 hover:text-purple-300 hover:underline transition-colors"
                >
                  Request Account
                </Link>
              </div>

              {/* Regular Login Link */}
              <div className="mt-4 pt-4 border-t border-slate-700">
                <Link
                  to="/auth/login"
                  className="text-sm text-gray-400 hover:text-gray-300 flex items-center justify-center gap-1 transition-colors"
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
