import { Card } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

const Analytics = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">View performance metrics and business insights</p>
      </div>

      <Card className="p-12 text-center bg-gradient-card border-border/50">
        <BarChart3 className="h-16 w-16 mx-auto mb-4 text-primary" />
        <h3 className="text-xl font-semibold mb-2">Business Analytics</h3>
        <p className="text-muted-foreground">Coming soon - Comprehensive reporting and insights</p>
      </Card>
    </div>
  );
};

export default Analytics;