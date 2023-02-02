import { productsActions } from "./ProductsActionTypes";

const initialState = {
  isLoading: true,
  productsData: { products: [] },
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch the product list from https://dummyjson.com/
    case productsActions.GET_PRODUCTS_LISTINGS: {
      return {
        ...state,
        productsData: action.data,
      };
    }
    // Set the loader value to false
    case productsActions.SET_LOADER_FALSE: {
      return {
        ...state,
        isLoading: false,
      };
    }
    // Set the loader value to true
    case productsActions.SET_LOADER_TRUE: {
      return {
        ...state,
        isLoading: true,
      };
    }
    // If no any matching types found simply return the current state
    default: {
      return state;
    }
  }
};
