import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, CreditCard, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BILLING_PLAN_ID = "cplan_32VagVMOJP8AcLUo7JN2tWzkdR9";

export const BillingSetup = () => {
  const { user } = useUser();
  const { toast } = useToast();

  const handleSubscribe = async () => {
    try {
      // Mock billing setup - in real implementation, this would integrate with Clerk's billing
      toast({
        title: "Setting up billing...",
        description: "Redirecting to payment setup",
      });

      // Simulate billing setup
      setTimeout(() => {
        toast({
          title: "Billing setup complete!",
          description: "Your subscription is now active.",
        });
      }, 2000);
    } catch (error) {
      toast({
        title: "Billing setup failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6 bg-gradient-card border-border/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <CreditCard className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">CollectorPOS Pro</h3>
            <p className="text-muted-foreground">Advanced POS features with integrations</p>
          </div>
        </div>
        <Badge className="bg-gradient-primary">
          <Zap className="h-3 w-3 mr-1" />
          Professional
        </Badge>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center space-x-3">
          <CheckCircle className="h-5 w-5 text-success" />
          <span>Unlimited products and transactions</span>
        </div>
        <div className="flex items-center space-x-3">
          <CheckCircle className="h-5 w-5 text-success" />
          <span>Shopify integration with real-time sync</span>
        </div>
        <div className="flex items-center space-x-3">
          <CheckCircle className="h-5 w-5 text-success" />
          <span>TCGPlayer live pricing integration</span>
        </div>
        <div className="flex items-center space-x-3">
          <CheckCircle className="h-5 w-5 text-success" />
          <span>Advanced analytics and reporting</span>
        </div>
        <div className="flex items-center space-x-3">
          <CheckCircle className="h-5 w-5 text-success" />
          <span>Priority customer support</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <span className="text-3xl font-bold">$49</span>
          <span className="text-muted-foreground">/month</span>
        </div>
        <Button onClick={handleSubscribe} className="bg-gradient-primary hover:shadow-primary">
          <CreditCard className="mr-2 h-4 w-4" />
          Subscribe Now
        </Button>
      </div>

      {user && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Billing Plan ID: {BILLING_PLAN_ID}
          </p>
        </div>
      )}
    </Card>
  );
};