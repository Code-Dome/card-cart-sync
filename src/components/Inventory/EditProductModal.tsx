import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  shopifyPrice: string;
  tcgPrice: string;
  currentPrice: string;
  stock: number;
  status: string;
  lastSync: string;
}

interface EditProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  onSave: (updatedProduct: Product) => void;
}

const EditProductModal = ({ open, onOpenChange, product, onSave }: EditProductModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<Product>>({});

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name,
        sku: product.sku,
        category: product.category,
        shopifyPrice: product.shopifyPrice,
        tcgPrice: product.tcgPrice,
        currentPrice: product.currentPrice,
        stock: product.stock,
        status: product.status,
        lastSync: product.lastSync,
      });
    }
  }, [product]);

  const handleInputChange = (field: keyof Product, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.sku || !formData.category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (Name, SKU, Category)",
        variant: "destructive",
      });
      return;
    }

    const updatedProduct: Product = {
      id: formData.id!,
      name: formData.name!,
      sku: formData.sku!,
      category: formData.category!,
      shopifyPrice: formData.shopifyPrice!,
      tcgPrice: formData.tcgPrice!,
      currentPrice: formData.currentPrice!,
      stock: formData.stock!,
      status: formData.status!,
      lastSync: "Just updated",
    };

    onSave(updatedProduct);
    onOpenChange(false);

    toast({
      title: "Product Updated",
      description: `${updatedProduct.name} has been successfully updated.`,
    });
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={formData.name || ""}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter product name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sku">SKU *</Label>
              <Input
                id="sku"
                value={formData.sku || ""}
                onChange={(e) => handleInputChange("sku", e.target.value)}
                placeholder="Enter SKU"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category || ""}
                onValueChange={(value) => handleInputChange("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pokemon">Pokemon</SelectItem>
                  <SelectItem value="Magic">Magic: The Gathering</SelectItem>
                  <SelectItem value="Yu-Gi-Oh">Yu-Gi-Oh!</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock Quantity</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={formData.stock || 0}
                onChange={(e) => handleInputChange("stock", parseInt(e.target.value) || 0)}
                placeholder="Enter stock quantity"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="shopifyPrice">Shopify Price</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  R
                </span>
                <Input
                    id="shopifyPrice"
                value={formData.shopifyPrice || ""}
                onChange={(e) => handleInputChange("shopifyPrice", e.target.value)}
                  placeholder="0.00"
                  className="pl-7" // add padding so text doesn’t overlap the "R"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tcgPrice">TCG Price</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  R
                </span>
                <Input
                    id="tcgPrice"
                value={formData.tcgPrice || ""}
                onChange={(e) => handleInputChange("tcgPrice", e.target.value)}
                  placeholder="0.00"
                  className="pl-7" // add padding so text doesn’t overlap the "R"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentPrice">Current Price</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  R
                </span>
                <Input
                  id="currentPrice"
                  value={formData.currentPrice || ""}
                  onChange={(e) => handleInputChange("currentPrice", e.target.value)}
                  placeholder="0.00"
                  className="pl-7" // add padding so text doesn’t overlap the "R"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status || ""}
              onValueChange={(value) => handleInputChange("status", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="In Stock">In Stock</SelectItem>
                <SelectItem value="Low Stock">Low Stock</SelectItem>
                <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                <SelectItem value="Discontinued">Discontinued</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-gradient-primary">
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;