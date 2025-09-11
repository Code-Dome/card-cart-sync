import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  CreditCard, 
  Zap, 
  Star,
  ArrowRight,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 29,
    interval: "month",
    description: "Perfect for small TCG shops",
    features: [
      "Up to 500 products",
      "Basic POS functionality",
      "Email support",
      "Mobile app access"
    ],
    popular: false,
    clerkPlanId: null // Free tier or basic plan
  },
  {
    id: "pro",
    name: "Professional",
    price: 49,
    interval: "month", 
    description: "Complete solution for growing stores",
    features: [
      "Unlimited products",
      "Shopify integration",
      "TCGPlayer live pricing",
      "Advanced analytics",
      "Priority support",
      "Multi-location support"
    ],
    popular: true,
    clerkPlanId: "cplan_32VagVMOJP8AcLUo7JN2tWzkdR9"
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 99,
    interval: "month",
    description: "For large chains and franchises",
    features: [
      "Everything in Professional",
      "Custom integrations",
      "Dedicated account manager",
      "White-label options",
      "Advanced reporting",
      "API access"
    ],
    popular: false,
    clerkPlanId: "cplan_enterprise_example" // Replace with actual enterprise plan ID
  }
];

export const PricingTable = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSubscribe = async (planId: string, clerkPlanId: string | null) => {
    if (!clerkPlanId) {
      toast({
        title: "Contact Sales",
        description: "Please contact our sales team for this plan.",
      });
      return;
    }

    setLoadingPlan(planId);
    
    try {
      // In a real implementation, you would:
      // 1. Call Clerk's subscription API or redirect to Clerk's hosted pricing page
      // 2. Update user metadata with subscription status
      
      // Mock subscription process
      toast({
        title: "Redirecting to payment...",
        description: "You'll be redirected to complete your subscription.",
      });

      // Simulate redirect to Clerk's billing
      setTimeout(() => {
        toast({
          title: "Subscription activated!",
          description: "Welcome to CollectorPOS Pro! Refreshing your dashboard...",
        });
        
        // In real implementation, this would update user metadata
        // and the page would refresh or redirect
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }, 2000);

    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Choose Your Plan</h2>
        <p className="text-muted-foreground">Start with a 14-day free trial. No credit card required.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative p-8 ${
              plan.popular 
                ? 'bg-gradient-card border-primary/50 shadow-primary/20 shadow-lg' 
                : 'bg-gradient-card border-border/50'
            }`}
          >
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-primary">
                <Star className="h-3 w-3 mr-1" />
                Most Popular
              </Badge>
            )}

            <div className="space-y-6">
              {/* Plan Header */}
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
                <div className="space-y-1">
                  <div className="flex items-baseline justify-center space-x-1">
                    <span className="text-4xl font-bold">R{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.interval}</span>
                  </div>
                  {plan.id === 'pro' && (
                    <p className="text-xs text-muted-foreground">~$49 USD</p>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button
                onClick={() => handleSubscribe(plan.id, plan.clerkPlanId)}
                disabled={loadingPlan === plan.id}
                className={`w-full ${
                  plan.popular 
                    ? 'bg-gradient-primary hover:shadow-glow' 
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
                size="lg"
              >
                {loadingPlan === plan.id ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    {plan.id === 'starter' ? 'Start Free Trial' : 'Subscribe Now'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              {plan.id === 'pro' && (
                <p className="text-xs text-center text-muted-foreground">
                  14-day free trial • Cancel anytime
                </p>
              )}
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center space-y-4">
        <p className="text-sm text-muted-foreground">
          All plans include SSL security, data backups, and mobile access
        </p>
        <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
          <span>✓ 99.9% Uptime SLA</span>
          <span>✓ GDPR Compliant</span>
          <span>✓ 24/7 Support</span>
        </div>
      </div>
    </div>
  );
};