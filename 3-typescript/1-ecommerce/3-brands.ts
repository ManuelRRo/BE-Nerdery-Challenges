/**
 *  Challenge 4: Get Countries with Brands and Amount of Products
 *
 * Create a function that takes an array of brands and products, and returns the countries with the amount of products available in each country.
 *
 * Requirements:
 * - The function should accept an array of Brand objects and an array of Product objects.
 * - Each brand should have a country property.
 * - Each product should have a brandId property that corresponds to the id of a brand.
 * - The function should return an array of objects, each containing a country and the amount of products available in that country.
 * - The amount of products should be calculated by counting the number of products that have a brandId matching the id of a brand in the same country.
 * - The return should be a type that allow us to define the country name as a key and the amount of products as a value.
 */

import { Brand, Product } from "./1-types";

export async function getCountriesWithBrandsAndProductCount(
  brands: Brand[],
  products: Product[],
): Promise<Record<string, number>> {

  const countryProductCountRecord: Record<string, number> = {};

  const brandIdToCountry = new Map(

    brands.map((brand) => {

      const parts = brand.headquarters.split(",").map(part => part.trim());

      const country = parts[1];

      return [Number(brand.id), country] as [typeof brand.id , typeof country];
    })
  );

  products.forEach((product) => {
    const country = brandIdToCountry.get(product.brandId);

    if (country) {

      if (!countryProductCountRecord[country]) {
        countryProductCountRecord[country] = 0;
      }

      countryProductCountRecord[country]++;
    }
  });

  return countryProductCountRecord;
}
