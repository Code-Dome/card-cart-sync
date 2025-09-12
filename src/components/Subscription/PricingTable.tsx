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
        <div className="pricing-light text-center [&_*]:!text-center [&_*]:mx-auto">
          <PricingTable
            ctaPosition="top"
            collapseFeatures={false}
            appearance={{
              cssLayerName: "components",
              variables: {
                // 🔶 Use raw HEX so the widget can’t misinterpret HSL vars
                colorPrimary: "#F2C200",            // brand yellow (CTA/focus)
                colorText: "#0B2B4A",             // brand navy
                colorBackground: "#FFFFFF",
                borderRadius: "16px",
                fontSize: "0.95rem",
                fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
                shadow: "0 12px 40px rgba(11,43,74,.12)", // navy-tinted shadow
              },
              // Keys must match the widget’s safe classes
              elements: {
                // bright card
                card:
                  "rounded-2xl border border-border/60 bg-gradient-to-b from-white to-gray-50 p-6 shadow-md",

                cardHeader: "mb-5",
                planTitle: "text-xl font-semibold tracking-tight text-[#0B2B4A]",
                priceText: "text-4xl font-extrabold text-[#0B2B4A]",

                // Yellow badge to match CTA
                badge: "bg-[#F2C200] text-black px-2 py-0.5 rounded-md",

                // ✅ readable features + green checks
                featureItem:
                  "text-sm text-[#0B2B4A] flex items-center justify-center gap-2 before:content-['✓'] before:text-[#00A661] before:font-bold before:leading-none",

                // Solid yellow CTA (no blue fallback)
                buttonPrimary:
                  "w-full rounded-xl bg-[#F2C200] text-black font-semibold hover:brightness-95 transition mt-4 shadow",
              },
            }}
            checkoutProps={{
              appearance: {
                variables: {
                  colorPrimary: "#F2C200",
                  borderRadius: "16px",
                  shadow: "0 12px 30px rgba(11,43,74,.18)",
                },
                elements: {
                  buttonPrimary:
                    "w-full rounded-xl bg-[#0B2B4A] text-white font-semibold hover:opacity-90 mt-4", // navy confirm button
                },
              },
            }}
          />
        </div>
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