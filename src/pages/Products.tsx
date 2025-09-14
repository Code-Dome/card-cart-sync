import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  RefreshCw,
  Filter,
  ExternalLink,
  Upload,
  Download
} from "lucide-react";
import { CSVImportModal } from "@/components/Inventory/CSVImportModal";
import { CSVExportModal } from "@/components/Inventory/CSVExportModal";
import { ImportedProduct } from "@/services/csvService";

// Mock product data
const mockProducts = [
  {
    id: "1",
    name: "Pokemon Booster Pack - Paldea Evolved",
    sku: "POK-PAL-BP-001",
    category: "Pokemon",
    shopifyPrice: "R 85.00",
    tcgPrice: "R 92.50",
    currentPrice: "R 92.50",
    stock: 24,
    status: "In Stock",
    lastSync: "2 min ago",
  },
  {
    id: "2",
    name: "Magic: The Gathering - Commander Deck",
    sku: "MTG-CMD-2024-001",
    category: "Magic",
    shopifyPrice: "R 450.00",
    tcgPrice: "R 485.00",
    currentPrice: "R 485.00",
    stock: 8,
    status: "Low Stock",
    lastSync: "5 min ago",
  },
  {
    id: "3",
    name: "Yu-Gi-Oh! Structure Deck - Dark World",
    sku: "YGO-STR-DW-001",
    category: "Yu-Gi-Oh",
    shopifyPrice: "R 220.00",
    tcgPrice: "R 235.00",
    currentPrice: "R 235.00",
    stock: 0,
    status: "Out of Stock",
    lastSync: "1 hour ago",
  },
];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState(mockProducts);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "All" || product.category === selectedCategory)
  );

  const handleImportProducts = (importedProducts: ImportedProduct[]) => {
    // Convert imported products to the format expected by our app
    const newProducts = importedProducts.map((imported, index) => ({
      id: `imported-${Date.now()}-${index}`,
      name: imported.name,
      sku: imported.sku,
      category: imported.category,
      shopifyPrice: imported.currentPrice,
      tcgPrice: imported.tcgPrice,
      currentPrice: imported.currentPrice,
      stock: imported.stock,
      status: imported.status,
      lastSync: "Just imported",
    }));

    setProducts(prev => [...prev, ...newProducts]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-success text-success-foreground";
      case "Low Stock":
        return "bg-warning text-warning-foreground";
      case "Out of Stock":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your inventory and sync with external platforms</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto">
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync All
          </Button>
          <Button 
            variant="outline"
            onClick={() => setImportModalOpen(true)}
            className="w-full sm:w-auto"
          >
            <Upload className="mr-2 h-4 w-4" />
            Import CSV
          </Button>
          <Button 
            variant="outline"
            onClick={() => setExportModalOpen(true)}
            className="w-full sm:w-auto"
          >
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button className="bg-gradient-primary hover:shadow-primary w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <Card className="p-4 md:p-6 bg-gradient-card border-border/50">
          <div className="text-center">
            <p className="text-lg sm:text-2xl font-bold text-primary">1,247</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Total Products</p>
          </div>
        </Card>
        <Card className="p-4 md:p-6 bg-gradient-card border-border/50">
          <div className="text-center">
            <p className="text-lg sm:text-2xl font-bold text-success">1,124</p>
            <p className="text-xs sm:text-sm text-muted-foreground">In Stock</p>
          </div>
        </Card>
        <Card className="p-4 md:p-6 bg-gradient-card border-border/50">
          <div className="text-center">
            <p className="text-lg sm:text-2xl font-bold text-warning">89</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Low Stock</p>
          </div>
        </Card>
        <Card className="p-4 md:p-6 bg-gradient-card border-border/50">
          <div className="text-center">
            <p className="text-lg sm:text-2xl font-bold text-destructive">34</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Out of Stock</p>
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-4 md:p-6 bg-gradient-card border-border/50">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <select 
              className="bg-input border border-border rounded px-3 py-2 min-w-0 flex-1 sm:flex-initial"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Pokemon">Pokemon</option>
              <option value="Magic">Magic: The Gathering</option>
              <option value="Yu-Gi-Oh">Yu-Gi-Oh!</option>
            </select>
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Products Table - Mobile Cards on small screens, table on larger */}
      <Card className="bg-gradient-card border-border/50">
        {/* Mobile view */}
        <div className="block lg:hidden p-4 space-y-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="border border-border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium truncate">{product.name}</h4>
                  <p className="text-sm text-muted-foreground">{product.sku}</p>
                </div>
                <Badge className={getStatusColor(product.status)} >
                  {product.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Category:</span>
                  <Badge variant="outline" className="ml-1 text-xs">{product.category}</Badge>
                </div>
                <div>
                  <span className="text-muted-foreground">Stock:</span>
                  <span className="ml-1 font-medium">{product.stock}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Current:</span>
                  <span className="ml-1 font-semibold">{product.currentPrice}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">TCG:</span>
                  <span className="ml-1 text-success">{product.tcgPrice}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t border-border">
                <span className="text-xs text-muted-foreground">Last sync: {product.lastSync}</span>
                <div className="flex space-x-1">
                  <Button size="sm" variant="ghost">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop table view */}
        <div className="hidden lg:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Shopify Price</TableHead>
                <TableHead>TCG Price</TableHead>
                <TableHead>Current Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Sync</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="text-muted-foreground">{product.sku}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell>{product.shopifyPrice}</TableCell>
                  <TableCell className="text-success">{product.tcgPrice}</TableCell>
                  <TableCell className="font-semibold">{product.currentPrice}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(product.status)}>
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {product.lastSync}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Import/Export Modals */}
      <CSVImportModal
        open={importModalOpen}
        onOpenChange={setImportModalOpen}
        onImport={handleImportProducts}
      />
      
      <CSVExportModal
        open={exportModalOpen}
        onOpenChange={setExportModalOpen}
        products={products}
      />
    </div>
  );
};

export default Products;