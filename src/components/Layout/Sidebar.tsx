import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Settings, 
  Users, 
  BarChart3,
  Link as LinkIcon,
  CreditCard
} from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { useSubscriptionStatus } from "@/utils/subscription";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard, requiresPlan: true },
  { name: "Products", href: "/products", icon: Package, requiresPlan: true },
  { name: "Sales", href: "/sales", icon: ShoppingCart, requiresPlan: true },
  { name: "Customers", href: "/customers", icon: Users, requiresPlan: true },
  { name: "Analytics", href: "/analytics", icon: BarChart3, requiresPlan: true },
  { name: "Integrations", href: "/integrations", icon: LinkIcon, requiresPlan: true },
  { name: "Pricing", href: "/pricing", icon: CreditCard, requiresPlan: false },
  { name: "Settings", href: "/settings", icon: Settings, requiresPlan: false },
];

export const Sidebar = () => {
  const location = useLocation();
  const { data } = useSubscriptionStatus()

  return (
    <div className="w-64 h-screen bg-card border-r border-border sticky top-0">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg"></div>
          <span className="text-xl font-bold">CardShop POS</span>
        </div>
      </div>
      
      <nav className="px-4 space-y-2">
        {navigation.map((item) => {
          if (data.plan !== "pro_plus" && item.requiresPlan) return;

          return (
          <Link key={item.name} to={item.href}>
            <Button
              variant={location.pathname === item.href ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                location.pathname === item.href && "bg-primary/10 text-primary"
              )}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </Button>
          </Link>
        )
        })}
      </nav>
    </div>
  );
};