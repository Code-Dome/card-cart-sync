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
          appearance={{
            elements: {
              pricingTable: "rounded-lg shadow-lg",
              pricingTableCard: "bg-gradient-card border-border/50 rounded-lg p-6",
              pricingTableHeader: "text-center mb-6",
              pricingTableTitle: "text-xl font-semibold mb-2",
              pricingTableDescription: "text-foreground mb-4",
              pricingTablePrice: "text-4xl font-bold mb-2",
              pricingTableFeatureList: "space-y-3 mb-6",
              pricingTableFeatureItem: "flex items-center space-x-3 text-sm",
              pricingTableButton: "w-full bg-gradient-primary hover:shadow-glow",
              pricingTablePopularBadge: "bg-gradient-primary"
            }
          }}
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