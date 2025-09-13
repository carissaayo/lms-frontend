import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardShell } from "@/components/dashboard-shell";
import { EmptyState } from "@/components/empty-state";
import { toast } from "sonner";
import useAuthStore from "@/store/useAuthStore";
import api from "@/lib/axios";

export const Route = createFileRoute("/student/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuthStore((state) => state);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const initialPath = useRef(router.state.location.pathname);

  return (
    <DashboardShell>
      <main className="h-full ">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Student Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track your progress, manage assignments, and continue learning
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Assignments</h2>
        </div>
      </main>
    </DashboardShell>
  );
}
