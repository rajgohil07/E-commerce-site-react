import axios from "axios";
import { productsActions } from "./ProductsActionTypes";

export const fetchProducts = (limit = 10, currentPage = 1) => {
  return async (dispatch) => {
    const config = {
      method: "get",
      url: "/products",
      baseURL: "https://dummyjson.com/",
      params: {
        limit,
        skip: (currentPage - 1) * limit,
        select:
          "id,title,description,price,rating,stock,brand,category,thumbnail,images",
      },
    };
    const { data } = await axios(config);
    console.log("data :>> ", data);
    dispatch({ type: productsActions.GET_PRODUCTS_LISTINGS, data });
    dispatch({ type: productsActions.SET_LOADER_FALSE });
  };
};
