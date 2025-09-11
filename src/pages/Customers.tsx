import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Plus } from "lucide-react";

const Customers = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Customers</h1>
          <p className="text-muted-foreground">Manage customer relationships and profiles</p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-primary">
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      <Card className="p-12 text-center bg-gradient-card border-border/50">
        <Users className="h-16 w-16 mx-auto mb-4 text-primary" />
        <h3 className="text-xl font-semibold mb-2">Customer Management</h3>
        <p className="text-muted-foreground">Coming soon - Customer profiles and loyalty system</p>
      </Card>
    </div>
  );
};

export default Customers;