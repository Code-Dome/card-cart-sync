import {useState} from "react";
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Badge} from "@/components/ui/badge";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import {Download, Edit, ExternalLink, Filter, Search, Trash2, Upload} from "lucide-react";
import {CSVImportModal} from "@/components/Inventory/CSVImportModal";
import {CSVExportModal} from "@/components/Inventory/CSVExportModal";
import {ImportedProduct} from "@/services/csvService";
import {cn} from "@/lib/utils.ts";
import {ProductStatus} from "@/types/productStatus.ts";
import NoData from "@/assets/undraw_no-data_ig65.svg";
import EditProductModal, { Product } from "@/components/Inventory/EditProductModal";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const filteredProducts = products?.filter(product =>
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

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const handleSaveProduct = (updatedProduct: Product) => {
    setProducts(prev =>
      prev.map(p => p.id === updatedProduct.id ? updatedProduct : p)
    );
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
                    {/*<Button variant="outline" className="w-full sm:w-auto">*/}
                    {/*  <RefreshCw className="mr-2 h-4 w-4" />*/}
                    {/*  Sync All*/}
                    {/*</Button>*/}
                    <Button
                        variant="outline"
                        onClick={() => setImportModalOpen(true)}
                        className="w-full sm:w-auto"
                    >
                        <Upload className="mr-2 h-4 w-4"/>
                        Import
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => setExportModalOpen(true)}
                        className="w-full sm:w-auto"
                    >
                        <Download className="mr-2 h-4 w-4"/>
                        Export CSV
                    </Button>
                    {/*<Button className="bg-gradient-primary hover:shadow-primary w-full sm:w-auto">*/}
                    {/*  <Plus className="mr-2 h-4 w-4" />*/}
                    {/*  Add Product*/}
                    {/*</Button>*/}
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <Card className="p-4 md:p-6 bg-gradient-card border-border/50">
                    <div className="text-center">
                        <p className="text-lg sm:text-2xl font-bold text-primary">{products?.length}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">Total Products</p>
                    </div>
                </Card>
                <Card className="p-4 md:p-6 bg-gradient-card border-border/50">
                    <div className="text-center">
                        <p className="text-lg sm:text-2xl font-bold text-success">{products?.filter(p => p?.status === ProductStatus.IN_STOCK).length}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">In Stock</p>
                    </div>
                </Card>
                <Card className="p-4 md:p-6 bg-gradient-card border-border/50">
                    <div className="text-center">
                        <p className="text-lg sm:text-2xl font-bold text-warning">{products?.filter(p => p?.status === ProductStatus.LOW_STOCK).length}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">Low Stock</p>
                    </div>
                </Card>
                <Card className="p-4 md:p-6 bg-gradient-card border-border/50">
                    <div className="text-center">
                        <p className="text-lg sm:text-2xl font-bold text-destructive">{products?.filter(p => p?.status === ProductStatus.OUT_OF_STOCK).length}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">Out of Stock</p>
                    </div>
                </Card>
            </div>

            {/* Filters and Search */}
            <Card className="p-4 md:p-6 bg-gradient-card border-border/50">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"/>
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
                            <Filter className="mr-2 h-4 w-4"/>
                            More Filters
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Products Table - Mobile Cards on small screens, table on larger */}
            <Card className="bg-gradient-card border-border/50">
                {/* Mobile view */}
                <div className="block lg:hidden p-4 space-y-4">
                    {filteredProducts?.length < 1 ? (
                            <div className="border border-border rounded-lg p-4 space-y-3">
                                <div className="flex justify-center items-center align-middle">
                                    <div className="min-w-0 flex-1 justify-center text-center">
                                        <img src={NoData} alt="" className={"mb-10"}/>
                                        <div>NO PRODUCTS AVAILABLE</div>
                                    </div>
                                </div>
                            </div>
                        ) :
                        filteredProducts?.map((product) => (
                            <div key={product.id} className="border border-border rounded-lg p-4 space-y-3">
                                <div className="flex justify-between items-start">
                                    <div className="min-w-0 flex-1">
                                        <h4 className="font-medium truncate">{product.name}</h4>
                                        <p className="text-sm text-muted-foreground">{product.sku}</p>
                                    </div>
                                    <Badge className={getStatusColor(product.status.toString())}>
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
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => handleEditProduct(product)}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button size="sm" variant="ghost">
                                            <ExternalLink className="h-4 w-4"/>
                                        </Button>
                                        <Button size="sm" variant="ghost" className="text-destructive">
                                            <Trash2 className="h-4 w-4"/>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}


                </div>

                {/* Desktop table view */}
                <div className="hidden lg:block overflow-x-auto">
                    {filteredProducts?.length < 1 ? (
                            <div className="flex p-5">
                                <div className="min-w-0 flex-1 text-center">
                                    <img src={NoData} alt="" className="mb-10 mx-auto"/>
                                    <div>NO PRODUCTS AVAILABLE</div>
                                </div>
                            </div>
                        ) :

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
                                            <Badge variant="outline"
                                                   className={"flex justify-center text-center"}>{product.category}</Badge>
                                        </TableCell>
                                        <TableCell>{product.shopifyPrice}</TableCell>
                                        <TableCell className="text-success">{product.tcgPrice}</TableCell>
                                        <TableCell className="font-semibold">{product.currentPrice}</TableCell>
                                        <TableCell>{product.stock}</TableCell>
                                        <TableCell>
                                            <Badge
                                                className={cn(getStatusColor(product.status), "flex text-center justify-center")}>
                                                {product.status.toString()}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground text-sm">
                                            {product.lastSync}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => handleEditProduct(product)}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button size="sm" variant="ghost">
                                                    <ExternalLink className="h-4 w-4"/>
                                                </Button>
                                                <Button size="sm" variant="ghost" className="text-destructive">
                                                    <Trash2 className="h-4 w-4"/>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    }
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

      <EditProductModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        product={selectedProduct}
        onSave={handleSaveProduct}
      />
    </div>
  );
};

export default Products;