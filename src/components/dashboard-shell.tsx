import type { ReactNode } from "react";
import Sidebar from "./shell/Sidebar";
import TopNav from "./shell/TopNav";
interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {

  return (
    <div className="w-full h-screen flex flex-col font-primary text-text overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        {/* Enhanced Sidebar with gradient background */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Enhanced Header with subtle gradient */}
          <header className="sticky top-0 z-10 border-b border-gray-200 py-2 px-6 sm:px-12 md:px-6 lg:px-12 bg-white/80 backdrop-blur-md text-text shadow-sm">
            <div className="flex h-16 items-center justify-between gap-20 w-full">
              <div className="flex items-center gap-4 justify-between flex-[1.5]">
                <h1 className="text-primary-dark text-3xl font-heading font-semibold">
                  Dashboard
                </h1>
              </div>

              {/* Top Right Icons with enhanced styling */}
              <TopNav />
            </div>
          </header>

          <section className="px-6 sm:px-12 md:px-6 lg:px-12 pt-12 overflow-auto flex-1 bg-background">
            {children}
          </section>
        </main>
      </div>
    </div>
  );
}
