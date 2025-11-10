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

import useAuthStore from "@/store/useAuthStore";
import { useAdminLogin } from "@/hooks/use-auth";
import { BookOpen, Mail, Lock, ArrowLeft, Loader2 } from "lucide-react";

export const Route = createFileRoute("/admin/auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useAdminLogin();

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
          toast.success("Welcome back, Admin", { position: "top-center" });

          // Save tokens
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);

          // Save user profile
          localStorage.setItem("user", JSON.stringify(data.profile));
          useAuthStore.getState().loginUser(data.profile);

          setTimeout(() => {
            navigate({ to: "/admin/analytics" });
          }, 1000);
        },
        onError: () => {
          toast.error("Login failed", {
            description: "Invalid admin credentials. Please try again.",
            position: "top-center",
          });
        },
      }
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Toaster />

      {/* Header */}
      <div className="w-full pt-8 pb-4 text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-bold text-4xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-pink-300 transition-all"
        >
          <BookOpen className="w-10 h-10 text-purple-400" />
          DevLearn
        </Link>
      </div>

      {/* Login Card */}
      <div className="flex items-center justify-center px-4 py-8 w-full">
        <Card className="w-3/5 max-w-md shadow-2xl border border-purple-500/20 bg-slate-800/90 backdrop-blur-sm">
          <CardHeader className="space-y-3 text-center pb-6">
            <CardTitle className="text-3xl font-bold text-white">
              Admin Login
            </CardTitle>
            <CardDescription className="text-base text-gray-300">
              Sign in to access the admin dashboard
            </CardDescription>
          </CardHeader>

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
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@devlearn.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 h-12 bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </div>
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
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 h-12 bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </div>
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
