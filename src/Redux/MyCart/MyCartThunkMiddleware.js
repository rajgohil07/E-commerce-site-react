import {
  myCartActionTypes,
  myCartProductActionType,
} from "./MyCartActionTypes";

export const alterTheValueOfMyCart = (
  productDataObject,
  operationType,
  myCartData,
  myCartActionType
) => {
  return (dispatch) => {
    let cloneMyCartData = [...myCartData];
    if (myCartActionType === myCartActionTypes.ALTER_PRODUCT_TO_MY_CART) {
      // Add the product to my cart
      if (operationType === myCartProductActionType.ADD) {
        const isProductExist = cloneMyCartData.find(
          (cart) => cart?.productInfo.id === productDataObject.id
        );
        // if product already exist then increase the quantity
        if (isProductExist) {
          cloneMyCartData.forEach((data) => {
            if (data.productInfo.id === productDataObject.id) {
              data.quantity = data.quantity + 1;
            }
          });
        }
        // if product does not exist then push to the my cart redux using dispatch method
        else {
          cloneMyCartData.push({
            quantity: 1,
            productInfo: productDataObject,
          });
        }
      }
      // Remove the quantity of product in cart
      else if (operationType === myCartProductActionType.SUBTRACT) {
        const product = cloneMyCartData.find(
          (cart) => cart.productInfo.id === productDataObject.id
        );
        if (product) {
          cloneMyCartData.forEach((data, index) => {
            if (data.productInfo.id === productDataObject.id) {
              if (data.quantity > 1) {
                data.quantity = data.quantity - 1;
              } else {
                // Ref: https://stackoverflow.com/a/5767357
                cloneMyCartData.splice(index, 1);
              }
            }
          });
        }
      }
    }
    // if (cloneMyCartData.filter((data) => data).length === 0) {
    //   cloneMyCartData = [];
    // }
    dispatch({ type: myCartActionType, data: cloneMyCartData });
  };
};
