import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  ShoppingBag, 
  Settings, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle,
  ExternalLink,
  Zap,
  DollarSign,
  TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Integrations = () => {
  const [isShopifyConnected, setIsShopifyConnected] = useState(false);
  const [livePricingEnabled, setLivePricingEnabled] = useState(false);
  const [conversionRate, setConversionRate] = useState("18.50");
  const [useFixedRate, setUseFixedRate] = useState(true);
  const [isCardKingdomConnected, setIsCardKingdomConnected] = useState(false);
  const { toast } = useToast();

  const handleShopifyConnect = () => {
    // Mock OAuth flow
    toast({
      title: "Connecting to Shopify...",
      description: "Redirecting to Shopify OAuth",
    });
    
    // Simulate OAuth success after 2 seconds
    setTimeout(() => {
      setIsShopifyConnected(true);
      toast({
        title: "Shopify Connected!",
        description: "Your store has been successfully linked.",
      });
    }, 2000);
  };

  const handleSyncProducts = () => {
    toast({
      title: "Syncing Products...",
      description: "Pulling products from your Shopify store",
    });
  };

  const handlePriceSync = () => {
    toast({
      title: "Updating Prices...",
      description: "Fetching latest prices from TCGPlayer",
    });
  };

  const handleCardKingdomConnect = () => {
    toast({
      title: "Connecting to Card Kingdom...",
      description: "Setting up pricing integration",
    });
    
    setTimeout(() => {
      setIsCardKingdomConnected(true);
      toast({
        title: "Card Kingdom Connected!",
        description: "Pricing integration is now active.",
      });
    }, 2000);
  };

  const handleCardKingdomSync = () => {
    toast({
      title: "Updating Prices...",
      description: "Fetching latest prices from Card Kingdom",
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Integrations</h1>
        <p className="text-muted-foreground">Connect your external services and manage data flow</p>
      </div>

      {/* Shopify Integration */}
      <Card className="p-6 bg-gradient-card border-border/50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-success/10 rounded-lg">
              <ShoppingBag className="h-8 w-8 text-success" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Shopify Store</h3>
              <p className="text-muted-foreground">Sync products and inventory with your Shopify store</p>
            </div>
          </div>
          <Badge variant={isShopifyConnected ? "default" : "secondary"} className="flex items-center gap-2">
            {isShopifyConnected ? (
              <>
                <CheckCircle className="h-3 w-3" />
                Connected
              </>
            ) : (
              <>
                <AlertCircle className="h-3 w-3" />
                Not Connected
              </>
            )}
          </Badge>
        </div>

        {!isShopifyConnected ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Connect your Shopify store to automatically sync products, inventory, and pricing.
            </p>
            <Button onClick={handleShopifyConnect} className="bg-gradient-primary hover:shadow-primary">
              <ExternalLink className="mr-2 h-4 w-4" />
              Connect Shopify Store
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-success">1,247</p>
                <p className="text-sm text-muted-foreground">Products Synced</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-primary">98%</p>
                <p className="text-sm text-muted-foreground">Sync Success Rate</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-warning">23</p>
                <p className="text-sm text-muted-foreground">Pending Updates</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button onClick={handleSyncProducts} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Sync Products
              </Button>
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Configure
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Pricing and Markets Section */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-primary" />
            Pricing and Markets
          </h2>
          <p className="text-muted-foreground">Connect to trading card marketplaces for real-time pricing</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* TCGPlayer Integration */}
          <Card className="p-6 bg-gradient-card border-border/50">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">TCGPlayer</h3>
                  <p className="text-muted-foreground">Market leader for TCG pricing</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="live-pricing">Live Pricing</Label>
                <Switch
                  id="live-pricing"
                  checked={livePricingEnabled}
                  onCheckedChange={setLivePricingEnabled}
                />
              </div>
            </div>

            {livePricingEnabled && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Currency Conversion (USD → ZAR)</h4>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={useFixedRate}
                        onCheckedChange={setUseFixedRate}
                      />
                      <Label>Fixed Rate</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={!useFixedRate}
                        onCheckedChange={(checked) => setUseFixedRate(!checked)}
                      />
                      <Label>Live Exchange Rate</Label>
                    </div>
                  </div>
                  
                  {useFixedRate && (
                    <div className="space-y-2">
                      <Label htmlFor="conversion-rate">Fixed Conversion Rate</Label>
                      <Input
                        id="conversion-rate"
                        type="number"
                        step="0.01"
                        value={conversionRate}
                        onChange={(e) => setConversionRate(e.target.value)}
                        placeholder="18.50"
                      />
                      <p className="text-xs text-muted-foreground">
                        1 USD = {conversionRate} ZAR
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Button onClick={handlePriceSync} className="bg-gradient-primary hover:shadow-primary flex-1">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Sync Prices
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* Card Kingdom Integration */}
          <Card className="p-6 bg-gradient-card border-border/50">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-warning/10 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-warning" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Card Kingdom</h3>
                  <p className="text-muted-foreground">Premium card marketplace</p>
                </div>
              </div>
              <Badge variant={isCardKingdomConnected ? "default" : "secondary"} className="flex items-center gap-2">
                {isCardKingdomConnected ? (
                  <>
                    <CheckCircle className="h-3 w-3" />
                    Connected
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-3 w-3" />
                    Not Connected
                  </>
                )}
              </Badge>
            </div>

            {!isCardKingdomConnected ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Connect to Card Kingdom for premium pricing data and buylist information.
                </p>
                <Button onClick={handleCardKingdomConnect} className="w-full" variant="outline">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Connect Card Kingdom
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="text-lg font-bold text-warning">$2,341</p>
                    <p className="text-xs text-muted-foreground">Buylist Value</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="text-lg font-bold text-success">892</p>
                    <p className="text-xs text-muted-foreground">Items Tracked</p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button onClick={handleCardKingdomSync} className="bg-gradient-primary hover:shadow-primary flex-1">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Sync Prices
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Additional Integrations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-card border-border/50 opacity-60">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-muted/50 rounded-lg">
              <Settings className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-muted-foreground">Payment Processing</h3>
              <p className="text-sm text-muted-foreground">Connect payment gateways</p>
            </div>
          </div>
          <Badge variant="secondary">Coming Soon</Badge>
        </Card>

        <Card className="p-6 bg-gradient-card border-border/50 opacity-60">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-muted/50 rounded-lg">
              <Settings className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-muted-foreground">Accounting Software</h3>
              <p className="text-sm text-muted-foreground">Sync with QuickBooks, Xero</p>
            </div>
          </div>
          <Badge variant="secondary">Coming Soon</Badge>
        </Card>
      </div>
    </div>
  );
};

export default Integrations;