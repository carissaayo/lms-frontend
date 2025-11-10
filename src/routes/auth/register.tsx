import { createFileRoute, Link } from "@tanstack/react-router";
import {
  User,
  Phone,
  Mail,
  Lock,
  CheckCircle2,
  GraduationCap,
  Monitor,
  Loader2,
  Settings,
} from "lucide-react";
import {  Toaster } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AuthPageHeader } from "@/components/auth/AuthPageHeader";
import { AuthCardHeader } from "@/components/auth/AuthHeader";
import { InputWithIcon } from "@/components/form/InputWithIcon";
import { useRegisterForm } from "@/hooks/auth/use-register-form";
import { Role } from "@/types/user.types";

export const Route = createFileRoute("/auth/register")({
  component: RouteComponent,
});

function RouteComponent() {
 const { formData, handleChange, handleRoleChange, handleSubmit, isPending } =
   useRegisterForm();


  return (
    <main
      className="min-h-screen "
      style={{
        background:
          "linear-gradient(135deg, var(--color-primary-light), var(--color-primary), var(--color-secondary-light))",
      }}
    >
      <Toaster />

      {/* Header */}
      <AuthPageHeader fromColor="blue-600" toColor="indigo-600" />

      {/* Register Card */}
      <div className="flex items-center justify-center px-4 py-8 pb-16">
        <Card className="w-full max-w-3xl shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <AuthCardHeader
            icon={<User className="w-8 h-8 text-white" strokeWidth={2.5} />}
            title="Create Your Account"
            description="Join DevLearn and start your learning journey today"
          />

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-5 px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <InputWithIcon
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    icon={<User />}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <InputWithIcon
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    icon={<User />}
                  />
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <InputWithIcon
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    placeholder="+234 801 234 5678"
                    required
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    icon={<Phone />}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
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
              </div>

              {/* Password & Confirm Password */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <InputWithIcon
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a strong password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    icon={<Lock />}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <InputWithIcon
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    icon={<CheckCircle2 />}
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div className="space-y-3 pt-2">
                <Label>Choose Your Account Type</Label>
                <RadioGroup
                  value={formData.role}
                  onValueChange={handleRoleChange}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {/* Student */}
                  <div className="relative">
                    <RadioGroupItem
                      value={Role.STUDENT}
                      id="student"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="student"
                      className="flex items-center gap-3 rounded-xl border-2 border-gray-200 bg-white p-4 cursor-pointer transition-all hover:border-blue-300 hover:shadow-md peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 peer-data-[state=checked]:shadow-lg"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">
                          Student
                        </div>
                        <div className="text-sm text-gray-500">
                          Learn and grow with courses
                        </div>
                      </div>
                    </Label>
                  </div>

                  {/* Instructor */}
                  <div className="relative">
                    <RadioGroupItem
                      value={Role.INSTRUCTOR}
                      id="instructor"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="instructor"
                      className="flex items-center gap-3 rounded-xl border-2 border-gray-200 bg-white p-4 cursor-pointer transition-all hover:border-blue-300 hover:shadow-md peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 peer-data-[state=checked]:shadow-lg"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <Monitor className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">
                          Instructor
                        </div>
                        <div className="text-sm text-gray-500">
                          Teach and share your knowledge
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col px-6 pb-6 pt-2">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold h-12 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={isPending}
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin w-5 h-5" />
                    Creating Account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </Button>

              <div className="mt-6 text-center">
                <span className="text-sm text-gray-600">
                  Already have an account?{" "}
                </span>
                <Link
                  to="/auth/login"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                >
                  Sign In
                </Link>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Link
                  to="/admin/auth/register"
                  className="text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Admin Register
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </main>
  );
}
