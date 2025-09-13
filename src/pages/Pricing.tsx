import { Badge } from "@/components/ui/badge";
import { ClerkPricingTable } from "@/components/Subscription/PricingTable";

const Pricing = () => {
  return (
    <div className="space-y-6 md:space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4 px-4">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Badge variant="outline" className="text-xs sm:text-sm">
            Professional POS Solution for Hobbyist stores
          </Badge>
        </div>
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
          Unlock the Full Power of 
          <span className="bg-gradient-primary bg-clip-text text-transparent"> CardShop POS</span>
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Get instant access to professional POS features, Shopify integration, and live TCGPlayer pricing
        </p>
      </div>

      {/* Pricing Table */}
      <ClerkPricingTable />

      {/* Trust Indicators */}
      <div className="text-center space-y-4 pt-8 px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-primary">99.9%</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-primary">10,000+</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Products</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-primary">24/7</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Support</div>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Sign up today and join TCG store owners who already use CardShop POS
        </p>
      </div>
    </div>
  );
};

export default Pricing;