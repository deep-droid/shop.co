import productsJson from "./products.json";

export interface ProductColor {
  name: string;
  value: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  gender: "Men" | "Women";
  price: number;
  oldPrice: number | null;
  discount: number | null;
  rating: number;
  reviewCount: number;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  description: string;
  tags: string[];
}

export const products = productsJson as Product[];