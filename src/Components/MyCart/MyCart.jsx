import "./MyCart.css";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { MyCartProductList } from "./MyCartProductList/MyCartProductList";
import { ProductPriceQuestionMark } from "../Product/ProductPriceQuestionMark/ProductPriceQuestionMark";
import { BootstrapTooltip } from "../BootstrapTooltip/BootstrapTooltip";
import { BsInfoCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { productsActions } from "../../Redux/Products/ProductsActionTypes";
import { Loader } from "../Loader/Loader";
import {
  productsRoutePath,
  publicURLPath,
} from "../../Constants/PathConstants";

export const MyCart = () => {
  // React router dom hooks
  const navigate = useNavigate();

  // Redux dispatch and selector hooks
  const dispatch = useDispatch();
  const myCartArray = useSelector((state) => state.myCart.myProductsData);
  const width = useSelector((state) => state.utilities.width);
  const isLoading = useSelector((state) => state.products.isLoading);

  let totalMRPPrice = 0;
  let totalDiscountedPrice = 0;

  // React useEffect hook
  useEffect(() => {
    dispatch({ type: productsActions.SET_LOADER_TRUE });
    setTimeout(() => {
      dispatch({ type: productsActions.SET_LOADER_FALSE });
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  myCartArray.forEach((data) => {
    totalDiscountedPrice += (data.quantity || 1) * data.productInfo.price || 0;
    totalMRPPrice +=
      (data.quantity || 1) *
      ((data.productInfo.price * (100 + data.productInfo.discountPercentage)) /
        100 || 0);
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="myCartWrapper">
      {myCartArray?.length > 0 ? (
        <>
          <h3 className="myCartHeading">My Cart</h3>
          {myCartArray.map((data) => {
            return (
              <Grid
                key={data.productInfo.id}
                className="nestedMyCartWrapper"
                container
                flexDirection="row"
                rowSpacing={{ xs: 1, sm: 2, md: 3 }}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <MyCartProductList data={data} />
              </Grid>
            );
          })}
          {/* Price Summary Section */}
          <div className="priceSummaryAndIconMerger">
            <h3 className="myCartPriceSummary">Price Summary</h3>

            {/* Bootstrap Tool tip */}
            <BootstrapTooltip
              title={
                <ProductPriceQuestionMark
                  price={totalDiscountedPrice}
                  discountPercentage={
                    (totalMRPPrice * 100) / totalDiscountedPrice - 100
                  }
                  isCalculationRequired={false}
                  calculatedDiscountPrice={totalMRPPrice}
                />
              }
              placement={width > 700 ? "right" : "bottom"}
              arrow
            >
              <div>
                <BsInfoCircle className="questionMarkIcon" />
              </div>
            </BootstrapTooltip>
          </div>
          <Grid
            container
            flexDirection="row"
            rowSpacing={{ xs: 1, sm: 2, md: 3 }}
            alignContent="space-between"
          >
            <Grid className="priceSummaryHeading" item xs={6} sm={6}>
              Total MRP
            </Grid>
            <Grid className="priceSummaryRightFloater" item xs={6} sm={6}>
              <s> ${totalMRPPrice.toFixed(2)}</s>
            </Grid>
            <Grid className="priceSummaryHeading" item xs={6} sm={6}>
              Discounted Price
            </Grid>
            <Grid className="priceSummaryRightFloater" item xs={6} sm={6}>
              ${totalDiscountedPrice.toFixed(2)}
            </Grid>
            <Grid className="priceSummaryHeading underline" item xs={6} sm={6}>
              Total savings
            </Grid>
            <Grid
              className="priceSummaryTotalSaving underline"
              item
              xs={6}
              sm={6}
            >
              ${(totalMRPPrice - totalDiscountedPrice).toFixed(2)} (
              {((totalMRPPrice * 100) / totalDiscountedPrice - 100).toFixed(2)}
              %)
            </Grid>
          </Grid>
          <h3 className="myCartSavePrice">
            Overall, you will save $
            {(totalMRPPrice - totalDiscountedPrice).toFixed(2)} (
            {((totalMRPPrice * 100) / totalDiscountedPrice - 100).toFixed(2)}%)
            on those products!
          </h3>
        </>
      ) : (
        <div className="noCartProducts">
          <h3 className="myCartHeading">My Cart</h3>
          <div className="myCartOhSnap">
            <img src={`${publicURLPath}/ohSnap.webp`} alt="Oh Snap!" />
            <h2>
              <BootstrapTooltip
                title={`Click to show the available product`}
                placement="bottom"
                arrow
              >
                <span onClick={() => navigate(productsRoutePath)}>
                  Ah snap, its looks like you have not added any to cart yet!😢
                  Click here to show available products.
                </span>
              </BootstrapTooltip>
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};
