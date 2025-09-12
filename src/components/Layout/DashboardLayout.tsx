import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { Sidebar } from "./Sidebar";
import { LandingPage } from "../Landing/LandingPage";
import { SubscriptionStatus } from "./SubscriptionStatus";
import { Footer } from "../Footer";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user } = useUser()

  return (
    <div className="min-h-screen bg-background">
      <SignedOut>
        <LandingPage />
      </SignedOut>
      
      <SignedIn>
          <div className="flex">
            <Sidebar />
            <div className="flex-1">
              <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
                <div className="flex items-center justify-between h-16 px-6">
                  <h2 className="text-lg font-semibold">Welcome, {user.firstName || user.emailAddresses[0].emailAddress }</h2>
                  <div className="flex items-center space-x-4">
                    <SubscriptionStatus />
                    <UserButton afterSignOutUrl="/landing" />
                  </div>
                </div>
              </header>
              <main className="p-6">
                {children}
              </main>
            </div>
          </div>
        <Footer />
      </SignedIn>
    </div>
  );
};