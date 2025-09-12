import { useAuth } from "@clerk/clerk-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Lock } from "lucide-react";
import { ClerkPricingTable } from "./PricingTable";
import { TestSubscriptionButton } from "./TestSubscriptionButton";

interface SubscriptionGateProps {
  children: React.ReactNode;
}

export const SubscriptionGate = ({ children }: SubscriptionGateProps) => {
  const { has } = useAuth();

  // Check if user has an active subscription using Clerk's has() method
  const userHasActiveSubscription = has && has({ plan: "cplan_32VagVMOJP8AcLUo7JN2tWzkdR9" });

  if (!userHasActiveSubscription) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl animate-glow"></div>
              <span className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                CollectorPOS
              </span>
            </div>
            
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Lock className="h-5 w-5 text-muted-foreground" />
              <Badge variant="outline" className="text-sm">
                Subscription Required
              </Badge>
            </div>
            
            <h1 className="text-4xl font-bold">
              Unlock the Full Power of 
              <span className="bg-gradient-primary bg-clip-text text-transparent"> CollectorPOS</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get instant access to professional POS features, Shopify integration, and live TCGPlayer pricing
            </p>
          </div>

          {/* Feature Benefits */}
          <Card className="p-8 bg-gradient-card border-border/50">
            <h3 className="text-xl font-semibold mb-6 text-center">What you'll get with CollectorPOS Pro:</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                  <span>Unlimited products and transactions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                  <span>Shopify store integration with real-time sync</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                  <span>TCGPlayer live pricing with USD-ZAR conversion</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                  <span>Advanced inventory management</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                  <span>Customer relationship management</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                  <span>Comprehensive analytics and reporting</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                  <span>Multi-device access (mobile ready)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                  <span>Priority support and updates</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Pricing Table */}
          <ClerkPricingTable />

          {/* Demo Activation Button */}
          <TestSubscriptionButton />

          {/* Trust Indicators */}
          <div className="text-center space-y-4 pt-8">
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Happy Stores</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Join hundreds of TCG store owners already using CollectorPOS
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};