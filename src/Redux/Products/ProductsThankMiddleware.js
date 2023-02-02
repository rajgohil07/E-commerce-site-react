import axios from "axios";
import { productsActions } from "./ProductsActionTypes";

export const fetchProducts = (
  limit = 10,
  currentPage = 1,
  searchValue = ""
) => {
  return async (dispatch) => {
    // Ref: https://axios-http.com/docs/req_config
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
    if (searchValue) {
      config.url = "/products/search";
      config.params.q = searchValue;
    }
    const { data } = await axios(config);
    dispatch({ type: productsActions.GET_PRODUCTS_LISTINGS, data });
    dispatch({ type: productsActions.SET_LOADER_FALSE });
  };
};
