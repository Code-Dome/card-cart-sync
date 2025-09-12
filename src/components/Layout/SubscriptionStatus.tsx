import { useAuth } from "@clerk/clerk-react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle } from "lucide-react";

export const SubscriptionStatus = () => {
  const { has } = useAuth();
  
  // Check if user has the pro plan using Clerk's has() method
  const hasProPlan = has && has({ plan: "cplan_32VagVMOJP8AcLUo7JN2tWzkdR9" });

  if (hasProPlan) {
    return (
      <Badge className="bg-success/10 text-success border-success/20">
        <CheckCircle className="h-3 w-3 mr-1" />
        Pro Active
      </Badge>
    );
  }

  return (
    <Badge variant="secondary">
      <AlertTriangle className="h-3 w-3 mr-1" />
      No Plan
    </Badge>
  );
};