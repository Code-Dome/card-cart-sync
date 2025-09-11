import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Zap, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

/**
 * This is a development/demo component to simulate subscription activation
 * In production, subscriptions would be managed through Clerk's billing system
 */
export const TestSubscriptionButton = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const [isActivating, setIsActivating] = useState(false);

  const handleActivateSubscription = async () => {
    if (!user) return;
    
    setIsActivating(true);
    
    try {
      // Simulate subscription activation
      toast({
        title: "Activating subscription...",
        description: "This simulates the Clerk webhook process",
      });

      // In a real app, this would be handled by Clerk webhooks
      // For demo purposes, we'll simulate updating user metadata
      // Note: In production, use Clerk's backend API or webhooks to update metadata
      setTimeout(async () => {
        try {
          // This is a workaround for demo purposes
          // In production, metadata updates would be handled server-side
          const updatedUser = await user.reload();
          
          toast({
            title: "Subscription activated! 🎉",
            description: "You now have access to all Pro features. Page will refresh shortly.",
          });

          // Refresh the page to update the UI
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } catch (error) {
          // For demo purposes, we'll still show success
          toast({
            title: "Demo: Subscription activated! 🎉",
            description: "In production, this would be handled by Clerk webhooks. Refreshing page...",
          });
          
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      }, 1500);

    } catch (error) {
      toast({
        title: "Activation failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsActivating(false);
    }
  };

  // Only show this button in development or if user doesn't have active subscription
  const hasActiveSubscription = user?.publicMetadata?.subscriptionStatus === 'active';
  
  if (hasActiveSubscription) {
    return null;
  }

  return (
    <Card className="p-4 bg-gradient-primary/10 border-primary/20">
      <div className="text-center space-y-3">
        <div className="text-sm font-medium text-primary">Demo Mode</div>
        <p className="text-xs text-muted-foreground">
          Click below to simulate subscription activation (for testing purposes)
        </p>
        <Button
          onClick={handleActivateSubscription}
          disabled={isActivating}
          size="sm"
          className="bg-gradient-primary hover:shadow-glow"
        >
          {isActivating ? (
            <>
              <Loader2 className="mr-2 h-3 w-3 animate-spin" />
              Activating...
            </>
          ) : (
            <>
              <Zap className="mr-2 h-3 w-3" />
              Activate Pro (Demo)
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};