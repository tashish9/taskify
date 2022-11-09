import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { SnackbarData, SnackbarAction } from "../../utils/snackbar";

const AlertSnackbar = ({
  snackbarData,
  dispatchSnackBar,
}: {
  snackbarData: SnackbarData;
  dispatchSnackBar: React.Dispatch<SnackbarAction>;
}) => {
  return (
    <Snackbar
      open={snackbarData.isSnackBarOpen}
      autoHideDuration={4000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      sx={{ width: "20vw" }}
      onClose={() => {
        dispatchSnackBar({
          type: "close",
        });
      }}
    >
      <Alert
        variant="filled"
        severity={snackbarData.severity}
        sx={{ width: "100%", textAlign: "center" }}
      >
        {snackbarData.message}
      </Alert>
    </Snackbar>
  );
};

export default AlertSnackbar;
