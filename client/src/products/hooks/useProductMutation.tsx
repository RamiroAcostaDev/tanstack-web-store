import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product, productActions } from "..";

export const useProductMutation = () => {
  const queryClient = useQueryClient();

  //Mutación con Optimistic Update
  const mutation = useMutation({
    mutationFn: productActions.createProduct,

    onMutate: (product) => {
      console.log("Mutación - Optimistic update");

      //1.- Crear un Optimistic Product
      const optimisticProduct = { id: Math.random(), ...product };
      console.log(optimisticProduct);

      //2.- Almacenar el producto en el cache del queryClient
      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: product.category }],
        (old) => {
          if (!old) return [optimisticProduct];
          return [...old, optimisticProduct];
        }
      );

      return { optimisticProduct };
    },

    onSuccess: (product, _variables, context) => {
      console.log({ product, _variables, context });

      //1.- Ejemplo de invalidacion de query, para que vuelva a hacer la peticion en la pagina respectiva y agregue los nuevos productos automaticamente (sin refrescar la pagina)
      //   queryClient.invalidateQueries({
      //     queryKey: ["products", { filterKey: data.category }],
      //   });
      //2.- Ejemplo agregando el nuevo producto al queryClient directamente

      //Elimina el query optimista una vez que se recibe la respuesta de backend
      queryClient.removeQueries({
        queryKey: ["product", context?.optimisticProduct.id],
      });

      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: product.category }],
        (old) => {
          if (!old) return [product];

          return old.map((cacheProduct) => {
            return cacheProduct.id === context?.optimisticProduct.id
              ? product
              : cacheProduct;
          });
        }
      );
    },

    onError: (error, variables, context) => {
      console.log(error, variables, context);

      queryClient.removeQueries({
        queryKey: ["product", context?.optimisticProduct.id],
      });

      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: variables.category }],
        (old) => {
          if (!old) return [];

          return old.filter((cacheProduct) => {
            return cacheProduct.id !== context?.optimisticProduct.id;
          });
        }
      );
    },
  });
  return mutation;
};
