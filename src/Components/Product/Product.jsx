import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { productsActions } from "../../Redux/Products/ProductsActionTypes";
import { Alert } from "@mui/material";
import { Loader } from "../Loader/Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Product.css";

export const Product = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productId } = useParams();

  const [productData, updateProductData] = useState({
    images: [],
  });
  const [fetchError, updateError] = useState(false);

  const isLoading = useSelector((state) => state.products.isLoading);

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
        return data;
      } catch (error) {
        console.error(`Unable to find product by id:${productId}`, error);
        updateError(true);
      }
    }, 1100);
    dispatch({ type: productsActions.SET_LOADER_FALSE });
  };

  useEffect(() => {
    fetchSingleProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
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
      </div>
    </>
  );
};
