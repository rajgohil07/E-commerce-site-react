import "./ProductPriceQuestionMark.css";
import { Box } from "@mui/material";

export const ProductPriceQuestionMark = ({
  price = 0,
  discountPercentage = 0,
  isCalculationRequired = true,
  calculatedDiscountPrice = 0,
}) => {
  const originalPrice = price;
  let MRPPrice = calculatedDiscountPrice;
  if (isCalculationRequired) {
    MRPPrice = (price * (100 + discountPercentage)) / 100;
  }
  return (
    <div
      className="priceQuestionMarkChecker"
      sx={{ padding: 2, width: "15rem" }}
    >
      <span className="priceDetails">Price Details</span>
      <div className="liner"></div>
      <Box
        sx={{
          marginTop: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span className="preFixer">Maximum Retail Price:</span>
        <span className="preFixer cutMRPText">{`$${MRPPrice.toFixed(0)}`}</span>
      </Box>
      <Box
        sx={{
          marginTop: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span className="preFixer">Discounted Price:</span>
        <span className="preFixer">{`$${originalPrice}`}</span>
      </Box>
      <div className="liner"></div>
      <div className="preFixerSaverTextWrapper">
        <span className="preFixerSaverText">
          Overall, you will save{" "}
          <span>
            ${(MRPPrice - originalPrice).toFixed(0)} (
            {discountPercentage.toFixed(2)}%)
          </span>{" "}
          {isCalculationRequired ? "on this product!" : "on those products!"}
        </span>
      </div>
    </div>
  );
};
