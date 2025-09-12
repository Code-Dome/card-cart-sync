import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Sidebar } from "./Sidebar";
import { LandingPage } from "../Landing/LandingPage";
import { SubscriptionGate } from "../Subscription/SubscriptionGate";
import { SubscriptionStatus } from "./SubscriptionStatus";
import { useSubscriptionStatus } from "@/utils/subscription";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <SignedOut>
        <LandingPage />
      </SignedOut>
      
      <SignedIn>
        {/* <SubscriptionGate> */}
          <div className="flex">
            <Sidebar />
            <div className="flex-1">
              <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
                <div className="flex items-center justify-between h-16 px-6">
                  <h2 className="text-lg font-semibold">CollectorPOS Dashboard</h2>
                  <div className="flex items-center space-x-4">
                    <SubscriptionStatus />
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </div>
              </header>
              <main className="p-6">
                {children}
              </main>
            </div>
          </div>
        {/* </SubscriptionGate> */}
      </SignedIn>
    </div>
  );
};