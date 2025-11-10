import { createFileRoute, Link, } from "@tanstack/react-router";
import { Mail, Lock, Settings, Loader2, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { InputWithIcon } from "@/components/form/InputWithIcon";
import { AuthCardHeader } from "@/components/auth/AuthHeader";
import { AuthPageHeader } from "@/components/auth/AuthPageHeader";

import { useLoginForm } from "@/hooks/auth/use-login-form";

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
 const { formData, handleChange, handleSubmit, isPending } = useLoginForm();

  return (
    <main
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(135deg, var(--color-primary-light), var(--color-primary), var(--color-secondary-light))",
      }}
    >
      <Toaster />

      {/* Header */}
      <AuthPageHeader fromColor="blue-600" toColor="indigo-600" />
      {/* Login Card */}
      <div className="flex items-center justify-center px-6 pb-20 flex-grow">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <AuthCardHeader
            icon={<User className="w-8 h-8 text-white" />}
            title="Welcome Back"
            description="Sign in to continue your learning journey"
          />

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-5 px-6 pt-2 pb-4">
              {/* Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email Address
                </Label>
                <InputWithIcon
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  icon={<Mail />}
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Password
                  </Label>
                  <Link
                    to="/"
                    className="text-sm text-blue-600 hover:text-blue-700 hover:underline font-medium transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <InputWithIcon
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  icon={<Lock />}
                />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col px-6 pb-8 pt-2">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold h-12 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={isPending}
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin h-5 w-5" />
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>

              <div className="mt-5 text-center">
                <span className="text-sm text-gray-600">
                  Don't have an account?{" "}
                </span>
                <Link
                  to="/auth/register"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                >
                  Create Account
                </Link>
              </div>

              {/* Admin Login Link */}
              <div className="mt-5 pt-4 border-t border-gray-200">
                <Link
                  to="/admin/auth/login"
                  className="text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center gap-2 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Admin Login
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </main>
  );
}
