import { productsApi, type Product } from "..";

interface getProductsOptions {
  filterKey?: string;
}

const sleep = (seconds: number): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

export const getProducts = async ({
  filterKey,
}: getProductsOptions): Promise<Product[]> => {
  await sleep(2);

  const filterURL = filterKey ? `category=${filterKey}` : "";
  const { data } = await productsApi.get<Product[]>(`/products?${filterURL}`);
  return data;
};

export const getProductById = async (id: number): Promise<Product> => {
  await sleep(2);

  const { data } = await productsApi.get<Product>(`/products/${id}`);
  return data;
};
