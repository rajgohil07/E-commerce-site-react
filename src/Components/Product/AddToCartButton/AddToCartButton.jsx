import "./AddToCartButton.css";
import { useDispatch, useSelector } from "react-redux";
import { BsFillCartFill } from "react-icons/bs";
import { alterTheValueOfMyCart } from "../../../Redux/MyCart/MyCartThunkMiddleware";
import {
  myCartActionTypes,
  myCartProductActionType,
} from "../../../Redux/MyCart/MyCartActionTypes";
import { OrderLimitTooltip } from "../../OrderLimitTooltip/OrderLimitTooltip";
import { Box } from "@mui/material";

export const AddToCartButton = ({ buttonName, productData }) => {
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

  const findProduct = cartState.find(
    (data) => data.productInfo.id === productData.id
  );

  const isButtonDisabled = Number(findProduct?.quantity) >= 3;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: "1rem",
      }}
    >
      <div
        onClick={() => handleAddToCartEvent()}
        className={`addToCartButtonWrapper ${
          isButtonDisabled ? "disableAddToCartButton" : ""
        }`}
      >
        <BsFillCartFill />
        <span>{buttonName}</span>
      </div>
      <OrderLimitTooltip title="Due to high demand, you cannot add more than 3 quantities of this product." />
    </Box>
  );
};
