import { useAuth } from "@clerk/clerk-react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle } from "lucide-react";

const PRO_PLAN_KEY = "pro_plus";         // ← use your plan *key* from the Dashboard
// const PRO_FEATURE_KEY = "pro";        // ← or gate by a feature instead (recommended)

export const SubscriptionStatus = () => {
  const { isLoaded, isSignedIn, has } = useAuth();

  if (!isLoaded) return null;            // or a skeleton
  if (!isSignedIn) {
    return (
      <Badge variant="secondary">
        <AlertTriangle className="h-3 w-3 mr-1" />
        No Plan
      </Badge>
    );
  }

  const isPro =
    (typeof has === "function" && has({ plan: PRO_PLAN_KEY })) // or: has({ feature: PRO_FEATURE_KEY })
      ? true
      : false;

  return isPro ? (
    <Badge className="bg-success/10 text-success border-success/20">
      <CheckCircle className="h-3 w-3 mr-1" />
      Pro Active
    </Badge>
  ) : (
    <Badge variant="secondary">
      <AlertTriangle className="h-3 w-3 mr-1" />
      No Plan
    </Badge>
  );
};
