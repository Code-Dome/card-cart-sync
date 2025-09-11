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
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Integrations = () => {
  const [isShopifyConnected, setIsShopifyConnected] = useState(false);
  const [livePricingEnabled, setLivePricingEnabled] = useState(false);
  const [conversionRate, setConversionRate] = useState("18.50");
  const [useFixedRate, setUseFixedRate] = useState(true);
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

      {/* TCGPlayer Pricing */}
      <Card className="p-6 bg-gradient-card border-border/50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">TCGPlayer Pricing</h3>
              <p className="text-muted-foreground">Automatically sync market prices for your TCG products</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <div className="space-y-4">
                <h4 className="font-semibold">Sync Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Auto-sync frequency</Label>
                    <select className="bg-input border border-border rounded px-3 py-1 text-sm">
                      <option>Every hour</option>
                      <option>Every 4 hours</option>
                      <option>Daily</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Price change threshold</Label>
                    <Input className="w-20" type="number" placeholder="5" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button onClick={handlePriceSync} className="bg-gradient-primary hover:shadow-primary">
                <RefreshCw className="mr-2 h-4 w-4" />
                Sync Prices Now
              </Button>
              <Button variant="outline">
                View Price History
              </Button>
            </div>
          </div>
        )}
      </Card>

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