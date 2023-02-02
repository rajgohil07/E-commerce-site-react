import "./MyCart.css";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { MyCartProductList } from "./MyCartProductList/MyCartProductList";
import { ProductPriceQuestionMark } from "../Product/ProductPriceQuestionMark/ProductPriceQuestionMark";
import { BootstrapTooltip } from "../BootstrapTooltip/BootstrapTooltip";
import { BsInfoCircle } from "react-icons/bs";

export const MyCart = () => {
  const myCartArray = useSelector((state) => state.myCart.myProductsData);

  let totalMRPPrice = 0;
  let totalDiscountedPrice = 0;

  myCartArray.forEach((data) => {
    totalDiscountedPrice += (data.quantity || 1) * data.productInfo.price || 0;
    totalMRPPrice +=
      (data.quantity || 1) *
      ((data.productInfo.price * (100 + data.productInfo.discountPercentage)) /
        100 || 0);
  });

  return (
    <div className="myCartWrapper">
      <h3 className="myCartHeading">My Cart</h3>
      {myCartArray.map((data) => {
        return (
          <Grid
            key={data.productInfo.id}
            className="myCartWrapper"
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
          placement="right"
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
        <Grid className="priceSummaryRightFloater" item sx={6} sm={6}>
          <s> ${totalMRPPrice.toFixed(2)}</s>
        </Grid>
        <Grid className="priceSummaryHeading" item xs={6} sm={6}>
          Discounted Price
        </Grid>
        <Grid className="priceSummaryRightFloater" item sx={6} sm={6}>
          ${totalDiscountedPrice.toFixed(2)}
        </Grid>
        <Grid className="priceSummaryHeading underline" item xs={6} sm={6}>
          Total savings
        </Grid>
        <Grid className="priceSummaryTotalSaving underline" item sx={6} sm={6}>
          ${(totalMRPPrice - totalDiscountedPrice).toFixed(2)} (
          {((totalMRPPrice * 100) / totalDiscountedPrice - 100).toFixed(2)}%)
        </Grid>
      </Grid>
      <h3 className="myCartSavePrice">
        Overall, you will save $
        {(totalMRPPrice - totalDiscountedPrice).toFixed(2)} (
        {((totalMRPPrice * 100) / totalDiscountedPrice - 100).toFixed(2)}%) on
        those products!
      </h3>
    </div>
  );
};
