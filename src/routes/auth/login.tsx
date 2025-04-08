import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
import api from "@/lib/axios";
import useAuthStore from "@/store/useAuthStore";

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { loginUser, user } = useAuthStore((state) => state);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post(
        "/login",
        JSON.stringify({
          email: formData.email,
          password: formData.password,
        })
      );

      console.log(response?.data);

      if (response.status === 401) {
        toast.error("Incorrect credentials", {
          description: "Please try again",
          position: "top-center",
        });
        throw new Error("Incorrect credentials");
      }

      const data = await response.data;

      // Store the token in localStorage or use a state management solution

      loginUser(data.user, data.token);
      toast.success("Login successful", {
        description: "You have been logged in successfully.",
        position: "top-center",
      });

      // Redirect based on user role
      if (data.user.role === "instructor") {
        router.navigate({ to: "/dashboard/instructors/instructor" });
      } else if (data.user.role === "student") {
        router.navigate({ to: "/dashboard/students/student" });
      } else if (data.user.role === "moderator") {
        router.navigate({ to: "/dashboard/students/student" });
      } else {
        router.navigate({ to: "/dashboard/students/student" });
      }
      setTimeout(() => {
        const lastRoute =
          localStorage.getItem("lastRoute") || "/dashboard/students/student";
        localStorage.removeItem("lastRoute");
        router.navigate({ to: lastRoute });
      }, 1500);
    } catch (error) {
      toast.error("Login failed", {
        description: "Please check your credentials and try again.",
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      const lastRoute =
        localStorage.getItem("lastRoute") || "/dashboard/students/student";
      localStorage.removeItem("lastRoute");
      router.navigate({ to: lastRoute });
    }
  }, [user, router]);
  return (
    <main className="min-h-screen pt-12">
      <div className="flex items-center justify-center w-full">
        <Toaster position="top-center" />
      </div>

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
          <form onSubmit={handleSubmit}>
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
