import { Alert, Snackbar } from "@mui/material";
import "./SnackBar.css";

export const SnackBar = ({
  isOpen,
  handleClose,
  message,
  isSuccess = true,
}) => {
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={isOpen}
        autoHideDuration={7000}
        onClose={() => handleClose(false)}
        sx={{ color: "white", backgroundColor: "green" }}
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
