import "./NoSpecificProductsFound.css";
import { productsRoutePath } from "../../../Constants/PathConstants";

export const NoSpecificProductsFound = ({
  changeCurrentPage,
  changeSearchValue,
  changeIsKeyPress,
}) => {
  return (
    <p className="noSpecificProductsFound">
      Sorry, no product was found for your match.{" "}
      <span
        to={productsRoutePath}
        onClick={() => {
          changeCurrentPage(1);
          changeSearchValue("");
          changeIsKeyPress((state) => !state);
        }}
      >
        Click here
      </span>{" "}
      to see the available products.
    </p>
  );
};
