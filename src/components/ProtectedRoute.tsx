import { useSubscriptionStatus } from "@/utils/subscription";
import * as React from "react";
import { Navigate, useLocation } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
  /** path that renders <LandingPage /> */
  redirectTo?: string;
  /** allow Enterprise to pass too? defaults true */
  allowEnterprise?: boolean;
  /** optional: what to show while loading */
  fallback?: React.ReactNode;
};

export function ProtectedRoute({
  children,
  redirectTo = "/",
  allowEnterprise = true,
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
  const isPro = data.isActive && data.plan === "pro";
  const isEnterprise = data.isActive && data.plan === "enterprise";
  const allowed = isPro || (allowEnterprise && isEnterprise);

  if (!allowed) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
