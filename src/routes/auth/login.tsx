/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { toast } from "sonner";

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   try {
  //     // Replace with your actual API endpoint
  //     const response = await fetch("/api/auth/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Login failed");
  //     }

  //     const data = await response.json();

  //     // Store the token in localStorage or use a state management solution
  //     localStorage.setItem("token", data.token);
  //     localStorage.setItem("user", JSON.stringify(data.user));

  //     toast({
  //       title: "Login successful",
  //       description: "You have been logged in successfully.",
  //     });

  //     // Redirect based on user role
  //     if (data.user.role === "instructor") {
  //       router.push("/dashboard/instructor");
  //     } else if (data.user.role === "student") {
  //       router.push("/dashboard/student");
  //     } else if (data.user.role === "moderator") {
  //       router.push("/dashboard/moderator");
  //     } else {
  //       router.push("/dashboard");
  //     }
  //   } catch (error) {
  //     toast({
  //       title: "Login failed",
  //       description: "Please check your credentials and try again.",
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
      <div className="flex h-[90%] items-center justify-center px-4 py-12 pt-24 ">
        <Card className="w-full max-w-md ">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <form
          //  onSubmit={handleSubmit}
          >
            <CardContent className="space-y-4">
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
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button
                type="submit"
                className=" w-2/5 border cursor-pointer mt-4"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
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
