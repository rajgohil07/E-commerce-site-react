import "./Products.css";
import { useEffect, useRef, useState } from "react";
import { fetchProducts } from "../../Redux/Products/ProductsThankMiddleware";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Grid, TextField } from "@mui/material";
import { ProductDetailsCard } from "./ProductDetailsCard/ProductDetailsCard";
import { ProductsListLimit } from "./ProductsListLimit/ProductsListLimit";
import { ProductsPagination } from "./ProductsPagination/ProductsPagination";
import { Loader } from "../Loader/Loader";

export const Products = () => {
  const dispatch = useDispatch();

  const [width, setWidth] = useState(0);
  const [limit, changeLimit] = useState(10);
  const [currentPage, changeCurrentPage] = useState(1);
  const [searchValue, changeSearchValue] = useState("");

  const screenWidthRef = useRef(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setWidth(screenWidthRef.current.getBoundingClientRect().width);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchProducts(limit, currentPage, searchValue));
    }, 1100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, currentPage, searchValue]);

  useEffect(() => {
    changeCurrentPage(1);
  }, [searchValue]);

  const { products, total } = useSelector(
    (state) => state.products.productsData
  );

  const isLoading = useSelector((state) => state.products.isLoading);

  return (
    <div ref={screenWidthRef} className="productWrapper">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <TextField
            label="Search product"
            type="search"
            variant="outlined"
            fullWidth
            value={searchValue}
            onChange={(e) => changeSearchValue(e.target.value)}
            sx={{ marginTop: "2rem", marginBottom: "2rem" }}
          />
          <Alert
            sx={{ marginBottom: "2rem" }}
            severity={total > 0 ? "info" : "error"}
          >
            {total > 0
              ? `Total discovered ${total} products.`
              : `Sorry, no product was found for your match.`}
          </Alert>
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
                    id={product.id}
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
            mb={3}
            flexWrap={"nowrap"}
            sx={{ width: "100%" }}
          >
            {total > 0 && (
              <>
                <ProductsListLimit limit={limit} changeLimit={changeLimit} />
                <ProductsPagination
                  currentPage={currentPage}
                  changeCurrentPage={changeCurrentPage}
                  totalPages={Math.ceil(total / limit)}
                  screenWidthRef={width}
                />
              </>
            )}
          </Grid>
        </>
      )}
    </div>
  );
};
