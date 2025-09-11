import { useUser } from "@clerk/clerk-react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { getSubscriptionData, getPlanDisplayName, isOnTrial, getTrialDaysRemaining } from "@/utils/subscription";

export const SubscriptionStatus = () => {
  const { user } = useUser();
  
  const subscriptionData = getSubscriptionData(user);
  const userIsOnTrial = isOnTrial(user);
  const trialDaysLeft = getTrialDaysRemaining(user);

  if (!subscriptionData) {
    return (
      <Badge variant="secondary">
        <AlertTriangle className="h-3 w-3 mr-1" />
        No Plan
      </Badge>
    );
  }

  if (userIsOnTrial) {
    return (
      <Badge className="bg-warning/10 text-warning border-warning/20">
        <Clock className="h-3 w-3 mr-1" />
        Trial ({trialDaysLeft}d left)
      </Badge>
    );
  }

  if (subscriptionData.status === 'active') {
    return (
      <Badge className="bg-success/10 text-success border-success/20">
        <CheckCircle className="h-3 w-3 mr-1" />
        {getPlanDisplayName(subscriptionData.plan)} Active
      </Badge>
    );
  }

  return (
    <Badge variant="destructive">
      <AlertTriangle className="h-3 w-3 mr-1" />
      {subscriptionData.status}
    </Badge>
  );
};