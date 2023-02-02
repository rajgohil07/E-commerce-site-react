import "./MyCartProductList.css";
import { Box, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { alterTheValueOfMyCart } from "../../../Redux/MyCart/MyCartThunkMiddleware";
import { AiFillStar } from "react-icons/ai";
import { OrderLimitTooltip } from "../../OrderLimitTooltip/OrderLimitTooltip";
import { useNavigate } from "react-router-dom";
import { publicURLPath } from "../../../Constants/PathConstants";
import { BootstrapTooltip } from "../../BootstrapTooltip/BootstrapTooltip";
import { handleSnackbar } from "../../../Redux/AdditionalUtilities/AdditionalUtilitiesMiddleware";
import {
  myCartActionTypes,
  myCartProductActionType,
} from "../../../Redux/MyCart/MyCartActionTypes";

export const MyCartProductList = ({ data }) => {
  // React router dom hooks
  const navigation = useNavigate();

  // Redux dispatch and selector hooks
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.myCart.myProductsData);
  const width = useSelector((state) => state.utilities.width);

  // Handle Decrement Quantity
  const handleDecrementQty = () => {
    return dispatch(
      alterTheValueOfMyCart(
        data.productInfo,
        myCartProductActionType.SUBTRACT,
        cartState,
        myCartActionTypes.ALTER_PRODUCT_TO_MY_CART
      )
    );
  };

  // Handle Increment Quantity
  const handleIncrementQty = () => {
    return dispatch(
      alterTheValueOfMyCart(
        data.productInfo,
        myCartProductActionType.ADD,
        cartState,
        myCartActionTypes.ALTER_PRODUCT_TO_MY_CART
      )
    );
  };

  // Creating the const obj to handle the snackbar messages
  const snackCaseMessageType = Object.freeze({
    ADD: "add",
    REMOVE: "remove",
  });

  // Show snack case message
  const handleSnackCaseMessage = (title, quantity, type) => {
    let snackBarMessage;
    if (type === snackCaseMessageType.ADD) {
      snackBarMessage = `Quantity of ${title} has been increased!`;
    } else {
      snackBarMessage = `Quantity of ${title} has been decreased!`;
      if (quantity === 1) {
        snackBarMessage = `${title} has been removed from your cart!`;
      }
    }
    // Calling an dispatch method of redux to display the snackbar
    dispatch(handleSnackbar(snackBarMessage, true));
  };

  return (
    <>
      <Grid item xs={12} md={4}>
        <div className="leftPart">
          <div className="leftImagePart">
            <BootstrapTooltip
              title={`Click to show the ${data.productInfo.title} product`}
              placement={width > 700 ? "top" : "bottom"}
              arrow
            >
              <img
                src={data.productInfo.thumbnail}
                alt={`Thumbnail of ${data.productInfo.title}`}
                onClick={() =>
                  navigation(`${publicURLPath}/product/${data.productInfo.id}`)
                }
              />
            </BootstrapTooltip>
          </div>
          <div className="quantity">
            <BootstrapTooltip
              title={`Click to remove ${data.productInfo.title} quantity`}
              placement="bottom"
              arrow
            >
              <span>
                <button
                  disabled={data.quantity === 0}
                  className="quantityButton quantityButtonMinus"
                  onClick={() => {
                    handleSnackCaseMessage(
                      data.productInfo.title,
                      data.quantity,
                      snackCaseMessageType.REMOVE
                    );
                    handleDecrementQty();
                  }}
                >
                  -
                </button>
              </span>
            </BootstrapTooltip>
            <h3>Qty: {data.quantity}</h3>
            <BootstrapTooltip
              title={`Click to add ${data.productInfo.title} quantity`}
              placement="bottom"
              arrow
            >
              <Box sx={{ width: "100%", height: "100%" }}>
                <button
                  disabled={data.quantity >= 3}
                  className="quantityButton quantityButtonPlus"
                  onClick={() => {
                    handleSnackCaseMessage(
                      data.productInfo.title,
                      data.quantity,
                      snackCaseMessageType.ADD
                    );
                    handleIncrementQty();
                  }}
                >
                  +
                </button>
              </Box>
            </BootstrapTooltip>
            <OrderLimitTooltip title="Due to high demand, you cannot add more than 3 quantities of this product." />
          </div>
        </div>
      </Grid>
      <Grid item xs={12} md={8}>
        <div className="rightPart">
          <BootstrapTooltip
            title={`Click to show the ${data.productInfo.title} product`}
            placement={width > 700 ? "right" : "bottom"}
            arrow
          >
            <h3
              className="myCartProductTitle"
              onClick={() =>
                navigation(`${publicURLPath}/product/${data.productInfo.id}`)
              }
            >
              {data.productInfo.title}
            </h3>
          </BootstrapTooltip>
          <p>{data.productInfo.description}.</p>
          <BootstrapTooltip
            title={`Rating of the ${data.productInfo.title} product`}
            placement="right"
            arrow
          >
            <div className="myCartRating">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span>{data.productInfo.rating}</span>
                <AiFillStar />
              </Box>
            </div>
          </BootstrapTooltip>
          <div className="pricer">
            <BootstrapTooltip
              title={`MRP of ${data.productInfo.title} product`}
              placement="bottom"
              arrow
            >
              <span className="originalAmount">
                $
                {(
                  ((data.productInfo.price *
                    (100 + data.productInfo.discountPercentage)) /
                    100 || 0) * Number(data.quantity || 1)
                ).toFixed(0)}
              </span>
            </BootstrapTooltip>
            <BootstrapTooltip
              title={`Discounted price of ${data.productInfo.title} product`}
              placement="bottom"
              arrow
            >
              <span className="discountedAmount">
                $
                {(
                  (data.productInfo.price || 0) * Number(data.quantity || 1)
                ).toFixed(0)}
              </span>
            </BootstrapTooltip>
            <BootstrapTooltip
              title={`Discounted percentage of ${data.productInfo.title} product`}
              placement="bottom"
              arrow
            >
              <span className="discountPercentage">
                {data.productInfo.discountPercentage}% off
              </span>
            </BootstrapTooltip>
          </div>
        </div>
      </Grid>
    </>
  );
};
