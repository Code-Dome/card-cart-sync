import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign,
  TrendingUp,
  Clock
} from "lucide-react";

const stats = [
  {
    title: "Total Products",
    value: "1,234",
    change: "+12%",
    trend: "up",
    icon: Package,
  },
  {
    title: "Today's Sales",
    value: "R 2,850",
    change: "+8%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Active Customers",
    value: "892",
    change: "+15%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Pending Orders",
    value: "23",
    change: "-5%",
    trend: "down",
    icon: Clock,
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to your POS system</p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-primary">
          <ShoppingCart className="mr-2 h-4 w-4" />
          New Sale
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6 bg-gradient-card border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <span className={`text-sm ${stat.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-card border-border/50">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm">New product synced from Shopify</span>
              </div>
              <span className="text-xs text-muted-foreground">2 min ago</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Price updated from TCGPlayer</span>
              </div>
              <span className="text-xs text-muted-foreground">5 min ago</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <span className="text-sm">Low stock alert: Pokemon Booster</span>
              </div>
              <span className="text-xs text-muted-foreground">12 min ago</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card border-border/50">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-16 flex-col">
              <Package className="h-6 w-6 mb-2" />
              Add Product
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <ShoppingCart className="h-6 w-6 mb-2" />
              New Sale
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <TrendingUp className="h-6 w-6 mb-2" />
              View Reports
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <Users className="h-6 w-6 mb-2" />
              Customer List
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;