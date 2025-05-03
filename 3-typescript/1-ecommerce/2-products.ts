/**
 * Products - Challenge 1: Product Price Analysis
 *
 * Create a function that analyzes pricing information from an array of products.
 *
 * Requirements:
 * - Create a function called `analyzeProductPrices` that accepts an array of Product objects
 * - The function should return an object containing:
 *   - totalPrice: The sum of all product prices
 *   - averagePrice: The average price of all products (rounded to 2 decimal places)
 *   - mostExpensiveProduct: The complete Product object with the highest price
 *   - cheapestProduct: The complete Product object with the lowest price
 *   - onSaleCount: The number of products that are currently on sale
 *   - averageDiscount: The average discount percentage for products on sale (rounded to 2 decimal places)
 * - Prices should be manage in regular prices and not in sale prices
 * - Use proper TypeScript typing for parameters and return values
 * - Implement the function using efficient array methods
 *
 *
 **/

import { Product, Brand, EnrichedProduct, BrandInfo, productPick, analyzedProducts } from "./1-types";

export async function analyzeProductPrices(products: Product[]): Promise<analyzedProducts> {

  

if (products.length === 0) {
    throw new Error("Product list cannot be empty")
  }
  const onSaleProducts = products.filter(p => p.onSale);

  let mostExpensiveProduct = products[0];

  let cheapestProduct: productPick = products[0];

  const totalPrice = products.reduce((total, product) => total + product.price, 0);

  const averagePrice = parseFloat((totalPrice / products.length).toFixed(2)); // 2 decimal

  for (const product of products) {
    if (product.price > mostExpensiveProduct.price) {
      mostExpensiveProduct = product;
    }
    if (product.price < cheapestProduct.price) {
      cheapestProduct = product;
    }
  }

  const onSaleCount = onSaleProducts.length;

  let averageDiscount: number = 0;

  if (onSaleCount > 0) {
    averageDiscount = onSaleProducts.reduce((sum, onSaleProduct) => (onSaleProduct.price-onSaleProduct.salePrice),0) / onSaleProducts.length;

  }
  const Analysis: analyzedProducts = {
    
    totalPrice, averagePrice, mostExpensiveProduct, cheapestProduct, onSaleCount, averageDiscount
  }
  return Analysis; 
}

/**
 *  Challenge 2: Build a Product Catalog with Brand Metadata
 *
 * Create a function that takes arrays of Product and Brand, and returns a new array of enriched product entries. Each entry should include brand details embedded into the product, under a new brandInfo property (excluding the id and isActive fields).
 *  e.g
 *  buildProductCatalog(products: Product[], brands: Brand[]): EnrichedProduct[]

  Requirements:
  - it should return an array of enriched product entries with brand details
  - Only include products where isActive is true and their corresponding brand is also active.
  - If a product’s brandId does not match any active brand, it should be excluded.
  - The brandInfo field should include the rest of the brand metadata (name, logo, description, etc.).
 */

async function buildProductCatalog(
  products: Product[],
  brands: Brand[],
): Promise<EnrichedProduct[]> {

  const EnrichedProducts: EnrichedProduct[] = [];

  const activeBrands = brands.filter((brand) => brand.isActive);

  const activeProducts = products.filter((product) => product.isActive);

  activeProducts.forEach(product => {
    const brand = activeBrands.find(brand => brand.id === product.brandId)
    if (brand) {
      const enrichedProduct: EnrichedProduct = {
        ...product,
        brandInfo : brand
      };
      EnrichedProducts.push(enrichedProduct);
    }
  });

  return EnrichedProducts;

}

/**
 * Challenge 3: One image per product
 *
 * Create a function that takes an array of products and returns a new array of products, each with only one image.
 *
 * Requirements:
 * - The function should accept an array of Product objects.
 * - Each product should have only one image in the images array.
 * - The image should be the first one in the images array.
 * - If a product has no images, it should be excluded from the result.
 * - The function should return an array of Product objects with the modified images array.
 * - Use proper TypeScript typing for parameters and return values.
 */

async function filterProductsWithOneImage(
  products: Product[],
): Promise<Product[]> {
  // Implement the function logic here

  const filteredProducts = products.filter(product => product.images.length > 0).map((product) => {
    
    return {
        ... product,
        images: [product.images[0]]

    };

  });

  return filteredProducts;
}
