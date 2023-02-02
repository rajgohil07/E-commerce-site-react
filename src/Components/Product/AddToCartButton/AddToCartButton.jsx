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
import { additionalUtilitiesActionType } from "../../../Redux/AdditionalUtilities/AdditionalUtilitiesActionTypes";

export const AddToCartButton = ({ buttonName, productData }) => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.myCart.myProductsData);
  const findProduct = cartState.find((data) => {
    return data.productInfo.id === productData.id;
  });
  const isButtonDisabled = Number(findProduct?.quantity) >= 3;
  const width = useSelector((state) => state.utilities.width);

  const handleAddToCartEvent = () => {
    if (!isButtonDisabled) {
      dispatch(
        alterTheValueOfMyCart(
          productData,
          myCartProductActionType.ADD,
          cartState,
          myCartActionTypes.ALTER_PRODUCT_TO_MY_CART
        )
      );
      dispatch({
        type: additionalUtilitiesActionType.SET_MESSAGE_TO_SNACKBAR,
        snackBarMessage: `${productData.title} has been added to your cart!`,
        snackBarTypeSuccess: true,
      });
    }
  };

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
      <OrderLimitTooltip
        placement={width > 700 ? "right" : "bottom"}
        title="Due to high demand, you cannot add more than 3 quantities of this product."
      />
    </Box>
  );
};
