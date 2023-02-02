import { NavLink } from "react-router-dom";
import "./Navbar.css";
import {
  myCartRoutePath,
  productsRoutePath,
} from "../../Constants/PathConstants";

export const Navbar = () => {
  return (
    <div className="navbarWrapper">
      <NavLink to={productsRoutePath}>
        <h3>Products</h3>
      </NavLink>
      <NavLink to={myCartRoutePath}>
        <h3>My Cart</h3>
      </NavLink>
    </div>
  );
};
