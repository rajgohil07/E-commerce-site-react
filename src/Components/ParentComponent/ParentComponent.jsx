import "./ParentComponent.css";
import { Footer } from "../Footer/Footer";
import { Navbar } from "../Navbar/Navbar";
import { RouterComponent } from "../RouterComponent/RouterComponent";
import { useEffect, useRef } from "react";
import { additionalUtilitiesActionType } from "../../Redux/AdditionalUtilities/AdditionalUtilitiesActionTypes";
import { useDispatch, useSelector } from "react-redux";
import { SnackBar } from "../SnackBar/SnackBar";

export const ParentComponent = () => {
  const dispatch = useDispatch();
  const screenWidthRef = useRef(1300);
  const utilities = useSelector((state) => state.utilities);

  // React useEffect hook
  useEffect(() => {
    dispatch({
      type: additionalUtilitiesActionType.SET_WIDTH,
      data: screenWidthRef.current.getBoundingClientRect().width,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSnackClose = () => {
    dispatch({ type: additionalUtilitiesActionType.SET_SNACKBAR_TO_FALSE });
  };

  return (
    <div ref={screenWidthRef} className="parentFlex">
      <SnackBar
        isOpen={utilities.isSnackBarVisible}
        handleClose={() => handleSnackClose()}
        message={utilities.snackBarMessage}
        isSuccess={utilities.snackBarTypeSuccess}
      />
      <Navbar />
      <RouterComponent />
      <Footer />
    </div>
  );
};
