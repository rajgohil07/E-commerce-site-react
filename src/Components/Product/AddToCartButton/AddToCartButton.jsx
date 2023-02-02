import "./AddToCartButton.css";
import { useDispatch, useSelector } from "react-redux";
import { BsFillCartFill } from "react-icons/bs";
import { alterTheValueOfMyCart } from "../../../Redux/MyCart/MyCartThunkMiddleware";
import {
  myCartActionTypes,
  myCartProductActionType,
} from "../../../Redux/MyCart/MyCartActionTypes";

export const AddToCartButton = ({
  buttonName,
  paddingSetterClassName,
  productData,
}) => {
  const dispatch = useDispatch();

  const cartState = useSelector((state) => state.myCart.myProductsData);

  const handleAddToCartEvent = () => {
    return dispatch(
      alterTheValueOfMyCart(
        productData,
        myCartProductActionType.ADD,
        cartState,
        myCartActionTypes.ALTER_PRODUCT_TO_MY_CART
      )
    );
  };

  return (
    <div
      onClick={() => handleAddToCartEvent()}
      className={`addToCartButtonWrapper ${paddingSetterClassName}`}
    >
      <BsFillCartFill />
      <span>{buttonName}</span>
    </div>
  );
};
