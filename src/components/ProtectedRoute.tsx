import { useSubscriptionStatus } from "@/utils/subscription";
import * as React from "react";
import { Navigate, useLocation } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
  /** path that renders <LandingPage /> */
  redirectTo?: string;
  /** optional: what to show while loading */
  fallback?: React.ReactNode;
};

export function ProtectedRoute({
  children,
  redirectTo = "/",
  fallback = null,
}: ProtectedRouteProps) {
  const { loading, isAuthenticated, data } = useSubscriptionStatus();
  const location = useLocation();

  if (loading) return <>{fallback}</>;

  // not signed in → send to landing
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  // require active Pro (optionally Enterprise)
  const allowed = data.isActive && data.plan === "pro_plus";

  if (!allowed) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
