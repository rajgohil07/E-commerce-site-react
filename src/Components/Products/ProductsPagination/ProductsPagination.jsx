import Pagination from "@mui/material/Pagination";
import { useSelector } from "react-redux";

export const ProductsPagination = ({
  totalPages,
  currentPage,
  changeCurrentPage,
}) => {
  const width = useSelector((state) => state.utilities.width);
  const handleChange = (_e, value) => {
    changeCurrentPage(value);
  };

  return (
    <Pagination
      count={isNaN(totalPages) ? 10 : totalPages}
      page={currentPage}
      onChange={handleChange}
      size={width > 500 ? "large" : "medium"}
      sx={{
        marginTop: width > 500 ? "0" : "20px",
      }}
    />
  );
};
