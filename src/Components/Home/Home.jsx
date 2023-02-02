import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { productsRoutePath } from "../../Constants/PathConstants";

export const Home = () => {
  const navigate = useNavigate();

  // React useEffect hook
  useEffect(() => {
    navigate(productsRoutePath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
