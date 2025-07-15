import { useParams } from "react-router-dom";
import { ProductCard, useProduct } from "..";
import { useEffect } from "react";

export const ProductById = () => {
  const { id } = useParams();

  const { product, isLoading } = useProduct({ id: +id! });
  //este efecto solo sirve para poder enviar la pantalla hacia arriba cuando se monta el componente
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Producto:</h1>
      {isLoading && <p>"Cargando..."</p>}

      {product && <ProductCard product={product} fullDescription={true} />}
    </div>
  );
};
