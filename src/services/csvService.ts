export interface ScryfallCard {
  id: string;
  name: string;
  mana_cost?: string;
  cmc: number;
  type_line: string;
  oracle_text?: string;
  power?: string;
  toughness?: string;
  colors: string[];
  color_identity: string[];
  set: string;
  set_name: string;
  collector_number: string;
  rarity: string;
  prices: {
    usd?: string;
    usd_foil?: string;
    eur?: string;
    eur_foil?: string;
    tix?: string;
  };
  purchase_uris?: {
    tcgplayer?: string;
    cardmarket?: string;
    cardhoarder?: string;
  };
  image_uris?: {
    small: string;
    normal: string;
    large: string;
    png: string;
    art_crop: string;
    border_crop: string;
  };
  legalities: Record<string, string>;
}

export interface ImportedProduct {
  name: string;
  sku: string;
  category: string;
  tcgPrice: string;
  currentPrice: string;
  stock: number;
  status: string;
  scryfallId?: string;
  set: string;
  rarity: string;
  collectorNumber: string;
}

export class CSVService {
  // Fetch Scryfall bulk data
  static async fetchScryfallBulkData(): Promise<any[]> {
    try {
      const response = await fetch('https://api.scryfall.com/bulk-data');
      const bulkData = await response.json();
      
      // Get the oracle cards bulk data (most suitable for inventory)
      const oracleCardsData = bulkData.data.find((item: any) => item.type === 'oracle_cards');
      
      if (!oracleCardsData) {
        throw new Error('Oracle cards bulk data not found');
      }

      // Fetch the actual card data
      const cardsResponse = await fetch(oracleCardsData.download_uri);
      const cards = await cardsResponse.json();
      
      return cards;
    } catch (error) {
      console.error('Error fetching Scryfall bulk data:', error);
      throw error;
    }
  }

  // Convert Scryfall cards to our product format
  static convertScryfallToProducts(cards: ScryfallCard[]): ImportedProduct[] {
    return cards.map((card, index) => ({
      name: card.name,
      sku: `MTG-${card.set.toUpperCase()}-${card.collector_number}`,
      category: 'Magic: The Gathering',
      tcgPrice: card.prices.usd ? `$${card.prices.usd}` : 'N/A',
      currentPrice: card.prices.usd ? `$${card.prices.usd}` : 'N/A',
      stock: 0, // Default stock
      status: 'Out of Stock',
      scryfallId: card.id,
      set: card.set_name,
      rarity: card.rarity,
      collectorNumber: card.collector_number,
    }));
  }

  // Parse CSV file
  static async parseCSV(file: File): Promise<ImportedProduct[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const csv = e.target?.result as string;
          const lines = csv.split('\n');
          const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
          
          const products: ImportedProduct[] = [];
          
          for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            
            const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
            const product: Partial<ImportedProduct> = {};
            
            headers.forEach((header, index) => {
              const value = values[index] || '';
              switch (header.toLowerCase()) {
                case 'name':
                  product.name = value;
                  break;
                case 'sku':
                  product.sku = value;
                  break;
                case 'category':
                  product.category = value;
                  break;
                case 'tcg_price':
                case 'tcgprice':
                  product.tcgPrice = value;
                  break;
                case 'current_price':
                case 'currentprice':
                case 'price':
                  product.currentPrice = value;
                  break;
                case 'stock':
                case 'quantity':
                  product.stock = parseInt(value) || 0;
                  break;
                case 'status':
                  product.status = value;
                  break;
                case 'set':
                  product.set = value;
                  break;
                case 'rarity':
                  product.rarity = value;
                  break;
                case 'collector_number':
                case 'collectornumber':
                  product.collectorNumber = value;
                  break;
              }
            });
            
            if (product.name) {
              products.push({
                name: product.name,
                sku: product.sku || `CARD-${i}`,
                category: product.category || 'Trading Cards',
                tcgPrice: product.tcgPrice || 'N/A',
                currentPrice: product.currentPrice || 'N/A',
                stock: product.stock || 0,
                status: product.status || (product.stock && product.stock > 0 ? 'In Stock' : 'Out of Stock'),
                set: product.set || 'Unknown',
                rarity: product.rarity || 'common',
                collectorNumber: product.collectorNumber || '',
              });
            }
          }
          
          resolve(products);
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsText(file);
    });
  }

  // Generate CSV template
  static generateCSVTemplate(): string {
    const headers = [
      'name',
      'sku',
      'category',
      'tcg_price',
      'current_price',
      'stock',
      'status',
      'set',
      'rarity',
      'collector_number'
    ];
    
    const sampleData = [
      'Lightning Bolt',
      'MTG-M21-001',
      'Magic: The Gathering',
      '$0.25',
      '$0.30',
      '50',
      'In Stock',
      'Core Set 2021',
      'common',
      '001'
    ];
    
    return [
      headers.join(','),
      sampleData.join(',')
    ].join('\n');
  }

  // Export products to CSV
  static exportToCSV(products: any[]): string {
    const headers = [
      'name',
      'sku',
      'category',
      'shopify_price',
      'tcg_price',
      'current_price',
      'stock',
      'status',
      'last_sync'
    ];
    
    const csvData = products.map(product => [
      `"${product.name}"`,
      `"${product.sku}"`,
      `"${product.category}"`,
      `"${product.shopifyPrice || ''}"`,
      `"${product.tcgPrice || ''}"`,
      `"${product.currentPrice || ''}"`,
      product.stock || 0,
      `"${product.status}"`,
      `"${product.lastSync || ''}"`
    ].join(','));
    
    return [
      headers.join(','),
      ...csvData
    ].join('\n');
  }

  // Apply currency conversion to products
  static applyRandConversion(products: ImportedProduct[], conversionRate: number): ImportedProduct[] {
    return products.map(product => ({
      ...product,
      tcgPrice: product.tcgPrice !== 'N/A' ? this.convertUsdToRand(product.tcgPrice, conversionRate) : 'N/A',
      currentPrice: product.currentPrice !== 'N/A' ? this.convertUsdToRand(product.currentPrice, conversionRate) : 'N/A',
    }));
  }

  // Convert USD price to ZAR (South African Rand) with custom rate
  static convertUsdToRand(usdPrice: string, conversionRate: number = 18.50): string {
    // Extract numeric value from price string (handles $X.XX format)
    const numericValue = parseFloat(usdPrice.replace(/[^0-9.]/g, ''));
    
    if (isNaN(numericValue)) {
      return usdPrice; // Return original if can't parse
    }
    
    const randValue = numericValue * conversionRate;
    return `R${randValue.toFixed(2)}`;
  }

  // Download file helper
  static downloadFile(content: string, filename: string, mimeType = 'text/csv') {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}