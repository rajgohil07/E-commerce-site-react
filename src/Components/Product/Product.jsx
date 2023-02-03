import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { productsActions } from "../../Redux/Products/ProductsActionTypes";
import { Alert, Box, Rating } from "@mui/material";
import { Loader } from "../Loader/Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { BsInfoCircle } from "react-icons/bs";
import { BootstrapTooltip } from "../BootstrapTooltip/BootstrapTooltip";
import { ProductPriceQuestionMark } from "./ProductPriceQuestionMark/ProductPriceQuestionMark";
import { AddToCartButton } from "./AddToCartButton/AddToCartButton";

// CSS imports
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Product.css";

export const Product = () => {
  // React router dom hooks
  const navigate = useNavigate();
  const { productId } = useParams();

  // Redux dispatch and selector hooks
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.products.isLoading);

  // React use state hooks
  const [fetchError, updateError] = useState(false);
  const [productData, updateProductData] = useState({
    images: [],
    rating: 0,
    discountPercentage: 0,
  });

  const fetchSingleProduct = async () => {
    dispatch({ type: productsActions.SET_LOADER_TRUE });
    setTimeout(async () => {
      // Ref: https://axios-http.com/docs/req_config
      const config = {
        method: "get",
        url: `/products/${productId}`,
        baseURL: "https://dummyjson.com/",
      };
      try {
        const { data } = await axios(config);
        updateProductData(data);
        dispatch({ type: productsActions.SET_LOADER_FALSE });
        return data;
      } catch (error) {
        console.error(`Unable to find product by id:${productId}`, error);
        updateError(true);
        return dispatch({ type: productsActions.SET_LOADER_FALSE });
      }
    }, 1100);
  };

  // React useEffect hook
  useEffect(() => {
    fetchSingleProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Error Boundaries  */}
      <div className="productWrapper">
        {isLoading && <Loader />}
        {fetchError && (
          <Alert
            onClick={() => navigate(-1)}
            sx={{ margin: "2rem 0rem", cursor: "pointer" }}
            severity={"error"}
          >
            Sorry, we are unable to find the product you are looking for. Click
            here to go back where you left.
          </Alert>
        )}
      </div>

      {!fetchError && !isLoading && (
        <div className="mainProductParentWrapper">
          {/* Swipper integration  */}
          <div className="swipperWrapper">
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
            >
              {productData.images.map((data) => (
                <SwiperSlide key={data}>
                  <img src={data} alt="" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Product details  */}
          <div className="productWrapper">
            <Box className="productDetails">
              <h1>{productData.title}</h1>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Rating
                  name="read-only"
                  precision={0.1}
                  size="normal"
                  value={productData.rating}
                  readOnly
                />
                <span>
                  <p className="ratingParagraph">
                    ({productData.rating} ratings)
                  </p>
                </span>
              </Box>

              {/* Product price  */}
              <Box sx={{ display: "flex", alignItems: "baseline" }}>
                <h3> ${productData.price}</h3>
                <span className="productPrice">
                  $
                  {`${(
                    (productData.price *
                      (100 + productData.discountPercentage)) /
                    100
                  ).toFixed(0)}`}
                </span>
                <span className="pricePercentageOff">
                  ({productData.discountPercentage}% off)
                </span>

                {/* Bootstrap Tool tip */}
                <BootstrapTooltip
                  title={
                    <ProductPriceQuestionMark
                      price={productData.price}
                      discountPercentage={productData.discountPercentage}
                    />
                  }
                  placement="top"
                  arrow
                >
                  <div>
                    <BsInfoCircle className="questionMarkIcon" />
                  </div>
                </BootstrapTooltip>
              </Box>

              {/* Add to cart button  */}
              <AddToCartButton
                buttonName={"add to cart"}
                productData={productData}
              />

              {/* Additional info table  */}
              <table border={0} className="productTable">
                <thead>
                  <tr>
                    <td colSpan={2} className="additionalInfo">
                      Product Additional Info <hr />
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="productInfoTitle">Product Brand</td>
                    <td>{productData.brand || ""}</td>
                  </tr>
                  <tr>
                    <td className="productInfoTitle">Product Description</td>
                    <td>{productData.description || ""}</td>
                  </tr>
                  <tr>
                    <td className="productInfoTitle">Product Category</td>
                    <td>{productData.category || ""}</td>
                  </tr>
                  <tr>
                    <td className="productInfoTitle">Available Stock</td>
                    <td>{productData.stock || ""}</td>
                  </tr>
                </tbody>
              </table>
            </Box>
          </div>
        </div>
      )}
    </>
  );
};
