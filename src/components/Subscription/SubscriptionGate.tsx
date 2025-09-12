import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

interface SubscriptionGateProps {
  children: React.ReactNode;
}

export const SubscriptionGate = ({ children }: SubscriptionGateProps) => {
  const { has } = useAuth();

  // Check if user has an active subscription using Clerk's has() method
  const userHasActiveSubscription = has && has({ plan: "cplan_32VagVMOJP8AcLUo7JN2tWzkdR9" });

  if (!userHasActiveSubscription) {
    return <Navigate to="/pricing" replace />;
  }

  return <>{children}</>;
};