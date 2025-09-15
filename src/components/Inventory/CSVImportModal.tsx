import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useToast } from "@/hooks/use-toast";
import { useSettings } from "@/contexts/SettingsContext";
import { CSVService, ImportedProduct } from "@/services/csvService";
import { Upload, Download, Database, AlertCircle, CheckCircle, DollarSign } from "lucide-react";

interface CSVImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (products: ImportedProduct[]) => void;
}

export const CSVImportModal = ({
  open,
  onOpenChange,
  onImport,
}: CSVImportModalProps) => {
  const { toast } = useToast();
  const { getConversionRate } = useSettings();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [fetchingScryfallData, setFetchingScryfallData] = useState(false);
  const [importPreview, setImportPreview] = useState<ImportedProduct[]>([]);
  const [convertToRand, setConvertToRand] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [allProducts, setAllProducts] = useState<ImportedProduct[]>([]);
  
  const itemsPerPage = 10;
  const totalPages = Math.ceil(allProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPreview = allProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImportPreview([]);
    }
  };

  const handleScryfallImport = async () => {
    setFetchingScryfallData(true);
    setImportProgress(0);
    
    try {
      toast({
        title: "Fetching Scryfall Data",
        description: "This may take a few minutes. Downloading latest card database...",
      });

      setImportProgress(20);
      const cards = await CSVService.fetchScryfallBulkData();
      
      setImportProgress(60);
      toast({
        title: "Processing Cards",
        description: "Converting Scryfall data to product format...",
      });

      // Limit to first 1000 cards for demo purposes
      const limitedCards = cards.slice(0, 1000);
      let products = CSVService.convertScryfallToProducts(limitedCards);
      
      // Apply currency conversion if enabled
      if (convertToRand) {
        const rate = await getConversionRate();
        products = await CSVService.applyRandConversion(products, rate);
      }
      
      setImportProgress(100);
      setAllProducts(products);
      setImportPreview(products.slice(0, itemsPerPage));
      setCurrentPage(1);
      
      toast({
        title: "Success",
        description: `Ready to import ${products.length} products from Scryfall`,
      });

      // Store full products for import
      (window as any).pendingScryfallImport = products;
      
    } catch (error) {
      console.error('Error fetching Scryfall data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch Scryfall data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setFetchingScryfallData(false);
    }
  };

  const handleCSVImport = async () => {
    if (!selectedFile) return;

    setImporting(true);
    setImportProgress(0);

    try {
      setImportProgress(50);
      let products = await CSVService.parseCSV(selectedFile);
      
      // Apply currency conversion if enabled
      if (convertToRand) {
        const rate = await getConversionRate();
        products = await CSVService.applyRandConversion(products, rate);
      }
      
      setImportProgress(100);
      setAllProducts(products);
      setImportPreview(products.slice(0, itemsPerPage));
      setCurrentPage(1);
      
      toast({
        title: "Success",
        description: `Parsed ${products.length} products from CSV`,
      });

      // Store full products for import
      (window as any).pendingCSVImport = products;
      
    } catch (error) {
      console.error('Error parsing CSV:', error);
      toast({
        title: "Error",
        description: "Failed to parse CSV file. Please check the format.",
        variant: "destructive",
      });
    } finally {
      setImporting(false);
    }
  };

  const handleConfirmImport = () => {
    const products = (window as any).pendingScryfallImport || (window as any).pendingCSVImport;
    if (products && products.length > 0) {
      onImport(products);
      toast({
        title: "Import Complete",
        description: `Successfully imported ${products.length} products`,
      });
      onOpenChange(false);
      
      // Cleanup
      delete (window as any).pendingScryfallImport;
      delete (window as any).pendingCSVImport;
      setImportPreview([]);
      setAllProducts([]);
      setCurrentPage(1);
      setSelectedFile(null);
    }
  };

  const downloadTemplate = () => {
    const template = CSVService.generateCSVTemplate();
    CSVService.downloadFile(template, 'product-import-template.csv');
    toast({
      title: "Template Downloaded",
      description: "CSV template has been downloaded to your device",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Import Products</DialogTitle>
          <DialogDescription>
            Import products from Scryfall bulk data or upload a CSV file
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Currency Conversion Toggle */}
          <Card className="p-4 border-dashed">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <div>
                  <Label htmlFor="convert-currency" className="text-sm font-medium">
                    Convert USD to Rand
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Convert USD prices to South African Rand (R18.50 = $1.00)
                  </p>
                </div>
              </div>
              <Switch
                id="convert-currency"
                checked={convertToRand}
                onCheckedChange={setConvertToRand}
              />
            </div>
          </Card>
          {/* Scryfall Import Section */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Import from Scryfall</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Download the latest Magic: The Gathering card database from Scryfall.
                This includes prices, set information, and card details.
              </p>
              <Button 
                onClick={handleScryfallImport}
                disabled={fetchingScryfallData}
                className="w-full sm:w-auto"
              >
                <Database className="mr-2 h-4 w-4" />
                {fetchingScryfallData ? "Fetching Data..." : "Import from Scryfall"}
              </Button>
              {fetchingScryfallData && (
                <div className="space-y-2">
                  <Progress value={importProgress} className="w-full" />
                  <p className="text-xs text-muted-foreground">
                    Downloading and processing Scryfall data...
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* CSV Import Section */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Upload className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Upload CSV File</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Upload a CSV file with your product data. Download the template first to see the required format.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  variant="outline" 
                  onClick={downloadTemplate}
                  className="w-full sm:w-auto"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Template
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="csv-file">Select CSV File</Label>
                <Input
                  id="csv-file"
                  type="file"
                  accept=".csv"
                  onChange={handleFileSelect}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium"
                />
              </div>

              {selectedFile && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
                  </AlertDescription>
                </Alert>
              )}

              <Button 
                onClick={handleCSVImport}
                disabled={!selectedFile || importing}
                className="w-full sm:w-auto"
              >
                <Upload className="mr-2 h-4 w-4" />
                {importing ? "Processing..." : "Parse CSV"}
              </Button>

              {importing && (
                <div className="space-y-2">
                  <Progress value={importProgress} className="w-full" />
                  <p className="text-xs text-muted-foreground">
                    Processing CSV file...
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Import Preview */}
          {allProducts.length > 0 && (
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Import Preview</h3>
                  <Button onClick={handleConfirmImport} className="bg-gradient-primary">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Confirm Import
                  </Button>
                </div>
                
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Showing {paginatedPreview.length} of {allProducts.length} products. Use pagination to browse all items.
                  </AlertDescription>
                </Alert>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Name</th>
                        <th className="text-left p-2">SKU</th>
                        <th className="text-left p-2">Category</th>
                        <th className="text-left p-2">Price</th>
                        <th className="text-left p-2">Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedPreview.map((product, index) => (
                        <tr key={startIndex + index} className="border-b">
                          <td className="p-2">{product.name}</td>
                          <td className="p-2 text-muted-foreground">{product.sku}</td>
                          <td className="p-2">{product.category}</td>
                          <td className="p-2">{product.currentPrice}</td>
                          <td className="p-2">{product.stock}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-4">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                          />
                        </PaginationItem>
                        
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                          
                          return (
                            <PaginationItem key={pageNum}>
                              <PaginationLink
                                onClick={() => setCurrentPage(pageNum)}
                                isActive={currentPage === pageNum}
                                className="cursor-pointer"
                              >
                                {pageNum}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        })}
                        
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};