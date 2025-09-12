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
          ctaPosition="top"
          collapseFeatures={false}
          appearance={{
            baseTheme: [dark],
            cssLayerName: "components", // your Tailwind layer
            variables: {
              colorPrimary: "hsl(var(--primary))",
              colorText: "hsl(var(--foreground))",
              colorBackground: "transparent",
              borderRadius: "1rem",
              fontSize: "0.95rem",
              fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
              shadow: "0 12px 40px rgba(0,0,0,.35)",
            },
            // NOTE: keys must match the component’s **safe classes** w/o the `cl-` prefix.
            // Inspect in DevTools and adjust these names if they differ in your build.
            elements: {
              card: "rounded-2xl border border-border/50 bg-gradient-to-b from-background/60 to-background/20 backdrop-blur p-6",
              cardHeader: "mb-5",
              planTitle: "text-xl font-semibold tracking-tight",
              priceText: "text-4xl font-extrabold",
              badge: "bg-primary text-primary-foreground px-2 py-0.5 rounded-md",
              featureItem: "text-sm text-muted-foreground",
              buttonPrimary:
                "w-full rounded-xl bg-gradient-to-r from-primary to-primary/70 text-primary-foreground hover:opacity-90 transition",
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
                  "w-full rounded-xl bg-primary text-primary-foreground hover:opacity-90",
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