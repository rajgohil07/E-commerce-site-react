import Pagination from "@mui/material/Pagination";

export const ProductsPagination = ({
  totalPages,
  currentPage,
  changeCurrentPage,
  screenWidthRef,
}) => {
  const handleChange = (_e, value) => {
    changeCurrentPage(value);
  };
  return (
    <Pagination
      count={isNaN(totalPages) ? 10 : totalPages}
      page={currentPage}
      onChange={handleChange}
      size={screenWidthRef > 500 ? "large" : "small"}
      sx={{
        marginTop: screenWidthRef > 500 ? "0" : "20px",
      }}
    />
  );
};
