import { createFileRoute, Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import heroImg from "../assets/wes-hicks-4-EeTnaC1S4-unsplash.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen flex-col winky-sans-custom ">
      {/* Header Starts */}
      <header className="bg-background border-b h-24 flex items-center px-6 md:px-12">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link to="/" className="flex items-center gap-2 text-3xl font-bold">
            <span className="text-primary">DevLearn</span>
          </Link>
          <nav className="hidden md:flex gap-12 text-base">
            <Link
              to="/"
              className=" font-medium hover:underline underline-offset-4"
            >
              Courses
            </Link>
            <Link
              to="/about"
              className=" font-medium hover:underline underline-offset-4"
            >
              About
            </Link>
            <Link
              to="/"
              className=" font-medium hover:underline underline-offset-4"
            >
              Contact
            </Link>
          </nav>

          <div className="flex gap-4">
            <Link to="/auth/login">
              <Button variant="outline" className="cursor-pointer">
                Log In
              </Button>
            </Link>
            <Link to="/auth/register">
              <Button className="cursor-pointer">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      {/* Header Ends */}

      {/* Hero Starts */}

      <section className="w-full bg-black px-12 md:px-20 flex items-center py-16 lg:h-[87vh] text-white">
        <div className="w-full flex items-center  justify-between  flex-col lg:flex-row gap-24 lg:gap-16 xl:gap-24">
          <div className="w-full flex flex-col gap-4 lg:gap-8 xl:gap-12 text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl">
              Learn at your own pace with DevLearn
            </h1>
            <p className="text-muted-foreground md:text-xl">
              Access high-quality courses from expert instructors. Enhance your
              skills and advance your career with our comprehensive learning
              platform.
            </p>
            <div className="flex items-center justify-center lg:flex-col gap-2 lg:min-[400px]:flex-row">
              <Link to="/">
                <Button size="lg" variant="outline">
                  Browse Courses
                </Button>
              </Link>
              <Link to="/auth/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-black"
                >
                  Register
                </Button>
              </Link>
            </div>
          </div>
          <div className="mx-auto lg:mx-0 relative">
            <img
              src={heroImg}
              alt="Learning platform dashboard"
              className="rounded-lg object-cover shadow-lg lg:max-w-[450px] xl:max-w-[600px] h-[400px]  xl:h-[500px]"
            />
          </div>
        </div>
      </section>
      {/* Hero Starts */}

      {/* FeaturedCourses Starts */}
      <section className="w-full py-16 px-6 sm:px-12 md:px-20 ">
        <div className="w-full">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Featured Courses
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Explore our most popular courses across various categories
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <img
                  src={`/placeholder.svg?height=200&width=400&text=Course+${i}`}
                  alt={`Course ${i}`}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle>Web Development Masterclass</CardTitle>
                  <CardDescription>
                    Learn modern web development techniques
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    This comprehensive course covers HTML, CSS, JavaScript,
                    React, and more.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p className="text-sm font-medium">12 modules</p>
                  <Link to="/">
                    <Button variant="secondary" size="sm">
                      View Course
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Link to="/">
              <Button variant="outline">View All Courses</Button>
            </Link>
          </div>
        </div>
      </section>
      {/* FeaturedCourses Ends */}

      <footer className="border-t py-20 md:pt-20  px-12 bg-black text-white md:min-h-[40vh]   ">
        <div className="container flex  gap-4 px-4 flex-col md:flex-row md:gap-8 md:px-6 ">
          <div className="flex-1 ">
            <div className="text-lg font-semibold">DevLearn</div>
            <div className="text-sm text-muted-foreground mt-1">
              Your gateway to quality education
            </div>
          </div>
          <div className="  flex flex-col gap-2 text-sm">
            <div className="font-medium">Platform</div>
            <Link to="/" className="text-muted-foreground hover:underline">
              Courses
            </Link>
            <Link to="/" className="text-muted-foreground hover:underline">
              Instructors
            </Link>
            <Link to="/" className="text-muted-foreground hover:underline">
              Pricing
            </Link>
          </div>
          <div className=" flex flex-col gap-2 text-sm">
            <div className="font-medium">Support</div>
            <Link to="/" className="text-muted-foreground hover:underline">
              Help Center
            </Link>
            <Link to="/" className="text-muted-foreground hover:underline">
              Terms of Service
            </Link>
            <Link to="/" className="text-muted-foreground hover:underline">
              Privacy Policy
            </Link>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <div className="font-medium">Contact</div>
            <Link to="/" className="text-muted-foreground hover:underline">
              Contact Us
            </Link>
            <div className="text-muted-foreground">support@devlearn.com</div>
          </div>
        </div>
      </footer>
    </main>
  );
}
