import { SignInButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingBag, 
  Zap, 
  BarChart3, 
  Shield, 
  Smartphone,
  ArrowRight,
  CheckCircle,
  Users,
  TrendingUp,
  RefreshCw
} from "lucide-react";
import heroBackground from "@/assets/hero-bg.jpg";
import dashboardPreview from "@/assets/dashboard-preview.jpg";
import { Footer } from "../Footer";

const features = [
  {
    icon: ShoppingBag,
    title: "Shopify Integration",
    description: "Seamlessly sync your products, inventory, and orders with your existing Shopify store"
  },
  {
    icon: Zap,
    title: "Live Pricing",
    description: "Real-time TCGPlayer price updates with automatic currency conversion"
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Comprehensive reporting and insights to grow your business"
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security with 99.9% uptime guarantee"
  },
  {
    icon: Smartphone,
    title: "Mobile Ready",
    description: "Access your POS system from any device, anywhere"
  },
  {
    icon: Users,
    title: "Customer Management",
    description: "Build lasting relationships with integrated CRM features"
  }
];

const stats = [
  { value: "10,000+", label: "Products Managed" },
  // { value: "500+", label: "Happy Stores" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" }
];

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="relative z-50 bg-background/80 backdrop-blur-md border-b border-border/50 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl animate-glow"></div>
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                CardShop POS
              </span>
            </div>
            <SignInButton>
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </SignInButton>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/80" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  <Zap className="h-3 w-3 mr-1" />
                  Now with TCGPlayer Integration
                </Badge>
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  The Ultimate 
                  <span className="bg-gradient-primary bg-clip-text text-transparent"> POS</span>
                  <br />
                  for Hobbyist Stores
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                  Streamline your trading card game shop with our professional POS system. 
                  Sync with Shopify, get live pricing from TCGPlayer, and manage your inventory like never before.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <SignInButton>
                  <Button size="lg" className="bg-gradient-primary hover:shadow-glow text-lg px-8 py-6">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </SignInButton>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-slide-up">
              <div className="relative">
                <img
                  src={dashboardPreview}
                  alt="CardShop POS Dashboard"
                  className="rounded-2xl shadow-2xl border border-border/50"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent/20 rounded-2xl" />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-primary rounded-full opacity-20 animate-glow" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-accent rounded-full opacity-15 animate-glow" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="mb-4">
              Features
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold">
              Everything you need to 
              <span className="bg-gradient-primary bg-clip-text text-transparent"> succeed</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built specifically for TCG and collectibles retailers, with integrations that matter
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="p-8 bg-gradient-card border-border/50 hover:shadow-primary/20 hover:shadow-lg transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="space-y-4">
                  <div className="p-3 bg-primary/10 rounded-lg w-fit">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Showcase */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline">
                  Integrations
                </Badge>
                <h2 className="text-4xl font-bold leading-tight">
                  Connect with platforms 
                  <span className="bg-gradient-primary bg-clip-text text-transparent"> you already use</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Seamlessly integrate with Shopify and TCGPlayer to create a unified ecosystem for your business.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Shopify Store Sync</h4>
                    <p className="text-muted-foreground">Automatic product and inventory synchronization</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Live Market Pricing</h4>
                    <p className="text-muted-foreground">Real-time pricing from TCGPlayer with currency conversion</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Automated Updates</h4>
                    <p className="text-muted-foreground">Set and forget - prices update automatically</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6 bg-gradient-card border-border/50 hover:shadow-lg transition-all">
                <div className="space-y-4">
                  <ShoppingBag className="h-12 w-12 text-success" />
                  <div>
                    <h4 className="font-semibold">Shopify</h4>
                    <p className="text-sm text-muted-foreground">E-Commerce sync</p>
                  </div>
                  <Badge className="bg-success/10 text-success">Live</Badge>
                </div>
              </Card>
              <Card className="p-6 bg-gradient-card border-border/50 hover:shadow-lg transition-all">
                <div className="space-y-4">
                  <TrendingUp className="h-12 w-12 text-primary" />
                  <div>
                    <h4 className="font-semibold">TCGPlayer</h4>
                    <p className="text-sm text-muted-foreground">Live pricing</p>
                  </div>
                   <Badge className="bg-success/10 text-success">Live</Badge>
                  {/* <Badge className="bg-primary/10 text-primary">Live</Badge> */}
                </div>
              </Card>
              <Card className="p-6 bg-gradient-card border-border/50 opacity-60">
                <div className="space-y-4">
                  <RefreshCw className="h-12 w-12 text-muted-foreground" />
                  <div>
                    <h4 className="font-semibold">Wordpress</h4>
                    <p className="text-sm text-muted-foreground">E-Commerce Sync</p>
                  </div>
                  <Badge variant="secondary">Coming Soon</Badge>
                </div>
              </Card>
              <Card className="p-6 bg-gradient-card border-border/50 opacity-60">
                <div className="space-y-4">
                  <RefreshCw className="h-12 w-12 text-muted-foreground" />
                  <div>
                    <h4 className="font-semibold">Wix</h4>
                    <p className="text-sm text-muted-foreground">E-Commerce Sync</p>
                  </div>
                  <Badge variant="secondary">Coming Soon</Badge>
                </div>
              </Card>
              <Card className="p-6 bg-gradient-card border-border/50 opacity-60">
                <div className="space-y-4">
                  <BarChart3 className="h-12 w-12 text-muted-foreground" />
                  <div>
                    <h4 className="font-semibold">XE.com</h4>
                    <p className="text-sm text-muted-foreground">Currency Conversions</p>
                  </div>
                  <Badge variant="secondary">Coming Soon</Badge>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-primary/5">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold">
              Ready to transform your 
              <span className="bg-gradient-primary bg-clip-text text-transparent"> TCG business?</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Join other store owners and modernized your operations with CardShop POS
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SignInButton>
                <Button size="lg" className="bg-gradient-primary hover:shadow-glow text-lg px-12 py-6">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </SignInButton>
              <Button size="lg" variant="outline" className="text-lg px-12 py-6">
                Contact Sales
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};