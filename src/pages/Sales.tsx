import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus } from "lucide-react";

const Sales = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sales</h1>
          <p className="text-muted-foreground">Process transactions and manage orders</p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-primary">
          <Plus className="mr-2 h-4 w-4" />
          New Sale
        </Button>
      </div>

      <Card className="p-12 text-center bg-gradient-card border-border/50">
        <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-primary" />
        <h3 className="text-xl font-semibold mb-2">Sales Module</h3>
        <p className="text-muted-foreground">Coming soon - Full POS functionality</p>
      </Card>
    </div>
  );
};

export default Sales;