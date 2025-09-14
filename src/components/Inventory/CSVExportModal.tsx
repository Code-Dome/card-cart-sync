import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { CSVService } from "@/services/csvService";
import { Download } from "lucide-react";

interface CSVExportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  products: any[];
}

export const CSVExportModal = ({
  open,
  onOpenChange,
  products,
}: CSVExportModalProps) => {
  const { toast } = useToast();
  const [exportFilters, setExportFilters] = useState({
    inStock: true,
    lowStock: true,
    outOfStock: true,
    allCategories: true,
  });

  const handleExport = () => {
    try {
      // Filter products based on selected options
      let filteredProducts = products;

      if (!exportFilters.allCategories) {
        filteredProducts = filteredProducts.filter(product => {
          const status = product.status.toLowerCase();
          return (
            (exportFilters.inStock && status === 'in stock') ||
            (exportFilters.lowStock && status === 'low stock') ||
            (exportFilters.outOfStock && status === 'out of stock')
          );
        });
      }

      // Generate CSV
      const csvContent = CSVService.exportToCSV(filteredProducts);
      
      // Download file
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `products-export-${timestamp}.csv`;
      
      CSVService.downloadFile(csvContent, filename);
      
      toast({
        title: "Export Complete",
        description: `Exported ${filteredProducts.length} products to ${filename}`,
      });

      onOpenChange(false);
    } catch (error) {
      console.error('Error exporting CSV:', error);
      toast({
        title: "Error",
        description: "Failed to export products to CSV",
        variant: "destructive",
      });
    }
  };

  const handleFilterChange = (filter: keyof typeof exportFilters, checked: boolean) => {
    setExportFilters(prev => ({
      ...prev,
      [filter]: checked,
    }));
  };

  const getFilteredCount = () => {
    if (exportFilters.allCategories) return products.length;
    
    return products.filter(product => {
      const status = product.status.toLowerCase();
      return (
        (exportFilters.inStock && status === 'in stock') ||
        (exportFilters.lowStock && status === 'low stock') ||
        (exportFilters.outOfStock && status === 'out of stock')
      );
    }).length;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Export Products to CSV</DialogTitle>
          <DialogDescription>
            Select which products to include in your CSV export
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Export Filters</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="all-categories"
                    checked={exportFilters.allCategories}
                    onCheckedChange={(checked) => handleFilterChange('allCategories', !!checked)}
                  />
                  <Label htmlFor="all-categories">Export All Products</Label>
                </div>

                {!exportFilters.allCategories && (
                  <div className="ml-6 space-y-3">
                    <Label className="text-sm font-medium">Include by Status:</Label>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="in-stock"
                        checked={exportFilters.inStock}
                        onCheckedChange={(checked) => handleFilterChange('inStock', !!checked)}
                      />
                      <Label htmlFor="in-stock">In Stock</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="low-stock"
                        checked={exportFilters.lowStock}
                        onCheckedChange={(checked) => handleFilterChange('lowStock', !!checked)}
                      />
                      <Label htmlFor="low-stock">Low Stock</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="out-of-stock"
                        checked={exportFilters.outOfStock}
                        onCheckedChange={(checked) => handleFilterChange('outOfStock', !!checked)}
                      />
                      <Label htmlFor="out-of-stock">Out of Stock</Label>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Products to export: <span className="font-semibold">{getFilteredCount()}</span>
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-muted/50">
            <div className="space-y-2">
              <h4 className="font-medium">Export Format</h4>
              <p className="text-sm text-muted-foreground">
                The CSV file will include: Product name, SKU, Category, Shopify price, 
                TCG price, Current price, Stock quantity, Status, and Last sync time.
              </p>
            </div>
          </Card>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleExport} className="bg-gradient-primary">
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};