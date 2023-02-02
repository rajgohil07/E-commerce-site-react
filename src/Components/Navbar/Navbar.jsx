import { NavLink } from "react-router-dom";
import "./Navbar.css";
import {
  myCartRoutePath,
  productsRoutePath,
} from "../../Constants/PathConstants";
import { useSelector } from "react-redux";
import { Badge } from "@mui/material";

export const Navbar = () => {
  const myCartArray = useSelector((state) => state.myCart.myProductsData);

  // Array reduce method Ref: https://stackoverflow.com/a/6300596
  const count = myCartArray.reduce((acc, cartObj) => {
    return acc + cartObj.quantity;
  }, 0);

  return (
    <div className="navbarWrapper">
      <NavLink to={productsRoutePath}>
        <h3>Products</h3>
      </NavLink>
      <NavLink to={myCartRoutePath}>
        <Badge badgeContent={count} color="success">
          <h3 className="myCartBadge">My Cart</h3>
        </Badge>
      </NavLink>
    </div>
  );
};
