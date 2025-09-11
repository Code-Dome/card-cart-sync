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
  ExternalLink
} from "lucide-react";

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

  const filteredProducts = mockProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "All" || product.category === selectedCategory)
  );

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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your inventory and sync with external platforms</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync All
          </Button>
          <Button className="bg-gradient-primary hover:shadow-primary">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-card border-border/50">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">1,247</p>
            <p className="text-sm text-muted-foreground">Total Products</p>
          </div>
        </Card>
        <Card className="p-6 bg-gradient-card border-border/50">
          <div className="text-center">
            <p className="text-2xl font-bold text-success">1,124</p>
            <p className="text-sm text-muted-foreground">In Stock</p>
          </div>
        </Card>
        <Card className="p-6 bg-gradient-card border-border/50">
          <div className="text-center">
            <p className="text-2xl font-bold text-warning">89</p>
            <p className="text-sm text-muted-foreground">Low Stock</p>
          </div>
        </Card>
        <Card className="p-6 bg-gradient-card border-border/50">
          <div className="text-center">
            <p className="text-2xl font-bold text-destructive">34</p>
            <p className="text-sm text-muted-foreground">Out of Stock</p>
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-6 bg-gradient-card border-border/50">
        <div className="flex flex-col md:flex-row gap-4">
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
          <div className="flex space-x-2">
            <select 
              className="bg-input border border-border rounded px-3 py-2"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Pokemon">Pokemon</option>
              <option value="Magic">Magic: The Gathering</option>
              <option value="Yu-Gi-Oh">Yu-Gi-Oh!</option>
            </select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Products Table */}
      <Card className="bg-gradient-card border-border/50">
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
      </Card>
    </div>
  );
};

export default Products;