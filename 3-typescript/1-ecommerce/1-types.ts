/**
 * Challenge 1: Type Definitions for Product Catalog
 *
 * You need to define proper TypeScript types for the product catalog data.
 * These types should accurately represent the structure of the JSON data and establish
 * the relationships between different entities (e.g., products and brands).
 *
 * The JSON data is provided in the `data` folder.
 *
 * Consider:
 * - Handle all of the properties in the JSON data as accurately as possible in typescript types
 * - Use appropriate types for each property (e.g., string, number, boolean, etc.)
 * - Optional properties and mandatory properties
 * - The use of union types for properties that can have multiple types
 * - The use of enums for properties that can have a limited set of values
 * - The use of interfaces and type aliases to create a clear and maintainable structure
 */


type ArrayType<T> = T[];

// PRODUCTS JSON

//! Add necessary type definitions for the products json file
type Image = {
    id : number;
    url: string;
    alt: string;
    isMain: boolean;
};

type  Specifications = {
    material: string;
    weight: string;
    cushioning: string;
    closure: string;
    archSupport: string;
};

export type  Product  =  {
    id: number;
    name: string;
    departmentId: number;
    categoryId: number;
    brandId: number;
    linkId: string;
    refId: string;
    isVisible: boolean;
    description: string;
    descriptionShort: string;
    releaseDate: string;
    keywords: string;
    title: string;
    isActive: boolean;
    taxCode: string;
    metaTagDescription: string;
    supplierId: number;
    showWithoutStock: boolean;
    asWordsRemarketingCode: string;
    lomadeeCampaingCode: string;
    score: number;
    price: number;
    salePrice: number;
    onSale: boolean;
    colors: ArrayType<string>;//check how to put Array<T>
    sizes: ArrayType<number>;
    tags: ArrayType<string>;
    images: ArrayType<Image>;
    specifications: Specifications;
}


// CATEGORIES JSON

//! Add necessary type definitions for the brands json file
interface Filter {
    name:string;
    values: ArrayType<string>;
}

interface Category {
    id:number;
    name: string;
    departmentId: number;
    description:string;
    keywords: string;
    isActive: boolean;
    iconUrl: string;
    bannerUrl: string;
    displayOrder: number;
    metaDescription :string;
    filters :Filter;
}


// BRANDS JSON

//! Add necessary type definitions for the brands json file
interface SocialMedia {
    instagram: string;
    twitter: string;
    facebook: string;
}

export type Brand = {
    id:number | string;
    name:string;
    logo: string;
    description: string;
    foundedYear: number;
    website: string;
    isActive: boolean;
    headquarters: string;
    signature: string;
    socialMedia: SocialMedia;
    country: string; 

}

export type BrandInfo = Omit<Brand,"id" | "isActive">;


export type EnrichedProduct = Product & {
    brandInfo: BrandInfo
}


// DEPARTMENTS JSON
//! Add necessary type definitions for the departments json file
export type Department = {
    id:number;
    name:string;
    description: string;
    isActive: boolean;
    displayOrder: number;
    iconUrl: string;
    bannerUrl: string;
    metaDescription: string;
    featuredCategories: number[];
    slug: string;
}

export type DepartmentProductInfo = {
    id: number;
    name: string;
    productCount: number;
    productsNames: string[];
  };
  
