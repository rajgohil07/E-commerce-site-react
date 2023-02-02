import { useEffect } from "react";
import { fetchProducts } from "../../Redux/Products/ProductsThankMiddleware";
import { useDispatch, useSelector } from "react-redux";

export const Products = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchProducts());
    }, 1100);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const productsData = useSelector((state) => state.products.productsData);
  //   console.log("productsData", productsData);
  return (
    <div>
      <ol>
        {productsData.map((product) => {
          return <li key={product.id}>{product.title}</li>;
        })}
      </ol>
    </div>
  );
};
