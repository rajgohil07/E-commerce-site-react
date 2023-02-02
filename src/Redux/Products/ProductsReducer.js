import { productsActions } from "./ProductsActionTypes";

const initialState = {
  isLoading: true,
  productsData: [],
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case productsActions.GET_PRODUCTS_LISTINGS: {
      return {
        ...state,
        productsData: action.data,
      };
    }
    case productsActions.SET_LOADER_FALSE: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case productsActions.SET_LOADER_TRUE: {
      return {
        ...state,
        isLoading: true,
      };
    }
    default: {
      return state;
    }
  }
};
