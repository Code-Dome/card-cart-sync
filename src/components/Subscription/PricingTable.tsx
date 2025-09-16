import {useEffect, useMemo, useState} from "react";
import { PricingTable } from "@clerk/clerk-react";

type Billing = "monthly" | "annual";

type Options = {
  /** CSS selector for the pricing table container (recommended). Defaults to document.body */
  rootSelector?: string;
  /** If true, data-checked=true => "annual". Flip to false if your table maps the other way. */
  annualWhenChecked?: boolean;
};

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

function useClerkPricingToggle(
    setBilling: (v: Billing) => void,
    opts?: Options
) {
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const root =
        (opts?.rootSelector
            ? document.querySelector<HTMLElement>(opts.rootSelector)
            : document.body) ?? document.body;

    const annualWhenChecked = opts?.annualWhenChecked ?? true;

    let el: HTMLElement | null = null;
    let attrObserver: MutationObserver | null = null;

    const map = (checked: boolean): Billing =>
        annualWhenChecked ? (checked ? "annual" : "monthly") : (checked ? "monthly" : "annual");

    const readAndSet = (node: HTMLElement) => {
      const val = node.getAttribute("data-checked") === "true";
      setBilling(map(val));
    };

    const attach = (node: HTMLElement) => {
      el = node;
      // initial sync
      readAndSet(node);

      // watch the attribute flip
      attrObserver?.disconnect();
      attrObserver = new MutationObserver((muts) => {
        for (const m of muts) {
          if (m.type === "attributes" && m.attributeName === "data-checked") {
            readAndSet(node);
          }
        }
      });
      attrObserver.observe(node, { attributes: true, attributeFilter: ["data-checked"] });
    };

    const findSwitch = () =>
        root.querySelector<HTMLElement>(".cl-switchIndicator[data-checked]");

    // try immediately
    const foundNow = findSwitch();
    if (foundNow) attach(foundNow);

    // watch DOM for (re)mounts / rerenders
    const domObserver = new MutationObserver(() => {
      const node = findSwitch();
      if (node && node !== el) attach(node);
      // if it got removed, wait for next one
      if (!node) {
        attrObserver?.disconnect();
        el = null;
      }
    });
    domObserver.observe(root, { subtree: true, childList: true, attributes: true });

    // click safety net (lets Clerk update, then we read)
    const onClick = (e: Event) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
          ".cl-switchIndicator[data-checked]"
      );
      if (target) {
        queueMicrotask(() => readAndSet(target));
      }
    };
    root.addEventListener("click", onClick, true);

    return () => {
      attrObserver?.disconnect();
      domObserver.disconnect();
      root.removeEventListener("click", onClick, true);
    };
  }, [setBilling, opts?.rootSelector, opts?.annualWhenChecked]);
}

export const ClerkPricingTable = () => {
  const [billing, setBilling] = useState<Billing>("monthly");

  // Compose banner text only for annual view
  const bannerText =
    billing === "annual" && `Save 20% annually — $360 per year`


  useClerkPricingToggle(setBilling, {
    rootSelector: "#pricing-table", // <- change to your table's container
    annualWhenChecked: true,        // set to false if the mapping is reversed
  });

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
                type="button"
                aria-selected={billing === "monthly"}
                tabIndex={billing === "monthly" ? 0 : -1}
                className={[
                  "flex-1 sm:flex-initial px-4 py-2 transition text-sm sm:text-base cursor-default",
                  billing === "monthly"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground hover:bg-muted/80",
                ].join(" ")}
            >
              Monthly
            </button>
            <button
                role="tab"
                type="button"
                aria-selected={billing === "annual"}
                tabIndex={billing === "annual" ? 0 : -1}
                className={[
                  "flex-1 sm:flex-initial px-4 py-2 transition border-l border-border text-sm sm:text-base  cursor-default",
                  billing === "annual"
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-foreground hover:bg-muted/80",
                ].join(" ")}
            >
              Annually
            </button>
          </div>
        </div>

        {/* Clerk's native pricing table */}
        <div className="max-w-4xl mx-auto px-4">
          <div className="pricing-light text-center [&_*]:!text-center [&_*]:mx-auto relative">
            {/* Savings banner (shows only for annual) */}
            {bannerText && (
                <div
                    className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#F2C200] text-black px-3 py-1 text-xs font-semibold shadow z-10">
                  {bannerText}
                </div>
            )}

            <PricingTable
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
