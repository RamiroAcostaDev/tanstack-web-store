import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product, productActions } from "..";

export const useProductMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: productActions.createProduct,
    onSuccess: (product) => {
      //ejemplo de invalidacion de query, para que vuelva a hacer la peticion en la pagina respectiva y agregue los nuevos productos automaticamente (sin refrescar la pagina)
      //   queryClient.invalidateQueries({
      //     queryKey: ["products", { filterKey: data.category }],
      //   });
      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: product.category }],
        (old) => {
          if (!old) return [product];
          return [...old, product];
        }
      );
    },
  });
  return mutation;
};
