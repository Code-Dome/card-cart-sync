import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { Sidebar } from "./Sidebar";
import { LandingPage } from "../Landing/LandingPage";
import { SubscriptionStatus } from "./SubscriptionStatus";
import { Footer } from "../Footer";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user } = useUser()
  const isMobile = useIsMobile()

  return (
    <div className="min-h-screen bg-background">
      <SignedOut>
        <LandingPage />
      </SignedOut>
      
      <SignedIn>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
              <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
                <div className="flex items-center justify-between h-16 px-4 md:px-6">
                  <h2 className={`font-semibold ${isMobile ? 'text-base ml-12' : 'text-lg'}`}>
                    Welcome, {user?.firstName || user?.emailAddresses[0]?.emailAddress }
                  </h2>
                  <div className="flex items-center space-x-4">
                    <SubscriptionStatus />
                    <UserButton afterSignOutUrl="/landing" />
                  </div>
                </div>
              </header>
              <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
                {children}
              </main>
            </div>
          </div>
        <Footer />
      </SignedIn>
    </div>
  );
};