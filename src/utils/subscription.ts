import type { UserResource } from "@clerk/types";

export interface SubscriptionData {
  status: 'active' | 'trial' | 'cancelled' | 'expired' | 'inactive';
  plan: 'starter' | 'pro' | 'enterprise';
  planId?: string;
  trialEndsAt?: string;
  currentPeriodEnd?: string;
  cancelAtPeriodEnd?: boolean;
}

/**
 * Check if a user has an active subscription
 */
export const hasActiveSubscription = (user: UserResource | null | undefined): boolean => {
  if (!user?.publicMetadata) return false;
  
  const subscriptionStatus = user.publicMetadata.subscriptionStatus as string;
  return subscriptionStatus === 'active' || subscriptionStatus === 'trial';
};

/**
 * Get subscription data from user metadata
 */
export const getSubscriptionData = (user: UserResource | null | undefined): SubscriptionData | null => {
  if (!user?.publicMetadata) return null;
  
  return {
    status: (user.publicMetadata.subscriptionStatus as SubscriptionData['status']) || 'inactive',
    plan: (user.publicMetadata.subscriptionPlan as SubscriptionData['plan']) || 'starter',
    planId: user.publicMetadata.subscriptionPlanId as string,
    trialEndsAt: user.publicMetadata.trialEndsAt as string,
    currentPeriodEnd: user.publicMetadata.currentPeriodEnd as string,
    cancelAtPeriodEnd: user.publicMetadata.cancelAtPeriodEnd as boolean,
  };
};

/**
 * Check if user is on trial
 */
export const isOnTrial = (user: UserResource | null | undefined): boolean => {
  if (!user?.publicMetadata) return false;
  return user.publicMetadata.subscriptionStatus === 'trial';
};

/**
 * Get trial days remaining
 */
export const getTrialDaysRemaining = (user: UserResource | null | undefined): number => {
  if (!user?.publicMetadata?.trialEndsAt) return 0;
  
  const trialEnd = new Date(user.publicMetadata.trialEndsAt as string);
  const now = new Date();
  const diffTime = trialEnd.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return Math.max(0, diffDays);
};

/**
 * Get plan display name
 */
export const getPlanDisplayName = (plan: string): string => {
  switch (plan) {
    case 'starter':
      return 'Starter';
    case 'pro':
      return 'Professional';
    case 'enterprise':
      return 'Enterprise';
    default:
      return 'Unknown';
  }
};

/**
 * Mock function to simulate subscription activation
 * In a real app, this would be handled by Clerk webhooks
 */
export const mockActivateSubscription = async (userId: string, planId: string) => {
  // In a real implementation, this would:
  // 1. Create a subscription in Clerk
  // 2. Update user metadata via Clerk's API
  // 3. Handle webhooks for subscription events
  
  console.log(`Mock: Activating subscription for user ${userId} with plan ${planId}`);
  
  // For demo purposes, we'll simulate the metadata update
  return {
    subscriptionStatus: 'active',
    subscriptionPlan: 'pro',
    subscriptionPlanId: planId,
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    cancelAtPeriodEnd: false
  };
};