import { productsApi, type Product } from "..";

interface getProductsOptions {
  filterKey?: string;
}

export const getProducts = async ({ filterKey }: getProductsOptions) => {
  const { data } = await productsApi.get<Product[]>("/products");
  return data;
};
