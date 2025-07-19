import { productsApi, type Product, type ProductLike } from "..";

interface getProductsOptions {
  filterKey?: string;
}

//simula la demora en la respuesta de la api
export const sleep = (seconds: number): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

export const getProducts = async ({
  filterKey,
}: getProductsOptions): Promise<Product[]> => {
  // await sleep(2);

  const filterURL = filterKey ? `category=${filterKey}` : "";
  const { data } = await productsApi.get<Product[]>(`/products?${filterURL}`);
  return data;
};

export const getProductById = async (id: number): Promise<Product> => {
  // await sleep(2);

  const { data } = await productsApi.get<Product>(`/products/${id}`);
  return data;
};

export const createProduct = async (product: ProductLike) => {
  await sleep(5);

  throw new Error("Error creando un producto");

  const { data } = await productsApi.post<Product>(`/products`, product);
  return data;
};
