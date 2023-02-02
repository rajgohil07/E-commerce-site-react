import { Loader } from "../Loader/Loader";
import { useSelector } from "react-redux";
import "./RouterComponent.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "../Home/Home";
import { Products } from "../Products/Products";
import { Product } from "../Product/Product";
import { MyCart } from "../MyCart/MyCart";
import {
  homeRoutePath,
  myCartRoutePath,
  productRoutePath,
  productsRoutePath,
} from "../../Constants/PathConstants";

export const RouterComponent = () => {
  const isLoader = useSelector((state) => state.products.isLoading);

  return (
    <div className="routerComponent">
      {isLoader && <Loader />}
      <div>
        <Routes>
          <Route path={homeRoutePath} element={<Home />} />
          <Route path={productsRoutePath} element={<Products />} />
          <Route path={productRoutePath} element={<Product />} />
          <Route path={myCartRoutePath} element={<MyCart />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
};
