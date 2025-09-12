import { PricingTable } from "@clerk/clerk-react";

export const ClerkPricingTable = () => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        {/* <h2 className="text-3xl font-bold">Choose Your Plan</h2> */}
        {/* <p className="text-muted-foreground">Start with a 7-day free trial. No credit card required.</p> */}
      </div>

      {/* Clerk's native pricing table */}
      <div className="max-w-4xl mx-auto">
        <PricingTable
          ctaPosition="top"
          collapseFeatures={true}
          appearance={{
            cssLayerName: "components",
            variables: {
              colorPrimary: "hsl(var(--primary))",
              colorText: "hsl(var(--foreground))",
              colorBackground: "transparent",
              borderRadius: "1rem",
              fontSize: "0.95rem",
              fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
              shadow: "0 12px 40px rgba(0,0,0,.35)",
            },
            elements: {
              card:
                "rounded-2xl border border-border/40 bg-gradient-to-b from-background/80 to-background/50 backdrop-blur-md p-6 text-center shadow-primary",
              cardHeader: "mb-5",
              planTitle: "text-xl font-semibold tracking-tight text-foreground",
              priceText: "text-4xl font-extrabold text-primary",
              badge:
                "bg-accent text-accent-foreground px-2 py-0.5 rounded-md mx-auto",
              /* ✅ readable features w/ green check */
              featureItem:
                "text-sm text-foreground flex items-center justify-center gap-2 before:content-['✓'] before:text-[hsl(var(--success))] before:font-bold before:leading-none",
              buttonPrimary:
                "w-full rounded-xl bg-gradient-to-r from-accent to-accent/80 text-accent-foreground font-semibold hover:opacity-90 transition mt-4 shadow-glow",
            },
          }}
          checkoutProps={{
            appearance: {
              variables: {
                colorPrimary: "hsl(var(--primary))",
                borderRadius: "1rem",
                shadow: "0 20px 50px rgba(0,0,0,.45)",
              },
              elements: {
                buttonPrimary:
                  "w-full rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 mt-4",
              },
            },
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