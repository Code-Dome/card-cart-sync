import { Card } from "@/components/ui/card";
import { Settings as SettingsIcon } from "lucide-react";
import { SubscriptionManager } from "@/components/Subscription/SubscriptionManager";

const Settings = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Configure your POS system and manage your subscription</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Subscription Management */}
        <SubscriptionManager />
        
        {/* Other Settings */}
        <Card className="p-12 text-center bg-gradient-card border-border/50">
          <SettingsIcon className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">System Settings</h3>
          <p className="text-muted-foreground">Coming soon - Store configuration and user preferences</p>
        </Card>
      </div>
    </div>
  );
};

export default Settings;