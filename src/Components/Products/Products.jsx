import "./Products.css";
import { useEffect, useRef, useState } from "react";
import { fetchProducts } from "../../Redux/Products/ProductsThankMiddleware";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { ProductDetailsCard } from "./ProductDetailsCard/ProductDetailsCard";
import { ProductsListLimit } from "./ProductsListLimit/ProductsListLimit";
import { ProductsPagination } from "./ProductsPagination/ProductsPagination";

export const Products = () => {
  const dispatch = useDispatch();

  const [width, setWidth] = useState(0);
  const [limit, changeLimit] = useState(10);
  const [currentPage, changeCurrentPage] = useState(1);

  const screenWidthRef = useRef(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setWidth(screenWidthRef.current.getBoundingClientRect().width);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchProducts(limit, currentPage));
    }, 1100);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, currentPage]);

  const { products, total } = useSelector(
    (state) => state.products.productsData
  );

  return (
    <div ref={screenWidthRef} className="productWrapper">
      <Grid
        container
        rowSpacing={{ xs: 3, sm: 3, md: 3 }}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {products.map((product) => {
          return (
            <Grid key={product.id} item xs={12} sm={6} md={4}>
              <ProductDetailsCard
                title={product.title}
                description={product.description}
                rating={product.rating}
                price={product.price}
                thumbnail={product.thumbnail}
              />
            </Grid>
          );
        })}
      </Grid>
      <Grid
        container
        rowSpacing={3}
        direction={width > 500 ? "row" : "column"}
        justifyContent="space-between"
        alignItems="center"
        mt={5}
        flexWrap={"nowrap"}
        sx={{ width: "100%" }}
      >
        <ProductsListLimit limit={limit} changeLimit={changeLimit} />
        <ProductsPagination
          currentPage={currentPage}
          changeCurrentPage={changeCurrentPage}
          totalPages={Math.ceil(total / limit)}
          screenWidthRef={width}
        />
      </Grid>
    </div>
  );
};
