import { combineReducers } from "redux";
import { productsReducer } from "./Products/ProductsReducer";
import { myCartReducer } from "./MyCart/MyCartReducer";
import { additionalUtilitiesReducer } from "./AdditionalUtilities/AdditionalUtilitiesReducers";

export const parentReducer = combineReducers({
  products: productsReducer,
  myCart: myCartReducer,
  utilities: additionalUtilitiesReducer,
});
