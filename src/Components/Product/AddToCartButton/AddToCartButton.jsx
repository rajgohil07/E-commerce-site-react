import "./AddToCartButton.css";
import { useDispatch, useSelector } from "react-redux";
import { BsFillCartFill } from "react-icons/bs";
import { alterTheValueOfMyCart } from "../../../Redux/MyCart/MyCartThunkMiddleware";
import { OrderLimitTooltip } from "../../OrderLimitTooltip/OrderLimitTooltip";
import { Box } from "@mui/material";
import { handleSnackbar } from "../../../Redux/AdditionalUtilities/AdditionalUtilitiesMiddleware";
import {
  myCartActionTypes,
  myCartProductActionType,
} from "../../../Redux/MyCart/MyCartActionTypes";

export const AddToCartButton = ({ buttonName, productData }) => {
  // Redux dispatch and selector hooks
  const dispatch = useDispatch();
  const width = useSelector((state) => state.utilities.width);
  const cartState = useSelector((state) => state.myCart.myProductsData);

  const findProduct = cartState.find((data) => {
    return data.productInfo.id === productData.id;
  });
  const isButtonDisabled = Number(findProduct?.quantity) >= 3;

  const handleAddToCartEvent = () => {
    if (!isButtonDisabled) {
      const snackMessage = `${productData.title} has been added to your cart!`;
      dispatch(
        alterTheValueOfMyCart(
          productData,
          myCartProductActionType.ADD,
          cartState,
          myCartActionTypes.ALTER_PRODUCT_TO_MY_CART
        )
      );
      // Calling an dispatch method of redux to display the snackbar
      dispatch(handleSnackbar(snackMessage, true));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: "0.5rem",
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
