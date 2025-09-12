import { PricingTable } from "@clerk/clerk-react";

export const ClerkPricingTable = () => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Choose Your Plan</h2>
        {/* <p className="text-muted-foreground">Start with a 7-day free trial. No credit card required.</p> */}
      </div>

      {/* Clerk's native pricing table */}
      <div className="max-w-4xl mx-auto">
        <PricingTable
          // appearance={{
          //   elements: {
          //     // replace these with *your* inspected keys
          //     buttonPrimary: "w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90",
          //     badge: "bg-indigo-600 text-white",
          //     card: "rounded-2xl border border-border/50 p-6 backdrop-blur bg-primary",
          //     priceText: "text-4xl font-bold",
          //     featureItem: "text-sm",
          //   }
          // }}
        />
      </div>

      {/* <div className="text-center space-y-4">
        <p className="text-sm text-foreground">
          All plans include SSL security, data backups, and mobile access
        </p>
        <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
          <span>✓ 99.9% Uptime SLA</span>
          <span>✓ GDPR Compliant</span>
          <span>✓ 24/7 Support</span>
        </div>
      </div> */}
    </div>
  );
};