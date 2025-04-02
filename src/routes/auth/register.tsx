import { createFileRoute, Link } from "@tanstack/react-router";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const Route = createFileRoute("/auth/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (formData.password !== formData.confirmPassword) {
  //     toast({
  //       title: "Passwords do not match",
  //       description: "Please make sure your passwords match.",
  //       variant: "destructive",
  //     });
  //     return;
  //   }

  //   setIsLoading(true);

  //   try {
  //     // Replace with your actual API endpoint
  //     const response = await fetch("/api/auth/register", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name: formData.name,
  //         email: formData.email,
  //         password: formData.password,
  //         role: formData.role,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Registration failed");
  //     }

  //     toast({
  //       title: "Registration successful",
  //       description: "Your account has been created successfully.",
  //     });

  //     // Redirect to login page
  //     router.push("/auth/login");
  //   } catch (error) {
  //     toast({
  //       title: "Registration failed",
  //       description:
  //         "There was an error creating your account. Please try again.",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  return (
    <main className="min-h-screen pt-12">
      <div className="w-full text-center">
        <Link to="/" className="font-bold text-3xl">
          DevLearn
        </Link>
      </div>
      <div className="flex  items-center justify-center px-4  py-12 ">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">
              Create an account
            </CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <form
          //    onSubmit={handleSubmit}
          >
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
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
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label>Account Type</Label>
                <RadioGroup
                  value={formData.role}
                  onValueChange={handleRoleChange}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2 ">
                    <RadioGroupItem
                      value="student"
                      id="student"
                      className="cursor-pointer"
                    />
                    <Label htmlFor="student">Student</Label>
                  </div>
                  <div className="flex items-center space-x-2 ">
                    <RadioGroupItem
                      value="instructor"
                      id="instructor"
                      className="cursor-pointer"
                    />
                    <Label htmlFor="instructor">Instructor</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button
                type="submit"
                className="w-2/5 border cursor-pointer mt-4"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
              <div className="mt-4 text-center text-sm text-blue-900">
                Already have an account?{" "}
                <Link to="/auth/login" className="text-primary hover:underline">
                  Log in
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </main>
  );
}
