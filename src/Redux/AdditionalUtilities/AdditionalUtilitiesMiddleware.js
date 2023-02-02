import { additionalUtilitiesActionType } from "./AdditionalUtilitiesActionTypes";

export const handleSnackbar = (snackBarMessage, snackBarTypeSuccess) => {
  return (dispatch) => {
    dispatch({
      type: additionalUtilitiesActionType.SET_MESSAGE_TO_SNACKBAR,
      snackBarTypeSuccess,
      snackBarMessage,
    });
  };
};
