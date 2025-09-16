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
    <div className="space-y-6 md:space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to your POS system</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <h1>COMING SOON</h1>
        {/*{stats.map((stat) => (*/}
        {/*  <Card key={stat.title} className="p-4 md:p-6 bg-gradient-card border-border/50">*/}
        {/*    <div className="flex items-center justify-between">*/}
        {/*      <div className="min-w-0 flex-1">*/}
        {/*        <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">*/}
        {/*          {stat.title}*/}
        {/*        </p>*/}
        {/*        <div className="flex items-center space-x-2">*/}
        {/*          <p className="text-xl sm:text-2xl font-bold">{stat.value}</p>*/}
        {/*          <span className={`text-xs sm:text-sm ${stat.trend === 'up' ? 'text-success' : 'text-destructive'}`}>*/}
        {/*            {stat.change}*/}
        {/*          </span>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="p-2 md:p-3 bg-primary/10 rounded-lg flex-shrink-0">*/}
        {/*        <stat.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </Card>*/}
        {/*))}*/}
      </div>

      {/*<div className="grid grid-cols-1 xl:grid-cols-2 gap-6">*/}
      {/*  <Card className="p-4 md:p-6 bg-gradient-card border-border/50">*/}
      {/*    <h3 className="text-base sm:text-lg font-semibold mb-4">Recent Activity</h3>*/}
      {/*    <div className="space-y-4">*/}
      {/*      <div className="flex items-center justify-between">*/}
      {/*        <div className="flex items-center space-x-3 min-w-0 flex-1">*/}
      {/*          <div className="w-2 h-2 bg-success rounded-full flex-shrink-0"></div>*/}
      {/*          <span className="text-sm truncate">New product synced from Shopify</span>*/}
      {/*        </div>*/}
      {/*        <span className="text-xs text-muted-foreground flex-shrink-0">2 min ago</span>*/}
      {/*      </div>*/}
      {/*      <div className="flex items-center justify-between">*/}
      {/*        <div className="flex items-center space-x-3 min-w-0 flex-1">*/}
      {/*          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>*/}
      {/*          <span className="text-sm truncate">Price updated from TCGPlayer</span>*/}
      {/*        </div>*/}
      {/*        <span className="text-xs text-muted-foreground flex-shrink-0">5 min ago</span>*/}
      {/*      </div>*/}
      {/*      <div className="flex items-center justify-between">*/}
      {/*        <div className="flex items-center space-x-3 min-w-0 flex-1">*/}
      {/*          <div className="w-2 h-2 bg-warning rounded-full flex-shrink-0"></div>*/}
      {/*          <span className="text-sm truncate">Low stock alert: Pokemon Booster</span>*/}
      {/*        </div>*/}
      {/*        <span className="text-xs text-muted-foreground flex-shrink-0">12 min ago</span>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </Card>*/}

      {/*  <Card className="p-4 md:p-6 bg-gradient-card border-border/50">*/}
      {/*    <h3 className="text-base sm:text-lg font-semibold mb-4">Quick Actions</h3>*/}
      {/*    <div className="grid grid-cols-2 gap-3 md:gap-4">*/}
      {/*      <Button disabled variant="outline" className="h-14 md:h-16 flex-col text-xs sm:text-sm">*/}
      {/*        <Package className="h-5 w-5 md:h-6 md:w-6 mb-1 md:mb-2" />*/}
      {/*        Add Product*/}
      {/*      </Button>*/}
      {/*      <Button disabled variant="outline" className="h-14 md:h-16 flex-col text-xs sm:text-sm">*/}
      {/*        <ShoppingCart className="h-5 w-5 md:h-6 md:w-6 mb-1 md:mb-2" />*/}
      {/*        New Sale*/}
      {/*      </Button>*/}
      {/*      <Button disabled variant="outline" className="h-14 md:h-16 flex-col text-xs sm:text-sm">*/}
      {/*        <TrendingUp className="h-5 w-5 md:h-6 md:w-6 mb-1 md:mb-2" />*/}
      {/*        View Reports*/}
      {/*      </Button>*/}
      {/*      <Button disabled variant="outline" className="h-14 md:h-16 flex-col text-xs sm:text-sm">*/}
      {/*        <Users className="h-5 w-5 md:h-6 md:w-6 mb-1 md:mb-2" />*/}
      {/*        Customer List*/}
      {/*      </Button>*/}
      {/*    </div>*/}
      {/*  </Card>*/}
      {/*</div>*/}
    </div>
  );
};

export default Dashboard;