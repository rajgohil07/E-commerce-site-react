import { combineReducers } from "redux";
import { productsReducer } from "./Products/ProductsReducer";
import { myCartReducer } from "./MyCart/MyCartReducer";

export const parentReducer = combineReducers({
  products: productsReducer,
  myCart: myCartReducer,
});
