import "./SnackBar.css";
import { Alert, Snackbar } from "@mui/material";
import { useSelector } from "react-redux";
import Slide from "@mui/material/Slide";

export const SnackBar = ({
  isOpen,
  handleClose,
  message,
  isSuccess = true,
}) => {
  const width = useSelector((state) => state.utilities.width);
  const key = new Date().getTime();

  return (
    <div>
      <Snackbar
        key={key}
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
        TransitionComponent={(props) => {
          console.log("props", props);
          return <Slide {...props} direction="down" />;
        }}
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
