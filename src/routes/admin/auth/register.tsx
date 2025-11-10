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
import { useAdminRegister } from "@/hooks/use-auth";
import {
  BookOpen,
  Mail,
  Phone,
  Lock,
  CheckCircle2,
  ArrowLeft,
  Loader2,
} from "lucide-react";

export const Route = createFileRoute("/admin/auth/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { mutate: register, isPending } = useAdminRegister();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    role: "admin",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match", {
        description: "Please make sure your passwords match.",
        position: "top-center",
      });
      return;
    }

    register(
      { ...formData },
      {
        onSuccess: (data) => {
          toast.success("Admin account created", {
            description: "Your account is pending approval.",
            position: "top-center",
          });
          console.log("Admin registration data", data);

          setTimeout(() => {
            navigate({ to: "/admin/auth/login" });
          }, 1500);
        },
        onError: () => {
          toast.error("Registration failed", {
            description:
              "There was an error creating your account. Please try again.",
            position: "top-center",
          });
        },
      }
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-y-auto w-full">
      <Toaster />

      {/* Header */}
      <div className="w-full pt-6  pb-4 text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-bold text-4xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-pink-300 transition-all"
        >
          <BookOpen className="w-10 h-10 text-purple-400" />
          DevLearn
        </Link>
      </div>

      {/* Register Card */}
      <div className="flex items-center justify-center px-4 py-4  w-full">
        <Card className="w-3/5 shadow-2xl border border-purple-500/20 bg-slate-800/90 backdrop-blur-sm">
          <CardHeader className="space-y-3 text-center pb-4 pt-2">
            <CardTitle className="text-3xl font-bold text-white">
              Admin Registration
            </CardTitle>
            <CardDescription className="text-base text-gray-300">
              Complete your registration
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 px-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="firstName" className="text-sm text-gray-200">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="John"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="h-11 bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-500"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="lastName" className="text-sm text-gray-200">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="h-11 bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm text-gray-200">
                  Email Address
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
                    className="pl-10 h-11 bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-3">
                <Label htmlFor="phoneNumber" className="text-sm text-gray-200">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    placeholder="Your phone number"
                    required
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="pl-10 h-11 bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Passwords side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <Label htmlFor="password" className="text-sm text-gray-200">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Create a strong password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-10 h-11 bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm text-gray-200"
                  >
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <CheckCircle2 className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="pl-10 h-11 bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-500"
                    />
                  </div>
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
