import "./MyCart.css";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { MyCartProductList } from "./MyCartProductList/MyCartProductList";

export const MyCart = () => {
  const myCartArray = useSelector((state) => state.myCart.myProductsData);

  return (
    <div className="myCartWrapper">
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
    </div>
  );
};
