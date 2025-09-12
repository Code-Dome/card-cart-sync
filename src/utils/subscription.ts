// src/lib/useSubscription.ts
import { useAuth, useUser } from "@clerk/clerk-react";
import type { UserResource } from "@clerk/types";

export type SubscriptionStatus = "active" | "trial" | "cancelled" | "expired" | "inactive";

export interface SubscriptionData {
  status: SubscriptionStatus;
  plan: string;
  planId?: string;
  trialEndsAt?: string;
  currentPeriodEnd?: string;
  cancelAtPeriodEnd?: boolean;
  trialDaysRemaining?: number;
  isActive: boolean;
  /** where we derived the status from */
  source: "clerk-billing" | "metadata" | "none";
}

/**
 * Configure your gating keys here.
 * Use **plan/feature keys**, not the cplan_... ID.
 * Prefer features; plans can change membership without code changes.
 */
const FEATURE_KEYS = {
  super_admin: "super_admin",
} as const;

const PLAN_KEYS = {
  pro: "pro_plus",
} as const;

/** Your metadata field names if you manage subs yourself */
const MD = {
  status: "subscriptionStatus",
  plan: "subscriptionPlan",
  planId: "subscriptionPlanId",
  trialEndsAt: "trialEndsAt",
  currentPeriodEnd: "currentPeriodEnd",
  cancelAtPeriodEnd: "cancelAtPeriodEnd",
} as const;

function daysRemaining(iso?: string): number {
  if (!iso) return 0;
  const end = new Date(iso).getTime();
  const now = Date.now();
  const diffDays = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}

function readFromMetadata(user: UserResource | null | undefined): SubscriptionData | null {
  if (!user?.publicMetadata) return null;
  const md = user.publicMetadata as Record<string, unknown>;
  const status = (md[MD.status] as SubscriptionStatus) ?? "inactive";
  const plan = (md[MD.plan] as SubscriptionPlan) ?? "starter";
  const trialEndsAt = md[MD.trialEndsAt] as string | undefined;
  const currentPeriodEnd = md[MD.currentPeriodEnd] as string | undefined;
  const cancelAtPeriodEnd = md[MD.cancelAtPeriodEnd] as boolean | undefined;
  const planId = md[MD.planId] as string | undefined;

  return {
    status,
    plan,
    planId,
    trialEndsAt,
    currentPeriodEnd,
    cancelAtPeriodEnd,
    trialDaysRemaining: daysRemaining(trialEndsAt),
    isActive: status === "active" || status === "trial",
    source: "metadata",
  };
}

/**
 * useSubscriptionStatus()
 * - loading: whether Clerk is ready
 * - isAuthenticated: user signed in
 * - hasSubscription: active or trial (from Clerk Billing or metadata)
 * - data: normalized subscription payload
 */
export function useSubscriptionStatus() {
  const { isLoaded: authLoaded, isSignedIn, has } = useAuth();
  const { isLoaded: userLoaded, user } = useUser();

  const loading = !authLoaded || !userLoaded;

  let data: SubscriptionData = {
    status: "inactive",
    plan: "starter",
    isActive: false,
    source: "none",
  };

  // Prefer Clerk Billing (features/plans) when available
  if (!loading && isSignedIn && typeof has === "function") {
    const hasSuperAdminFeature = has({ feature: FEATURE_KEYS.super_admin });
    const hasProPlan = has({ plan: PLAN_KEYS.pro });

    const isPro = Boolean(hasProPlan);

    if (isPro) {
      data = {
        status: "active",
        plan: PLAN_KEYS.pro,
        isActive: true,
        source: "clerk-billing",
      };
    }
  }

  // Fallback to your metadata (legacy/manual mode)
  if (!loading && !data.isActive) {
    const md = readFromMetadata(user);
    if (md) data = md;
  }

  // Add trial info if present in metadata (even when billing says active)
  const trialEndsAt =
    (user?.publicMetadata?.[MD.trialEndsAt] as string | undefined) ?? data.trialEndsAt;
  if (trialEndsAt) {
    data = { ...data, trialEndsAt, trialDaysRemaining: daysRemaining(trialEndsAt) };
  }

  return {
    loading,
    isAuthenticated: Boolean(isSignedIn),
    hasSubscription: data.isActive,
    data,
  };
}
