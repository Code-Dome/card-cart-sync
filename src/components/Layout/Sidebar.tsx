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
  CreditCard,
  Menu,
  X
} from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { useSubscriptionStatus } from "@/utils/subscription";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard, requiresPlan: true, showIfPro: true },
  { name: "Products", href: "/products", icon: Package, requiresPlan: true, showIfPro: true },
  // { name: "Sales", href: "/sales", icon: ShoppingCart, requiresPlan: true, showIfPro: true },
  // { name: "Customers", href: "/customers", icon: Users, requiresPlan: true, showIfPro: true },
  // { name: "Analytics", href: "/analytics", icon: BarChart3, requiresPlan: true, showIfPro: true },
  { name: "Integrations", href: "/integrations", icon: LinkIcon, requiresPlan: true, showIfPro: true },
  { name: "Pricing", href: "/pricing", icon: CreditCard, requiresPlan: false, showIfPro: false },
  // { name: "Settings", href: "/settings", icon: Settings, requiresPlan: false },
];

export const Sidebar = () => {
  const location = useLocation();
  const { data } = useSubscriptionStatus()
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = useState(false)

  const sidebarContent = (
    <>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg">
              <img src={"./logo_favicon.png"} alt="logo" />
            </div>
            <span className="text-xl font-bold">CardShop POS</span>
          </div>
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="md:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
      
      <nav className="px-4 space-y-2 flex-1 overflow-y-auto">
        {navigation.map((item) => {
          if (data.plan !== "pro_plus" && item.requiresPlan) return;
          if (data.plan === "pro_plus" && !item.showIfPro) return;

          return (
          <Link key={item.name} to={item.href} onClick={() => isMobile && setIsOpen(false)}>
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
    </>
  )

  // Mobile menu button
  const MobileMenuButton = () => (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsOpen(true)}
      className="md:hidden fixed top-4 left-4 z-50 bg-card border border-border"
    >
      <Menu className="h-5 w-5" />
    </Button>
  )

  if (isMobile) {
    return (
      <>
        <MobileMenuButton />
        {isOpen && (
          <div className="fixed inset-0 z-40 flex">
            <div 
              className="fixed inset-0 bg-black/50" 
              onClick={() => setIsOpen(false)}
            />
            <div className="relative flex flex-col w-80 max-w-xs bg-card border-r border-border">
              {sidebarContent}
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <div className="w-64 h-screen bg-card border-r border-border sticky top-0 flex flex-col">
      {sidebarContent}
    </div>
  );
};