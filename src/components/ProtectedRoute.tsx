// src/routes/RequirePro.tsx
import { useSubscriptionStatus } from "@/utils/subscription";
import * as React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";


type RequireProProps = {
    /** where your <LandingPage /> lives */
    redirectTo?: string;
    /** let Enterprise through too (default true) */
    allowEnterprise?: boolean;
    /** what to render while Clerk loads */
    fallback?: React.ReactNode;
};

export function LandingGuard() {
    const { isAuthenticated, data } = useSubscriptionStatus();
    const location = useLocation();

    const isPro = data.isActive && data.plan === "pro_plus";

    return (isAuthenticated && isPro) 
    ? <Navigate to={"/dashboard"} replace state={{ from: location }} /> 
    : (isAuthenticated && !isPro)
    ? <Navigate to={"/pricing"} replace state={{ from: location }} />
    :<></>;
}

export function PricingGuard() {
    const { isAuthenticated, data } = useSubscriptionStatus();
    const location = useLocation();

    const isPro = data.isActive && data.plan === "pro_plus";

    return (isAuthenticated && isPro) 
    ? <Navigate to={"/dashboard"} replace state={{ from: location }} /> 
    : <></>
}

export function RequirePro({
    redirectTo = "/",
    allowEnterprise = true,
    fallback = null,
}: RequireProProps) {
    const { loading, isAuthenticated, data } = useSubscriptionStatus();
    const location = useLocation();

    // 1) Don’t render anything sensitive until Clerk + User are loaded
    if (loading) return <>{fallback}</>;

    // 2) Not signed in → bounce to landing
    if (!isAuthenticated) {
        return <Navigate to={redirectTo} replace state={{ from: location }} />;
    }

    // 3) Require Pro (optionally Enterprise)
    const isPro = data.isActive && data.plan === "pro_plus";
    const isEnt = data.isActive && data.plan === "enterprise";
    const allowed = isPro || (allowEnterprise && isEnt);

    return allowed ? <Outlet /> : <Navigate to={redirectTo} replace state={{ from: location }} />;
}
