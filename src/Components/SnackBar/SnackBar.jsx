import { Alert, Snackbar } from "@mui/material";
import "./SnackBar.css";
import { useSelector } from "react-redux";

export const SnackBar = ({
  isOpen,
  handleClose,
  message,
  isSuccess = true,
}) => {
  const width = useSelector((state) => state.utilities.width);

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={isOpen}
        autoHideDuration={7000}
        onClose={() => handleClose(false)}
        sx={{
          color: "white",
          backgroundColor: "green",
          marginTop: width > 700 ? "0px" : "60px",
        }}
        className={isSuccess ? "snackIconColorSuccess" : "snackIconColorError"}
      >
        <Alert
          onClose={() => handleClose(false)}
          severity={isSuccess ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};
