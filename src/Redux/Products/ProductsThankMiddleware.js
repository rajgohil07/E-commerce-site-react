import axios from "axios";
import { productsActions } from "./ProductsActionTypes";

export const fetchProducts = () => {
  return async (dispatch) => {
    const config = {
      method: "get",
      url: "/products",
      baseURL: "https://dummyjson.com/",
      params: {
        limit: 10,
        skip: 0,
        select: "id,title,description,price,rating,stock,brand,category",
      },
    };
    const {
      data: { products },
    } = axios(config);
    dispatch({ type: productsActions.GET_PRODUCTS_LISTINGS, data: products });
    dispatch({ type: productsActions.SET_LOADER_FALSE });
  };
};
