import { myCartActionTypes } from "./MyCartActionTypes";

const initialValue = {
  myProductsData: [],
};

export const myCartReducer = (state = initialValue, action) => {
  switch (action.type) {
    // Alter the product of my cart
    case myCartActionTypes.ALTER_PRODUCT_TO_MY_CART: {
      return { myProductsData: action.data };
    }
    // If no any matching types found simply return the current state
    default: {
      return state;
    }
  }
};
