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
            // optional: ensure Clerk’s CSS plays nicely with Tailwind layers
            cssLayerName: 'components', // adjust if you use a custom @layer setup
            // global theming knobs:
            variables: {
              colorPrimary: 'hsl(var(--primary))',
              colorText: 'hsl(var(--foreground))',
              colorBackground: 'transparent',
              borderRadius: '1rem',
              fontSize: '1rem',
              fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
              shadow: '0 10px 25px rgba(0,0,0,.25)',
            },
          }}
          checkoutProps={{
            // style the checkout drawer too
            appearance: {
              variables: {
                colorPrimary: 'hsl(var(--primary))',
                borderRadius: '1rem',
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