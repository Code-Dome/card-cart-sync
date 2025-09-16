export enum ProductStatus {
    IN_STOCK = "In Stock",
    LOW_STOCK = "Low Stock",
    OUT_OF_STOCK = "Out of Stock"
}

export function parseStatus(value: string): ProductStatus
{
    switch(value) {
        case "In Stock":
            return ProductStatus.IN_STOCK
        case "Out of Stock":
            return ProductStatus.OUT_OF_STOCK
        case "Low Stock":
            return ProductStatus.LOW_STOCK
    }
}