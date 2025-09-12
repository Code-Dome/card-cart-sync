import { Badge } from "@/components/ui/badge";
import { ClerkPricingTable } from "@/components/Subscription/PricingTable";

const Pricing = () => {
  return (
    <div className="space-y-8">
      {/* <div>
        <h1 className="text-3xl font-bold">Pricing</h1>
        <p className="text-muted-foreground">Choose the perfect plan for your store</p>
      </div> */}

      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Badge variant="outline" className="text-sm">
            Professional POS Solution for Hobbyist stores
          </Badge>
        </div>
        
        <h2 className="text-4xl font-bold">
          Unlock the Full Power of 
          <span className="bg-gradient-primary bg-clip-text text-transparent"> CardShop POS</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Get instant access to professional POS features, Shopify integration, and live TCGPlayer pricing
        </p>
      </div>

      {/* <Card className="p-8 bg-gradient-card border-border/50">
        <h3 className="text-xl font-semibold mb-6 text-center">What you'll get with CollectorPOS Pro:</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
              <span>Unlimited products and transactions</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
              <span>Shopify store integration with real-time sync</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
              <span>TCGPlayer live pricing with USD-ZAR conversion</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
              <span>Advanced inventory management</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
              <span>Customer relationship management</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
              <span>Comprehensive analytics and reporting</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
              <span>Multi-device access (mobile ready)</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
              <span>Priority support and updates</span>
            </div>
          </div>
        </div>
      </Card> */}

      {/* Pricing Table */}
      <ClerkPricingTable />

      {/* Trust Indicators */}
      <div className="text-center space-y-4 pt-8">
        <div className="flex items-center justify-center space-x-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">99.9%</div>
            <div className="text-sm text-muted-foreground">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">1000+</div>
            <div className="text-sm text-muted-foreground">Products</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">24/7</div>
            <div className="text-sm text-muted-foreground">Support</div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Sign up today and join TCG store owners who already use CardShop POS
        </p>
      </div>
    </div>
  );
};

export default Pricing;