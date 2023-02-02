import { Grid } from "@mui/material";
import "./MyCartProductList.css";
import { useDispatch, useSelector } from "react-redux";
import { alterTheValueOfMyCart } from "../../../Redux/MyCart/MyCartThunkMiddleware";
import {
  myCartActionTypes,
  myCartProductActionType,
} from "../../../Redux/MyCart/MyCartActionTypes";

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
        data,
        myCartProductActionType.ADD,
        cartState,
        myCartActionTypes.ALTER_PRODUCT_TO_MY_CART
      )
    );
  };

  return (
    <>
      <Grid item xs={3} md={4}>
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
          </div>
        </div>
      </Grid>
      <Grid item xs={9} md={8}>
        Raj
      </Grid>
    </>
  );
};
