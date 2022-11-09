import { AlertColor } from "@mui/material";

export type SnackbarData = {
  message?: string;
  isSnackBarOpen?: boolean;
  severity?: AlertColor;
};

export type SnackbarAction = {
  type: "open" | "close";
  payload?: SnackbarData;
};

export const snackbarDataReducer = (
  prevSnackbarData: SnackbarData,
  action: SnackbarAction
): SnackbarData => {
  if (action.type == "open")
    return {
      ...prevSnackbarData,
      ...action.payload,
      isSnackBarOpen: true,
    };
  return { ...prevSnackbarData, isSnackBarOpen: false };
};

export const initialSnackBarData: SnackbarData = {
  message: "",
  isSnackBarOpen: false,
  severity: "success",
};
