import { useEffect } from "react";
import { fetchProducts } from "../../Redux/Products/ProductsThankMiddleware";

export const Products = () => {
  useEffect(() => {
    fetchProducts();
  }, []);

  return <div>Products</div>;
};
