import React from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Calendar, 
  DollarSign, 
  Settings, 
  CheckCircle,
  AlertTriangle,
  ExternalLink
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const SubscriptionManager = () => {
  const { has } = useAuth();
  const { user } = useUser();
  const { toast } = useToast();

  // Check if user has the pro plan using Clerk's has() method
  const hasProPlan = has && has({ plan: "cplan_32VagVMOJP8AcLUo7JN2tWzkdR9" });

  // Mock data for display
  const displayData = {
    amount: 49,
    currency: 'USD',
    nextBilling: '2024-02-15',
    cancelAtPeriodEnd: false
  };

  const handleManageBilling = () => {
    toast({
      title: "Redirecting to billing portal...",
      description: "You'll be taken to manage your subscription.",
    });
    
    // In a real implementation, this would open Clerk's billing portal
    // or redirect to a Clerk-managed billing page
  };

  const handleCancelSubscription = () => {
    toast({
      title: "Cancellation requested",
      description: "Your subscription will be cancelled at the end of the billing period.",
      variant: "destructive",
    });
  };

  const handleUpgradePlan = () => {
    toast({
      title: "Upgrade available",
      description: "Contact sales for enterprise features.",
    });
  };

  const getStatusBadge = () => {
    if (hasProPlan) {
      return <Badge className="bg-success/10 text-success"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>;
    }
    return <Badge variant="secondary">No Active Plan</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold mb-2">Subscription Management</h3>
        <p className="text-muted-foreground">Manage your CardShop POS subscription and billing</p>
      </div>

      {/* Current Plan */}
      <Card className="p-6 bg-gradient-card border-border/50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <CreditCard className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h4 className="text-xl font-semibold">CardShop POS {hasProPlan ? 'Professional' : 'Free'}</h4>
              <p className="text-muted-foreground">Your current subscription plan</p>
            </div>
          </div>
          {getStatusBadge()}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <DollarSign className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold">${displayData.amount}</div>
            <div className="text-sm text-muted-foreground">per month</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-sm font-medium">Next Billing</div>
            <div className="text-sm text-muted-foreground">{displayData.nextBilling}</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <Settings className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-sm font-medium">Auto-Renewal</div>
            <div className="text-sm text-muted-foreground">
              {displayData.cancelAtPeriodEnd ? 'Disabled' : 'Enabled'}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={handleManageBilling} className="bg-gradient-primary hover:shadow-primary">
            <CreditCard className="mr-2 h-4 w-4" />
            Manage Billing
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={handleUpgradePlan}>
            Upgrade Plan
          </Button>
          <Button variant="outline" onClick={handleCancelSubscription} className="text-destructive hover:text-destructive">
            Cancel Subscription
          </Button>
        </div>
      </Card>

      {/* Plan Features */}
      <Card className="p-6 bg-gradient-card border-border/50">
        <h4 className="text-lg font-semibold mb-4">Your Plan Includes</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-sm">Unlimited products and transactions</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-sm">Shopify store integration</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-sm">TCGPlayer live pricing</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-sm">Advanced analytics</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-sm">Priority support</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-sm">Mobile app access</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Billing History */}
      <Card className="p-6 bg-gradient-card border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold">Recent Billing History</h4>
          <Button variant="outline" size="sm" onClick={handleManageBilling}>
            View All
            <ExternalLink className="ml-2 h-3 w-3" />
          </Button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-border/50">
            <div>
              <div className="font-medium">CardShop POS Professional</div>
              <div className="text-sm text-muted-foreground">Jan 15, 2024</div>
            </div>
            <div className="text-right">
              <div className="font-medium">$49.00</div>
              <Badge className="bg-success/10 text-success text-xs">Paid</Badge>
            </div>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-border/50">
            <div>
              <div className="font-medium">CardShop POS Professional</div>
              <div className="text-sm text-muted-foreground">Dec 15, 2023</div>
            </div>
            <div className="text-right">
              <div className="font-medium">$49.00</div>
              <Badge className="bg-success/10 text-success text-xs">Paid</Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};