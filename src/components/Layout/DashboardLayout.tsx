import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Sidebar } from "./Sidebar";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <SignedOut>
        <div className="min-h-screen flex items-center justify-center bg-gradient-primary">
          <div className="text-center space-y-6 p-8 rounded-lg bg-card/90 backdrop-blur-sm shadow-glow border border-border">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                CollectorPOS
              </h1>
              <p className="text-muted-foreground">
                Professional POS system for TCG and collectibles shops
              </p>
            </div>
            <SignInButton>
              <Button size="lg" className="bg-gradient-primary hover:shadow-primary">
                Sign In to Continue
              </Button>
            </SignInButton>
          </div>
        </div>
      </SignedOut>
      
      <SignedIn>
        <div className="flex">
          <Sidebar />
          <div className="flex-1">
            <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
              <div className="flex items-center justify-between h-16 px-6">
                <h2 className="text-lg font-semibold">CollectorPOS Dashboard</h2>
                <UserButton afterSignOutUrl="/" />
              </div>
            </header>
            <main className="p-6">
              {children}
            </main>
          </div>
        </div>
      </SignedIn>
    </div>
  );
};