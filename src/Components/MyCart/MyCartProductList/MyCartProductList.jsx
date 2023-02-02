import { Box, Grid } from "@mui/material";
import "./MyCartProductList.css";
import { useDispatch, useSelector } from "react-redux";
import { alterTheValueOfMyCart } from "../../../Redux/MyCart/MyCartThunkMiddleware";
import { AiFillStar } from "react-icons/ai";
import {
  myCartActionTypes,
  myCartProductActionType,
} from "../../../Redux/MyCart/MyCartActionTypes";
import { OrderLimitTooltip } from "../../OrderLimitTooltip/OrderLimitTooltip";

export const MyCartProductList = ({ data }) => {
  const dispatch = useDispatch();

  const cartState = useSelector((state) => state.myCart.myProductsData);

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

  return (
    <>
      <Grid item xs={12} md={4}>
        <div className="leftPart">
          <div className="leftImagePart">
            <img
              src={data.productInfo.thumbnail}
              alt={`Thumbnail of ${data.productInfo.title}`}
            />
          </div>
          <div className="quantity">
            <button
              disabled={data.quantity === 0}
              className="quantityButton quantityButtonMinus"
              onClick={() => handleDecrementQty()}
            >
              -
            </button>
            <h3>Qty: {data.quantity}</h3>
            <button
              disabled={data.quantity >= 3}
              className="quantityButton quantityButtonPlus"
              onClick={() => handleIncrementQty()}
            >
              +
            </button>
            <OrderLimitTooltip title="Due to high demand, you cannot add more than 3 quantities of this product." />
          </div>
        </div>
      </Grid>
      <Grid item xs={12} md={8}>
        <div className="rightPart">
          <h3>{data.productInfo.title}</h3>
          <p>{data.productInfo.description}.</p>
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
          <div className="pricer">
            <span className="originalAmount">
              $
              {(
                ((data.productInfo.price *
                  (100 + data.productInfo.discountPercentage)) /
                  100 || 0) * Number(data.quantity || 1)
              ).toFixed(0)}
            </span>
            <span className="discountedAmount">
              $
              {(
                (data.productInfo.price || 0) * Number(data.quantity || 1)
              ).toFixed(0)}
            </span>
            <span className="discountPercentage">
              {data.productInfo.discountPercentage}% off
            </span>
          </div>
        </div>
      </Grid>
    </>
  );
};
