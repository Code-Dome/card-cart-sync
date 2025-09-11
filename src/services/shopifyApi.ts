// Mock Shopify API integration
// This would be replaced with actual API calls to your .NET backend

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  variants: ShopifyVariant[];
  images: ShopifyImage[];
  status: 'active' | 'draft' | 'archived';
  created_at: string;
  updated_at: string;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  price: string;
  sku: string;
  inventory_quantity: number;
  barcode?: string;
}

export interface ShopifyImage {
  id: string;
  src: string;
  alt: string;
}

export interface ShopifyStore {
  id: string;
  name: string;
  domain: string;
  email: string;
  currency: string;
}

// Mock API functions
export const shopifyApi = {
  // Authenticate with Shopify OAuth
  authenticate: async (shop: string): Promise<{ access_token: string; scope: string }> => {
    // Mock OAuth flow
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          access_token: 'mock_access_token_' + Date.now(),
          scope: 'read_products,write_products,read_inventory,write_inventory'
        });
      }, 1500);
    });
  },

  // Get store information
  getStore: async (accessToken: string): Promise<ShopifyStore> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 'shop_123456',
          name: 'TCG Collector Store',
          domain: 'tcg-collector.myshopify.com',
          email: 'owner@tcgcollector.com',
          currency: 'USD'
        });
      }, 1000);
    });
  },

  // Get all products from Shopify
  getProducts: async (accessToken: string): Promise<ShopifyProduct[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'prod_001',
            title: 'Pokemon Booster Pack - Paldea Evolved',
            handle: 'pokemon-booster-pack-paldea-evolved',
            status: 'active',
            created_at: '2024-01-15T10:00:00Z',
            updated_at: '2024-01-20T14:30:00Z',
            variants: [
              {
                id: 'var_001',
                title: 'Default Title',
                price: '4.99',
                sku: 'POK-PAL-BP-001',
                inventory_quantity: 24,
                barcode: '123456789012'
              }
            ],
            images: [
              {
                id: 'img_001',
                src: 'https://example.com/pokemon-pack.jpg',
                alt: 'Pokemon Booster Pack'
              }
            ]
          },
          {
            id: 'prod_002',
            title: 'Magic: The Gathering - Commander Deck',
            handle: 'mtg-commander-deck',
            status: 'active',
            created_at: '2024-01-10T08:00:00Z',
            updated_at: '2024-01-18T16:45:00Z',
            variants: [
              {
                id: 'var_002',
                title: 'Default Title',
                price: '24.99',
                sku: 'MTG-CMD-2024-001',
                inventory_quantity: 8
              }
            ],
            images: [
              {
                id: 'img_002',
                src: 'https://example.com/mtg-commander.jpg',
                alt: 'MTG Commander Deck'
              }
            ]
          }
        ]);
      }, 2000);
    });
  },

  // Update product in Shopify
  updateProduct: async (accessToken: string, productId: string, updates: Partial<ShopifyProduct>): Promise<ShopifyProduct> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock updated product
        resolve({
          id: productId,
          title: updates.title || 'Updated Product',
          handle: 'updated-product',
          status: 'active',
          created_at: '2024-01-15T10:00:00Z',
          updated_at: new Date().toISOString(),
          variants: updates.variants || [],
          images: updates.images || []
        });
      }, 1000);
    });
  },

  // Create product in Shopify
  createProduct: async (accessToken: string, product: Omit<ShopifyProduct, 'id' | 'created_at' | 'updated_at'>): Promise<ShopifyProduct> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...product,
          id: 'prod_' + Date.now(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      }, 1500);
    });
  },

  // Delete product from Shopify
  deleteProduct: async (accessToken: string, productId: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
};

// Mock TCGPlayer API integration
export interface TCGPlayerPrice {
  productId: string;
  marketPrice: number;
  lowPrice: number;
  midPrice: number;
  highPrice: number;
  currency: 'USD';
  lastUpdated: string;
}

export const tcgPlayerApi = {
  // Get current market price for a product
  getPrice: async (productName: string, set?: string): Promise<TCGPlayerPrice | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock price data
        const mockPrices: Record<string, TCGPlayerPrice> = {
          'Pokemon Booster Pack - Paldea Evolved': {
            productId: 'tcg_001',
            marketPrice: 4.99,
            lowPrice: 4.50,
            midPrice: 4.99,
            highPrice: 5.49,
            currency: 'USD',
            lastUpdated: new Date().toISOString()
          },
          'Magic: The Gathering - Commander Deck': {
            productId: 'tcg_002',
            marketPrice: 24.99,
            lowPrice: 22.99,
            midPrice: 24.99,
            highPrice: 27.99,
            currency: 'USD',
            lastUpdated: new Date().toISOString()
          }
        };

        resolve(mockPrices[productName] || null);
      }, 1500);
    });
  },

  // Get bulk prices for multiple products
  getBulkPrices: async (productNames: string[]): Promise<TCGPlayerPrice[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const prices = productNames.map((name, index) => ({
          productId: `tcg_${index + 1}`,
          marketPrice: Math.random() * 50 + 5,
          lowPrice: Math.random() * 45 + 4,
          midPrice: Math.random() * 48 + 4.5,
          highPrice: Math.random() * 55 + 6,
          currency: 'USD' as const,
          lastUpdated: new Date().toISOString()
        }));
        resolve(prices);
      }, 2000);
    });
  }
};

// Currency conversion utility
export const currencyApi = {
  // Get current USD to ZAR exchange rate
  getExchangeRate: async (from: string = 'USD', to: string = 'ZAR'): Promise<number> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock exchange rate (USD to ZAR)
        resolve(18.65 + Math.random() * 0.5 - 0.25); // Simulate rate fluctuation
      }, 1000);
    });
  },

  // Convert price with given rate
  convertPrice: (price: number, rate: number): number => {
    return Math.round(price * rate * 100) / 100;
  }
};