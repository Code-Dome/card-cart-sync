import { useMemo, useState } from "react";
import { PricingTable } from "@clerk/clerk-react";

type Billing = "monthly" | "annual";

/**
 * OPTIONAL: If you know your total per-plan prices (monthly*12 vs annual),
 * add them here to auto-compute the "Save X%" banner.
 * If you don't have these totals yet, leave the array empty and set FALLBACK_SAVE_PCT instead.
 */
const PLAN_TOTALS = [
  { id: "pro_plus",     monthlyYearTotalMinor: 12 * 150, annualTotalMinor: 1440, currency: "USD" },
] as Array<{
  id: string;
  monthlyYearTotalMinor: number; // e.g. monthly_in_minor_units * 12 (ZAR cents)
  annualTotalMinor: number;      // e.g. annual_price_in_minor_units (ZAR cents)
  currency: string;              // e.g. "ZAR" | "USD"
}>;

// Fallback if PLAN_TOTALS is empty:
const FALLBACK_SAVE_PCT = 20;

function formatMoney(amountMinor: number, currency = "ZAR") {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amountMinor / 100);
  } catch {
    return `${currency} ${(amountMinor / 100).toFixed(0)}`;
  }
}

function computeSavings() {
  if (!PLAN_TOTALS.length) {
    return { pct: FALLBACK_SAVE_PCT, currencySave: "" };
  }
  const totals = PLAN_TOTALS.map((p) => {
    const save = Math.max(0, p.monthlyYearTotalMinor - p.annualTotalMinor);
    const pct =
      p.monthlyYearTotalMinor > 0
        ? Math.round((save / p.monthlyYearTotalMinor) * 100)
        : 0;
    return { save, pct, currency: p.currency };
  });

  const maxPct = totals.reduce((m, t) => Math.max(m, t.pct), 0);
  const grandSave = totals.reduce((s, t) => s + t.save, 0);
  const currency = totals[0]?.currency ?? "ZAR";
  const currencySave = grandSave > 0 ? formatMoney(grandSave, currency) : "";

  return { pct: maxPct, currencySave };
}

export const ClerkPricingTable = () => {
  const [billing, setBilling] = useState<Billing>("monthly");
  const { pct, currencySave } = useMemo(computeSavings, []);

  // Compose banner text only for annual view
  const bannerText =
    billing === "annual" && pct
      ? currencySave
        ? `Save up to ${pct}% annually — ${currencySave} per year`
        : `Save up to ${pct}% with annual billing`
      : "";

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        {/* <h2 className="text-3xl font-bold">Choose Your Plan</h2> */}
        {/* <p className="text-muted-foreground">Start with a 7-day free trial. No credit card required.</p> */}
      </div>

      {/* Segmented billing control (ours) */}
      <div className="flex justify-center px-4">
        <div
          role="tablist"
          aria-label="Billing period"
          className="inline-flex rounded-full border border-border overflow-hidden w-full max-w-xs sm:w-auto"
        >
          <button
            role="tab"
            aria-selected={billing === "monthly"}
            onClick={() => setBilling("monthly")}
            className={[
              "flex-1 sm:flex-initial px-4 py-2 transition text-sm sm:text-base",
              billing === "monthly"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground hover:bg-muted/80",
            ].join(" ")}
          >
            Monthly
          </button>
          <button
            role="tab"
            aria-selected={billing === "annual"}
            onClick={() => setBilling("annual")}
            className={[
              "flex-1 sm:flex-initial px-4 py-2 transition border-l border-border text-sm sm:text-base",
              billing === "annual"
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-foreground hover:bg-muted/80",
            ].join(" ")}
          >
            Annual
          </button>
        </div>
      </div>

      {/* Clerk's native pricing table */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="pricing-light text-center [&_*]:!text-center [&_*]:mx-auto relative">
          {/* Savings banner (shows only for annual) */}
          {bannerText && (
            <div className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#F2C200] text-black px-3 py-1 text-xs font-semibold shadow z-10">
              {bannerText}
            </div>
          )}

          <PricingTable
            /**
             * NOTE: Clerk's PricingTable does not expose a prop to control its internal
             * billing toggle. This wrapper's segmented control is purely visual and for
             * messaging. If Clerk later adds a "billingPeriod" prop or event, wire
             * `billing` into it here.
             */
            ctaPosition="top"
            collapseFeatures={true}
            appearance={{
              variables: {
                // brand colors (HEX for safety inside Clerk)
                colorPrimary: "#F2C200",                  // yellow (CTA/focus)
                colorText: "#0B2B4A",                     // navy
                colorBackground: "#FFFFFF",
                borderRadius: "16px",
                fontSize: "0.95rem",
                fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
              },
              elements: {
                // bright card surface
                card:
                  "rounded-2xl border border-border/60 bg-gradient-to-b from-white to-gray-50 p-4 sm:p-6 shadow-md",

                cardHeader: "mb-3 sm:mb-5",
                planTitle:
                  "text-lg sm:text-xl font-semibold tracking-tight text-[#0B2B4A]",
                priceText: "text-2xl sm:text-4xl font-extrabold text-[#0B2B4A]",

                // plan badge color
                badge: "bg-[#F2C200] text-black px-2 py-0.5 rounded-md text-sm",

                // readable features + green checks
                featureItem:
                  "text-xs sm:text-sm text-[#0B2B4A] flex items-center justify-center gap-2 before:content-['✓'] before:text-[#00A661] before:font-bold before:leading-none",

                // primary CTA
                buttonPrimary:
                  "w-full rounded-xl bg-[#F2C200] text-black font-semibold hover:brightness-95 transition mt-4 shadow text-sm sm:text-base py-3",
              },
            }}
            checkoutProps={{
              appearance: {
                variables: {
                  colorPrimary: "#F2C200",
                  borderRadius: "16px",
                },
                elements: {
                  buttonPrimary:
                    "w-full rounded-xl bg-[#0B2B4A] text-white font-semibold hover:opacity-90 mt-4",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};
