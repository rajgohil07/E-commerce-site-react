import { additionalUtilitiesActionType } from "./AdditionalUtilitiesActionTypes";

const initialState = {
  width: 1300,
  isSnackBarVisible: false,
  snackBarMessage: "",
  snackBarTypeSuccess: true,
};

export const additionalUtilitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    // Set the width of screen size at the project startup.
    case additionalUtilitiesActionType.SET_WIDTH: {
      return { ...state, width: action.data };
    }
    // Set the snackbar value to false when user clicks on the close button.
    case additionalUtilitiesActionType.SET_SNACKBAR_TO_FALSE: {
      return { ...state, isSnackBarVisible: false };
    }
    // Assign the message to snackbar and make its visibility to true along with type.
    case additionalUtilitiesActionType.SET_MESSAGE_TO_SNACKBAR: {
      return {
        ...state,
        isSnackBarVisible: true,
        snackBarMessage: action.snackBarMessage,
        snackBarTypeSuccess: action.snackBarType,
      };
    }
    default: {
      return state;
    }
  }
};
