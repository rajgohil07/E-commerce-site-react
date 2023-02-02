import { myCartActionTypes } from "./MyCartActionTypes";

const initialValue = {
  myProductsData: [],
};

export const myCartReducer = (state = initialValue, action) => {
  switch (action.type) {
    // Alter the product of my cart
    case myCartActionTypes.ALTER_PRODUCT_TO_MY_CART: {
      const stateClone = [...state];
      stateClone.push(action.data);
      return stateClone;
    }
    // If no any matching types found simply return the current state
    default: {
      return state;
    }
  }
};
