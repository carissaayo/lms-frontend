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
          toast.success("Welcome back", {
            // description: "Your account has been created successfully.",
            position: "top-center",
          });

          console.log("Login data", data);

          // Save tokens
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);

          // Save user profile
          localStorage.setItem("user", JSON.stringify(data.profile));
          useAuthStore.getState().loginUser(data.profile);

          setTimeout(() => {
            if (data.profile.role === Role.INSTRUCTOR) {
              navigate({ to: "/instructor/courses" });
            } else if (data.profile.role === Role.STUDENT) {
              navigate({ to: "/student/my-courses" });
            } else {
              navigate({ to: "/" }); // fallback
            }
          }, 1000);
        },
        onError: () => {
          toast.error("Login  failed", {
            description: "There was an error logging in. Please try again.",
            position: "top-center",
          });
        },
      }
    );
  };
  return (
    <main className="min-h-screen pt-12">
      <Toaster />
      <div className="w-full text-center">
        <Link to="/" className="font-bold text-3xl">
          DevLearn
        </Link>
      </div>
      <div className="flex items-center justify-center px-4 py-16">
        <Card className="w-full max-w-md pt-4">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300/50"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-gray-300/50"
                />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col mt-8">
              <Button
                type="submit"
                className="w-3/5 border border-gray-600 cursor-pointer py-4 text-base mt-4"
                disabled={isPending}
              >
                {isPending ? "Logging in..." : "Login"}
              </Button>
              <div className="mt-4 text-center text-sm text-blue-900">
                Don&apos;t have an account?{" "}
                <Link
                  to="/auth/register"
                  className="text-primary hover:underline"
                >
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </main>
  );
}
