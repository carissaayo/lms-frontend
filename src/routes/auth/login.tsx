import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast, Toaster } from "sonner";

import { useLogin } from "@/hooks/use-auth";
import { Role } from "@/types/user.types";
import useAuthStore from "@/store/useAuthStore";
import { BookOpen, Mail, Lock, Settings, Loader2, User } from "lucide-react";

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    login(
      { ...formData },
      {
        onSuccess: (data) => {
          toast.success("Welcome back", { position: "top-center" });

          // Save tokens
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);

          // Save user profile
          localStorage.setItem("user", JSON.stringify(data.profile));
          useAuthStore.getState().loginUser(data.profile);

          setTimeout(() => {
            if (data.profile.role === Role.INSTRUCTOR) {
              navigate({ to: "/instructor/analytics" });
            } else if (data.profile.role === Role.STUDENT) {
              navigate({ to: "/student/analytics" });
            } else {
              navigate({ to: "/" });
            }
          }, 1000);
        },
        onError: () => {
          toast.error("Login failed", {
            description: "There was an error logging in. Please try again.",
            position: "top-center",
          });
        },
      }
    );
  };

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
      <div className="w-full pt-10 pb-6 text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-bold text-4xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-700 transition-all"
        >
          <BookOpen className="w-10 h-10 text-blue-600" />
          DevLearn
        </Link>
      </div>

      {/* Login Card */}
      <div className="flex items-center justify-center px-6 pb-20 flex-grow">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-3 text-center pb-4 pt-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-base text-gray-600">
              Sign in to continue your learning journey
            </CardDescription>
          </CardHeader>

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
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                   className="pl-10 h-12 border-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 text-[var(--color-text)] placeholder:text-gray-400 bg-white/90"
                  />
                </div>
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
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                   className="pl-10 h-12 border-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 text-[var(--color-text)] placeholder:text-gray-400 bg-white/90"
                  />
                </div>
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
