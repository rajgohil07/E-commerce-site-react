import "./AddToCartButton.css";
import { BsFillCartFill } from "react-icons/bs";

export const AddToCartButton = ({ buttonName, paddingSetterClassName }) => {
  return (
    <div className={`addToCartButtonWrapper ${paddingSetterClassName}`}>
      <BsFillCartFill />
      <span>{buttonName}</span>
    </div>
  );
};
