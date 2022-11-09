import { date } from "zod";
import { SnackbarAction } from "./snackbar";

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const handleError = (
  error: Error,
  dispatchSnackBar: React.Dispatch<SnackbarAction>
) => {
  console.error(error);
  dispatchSnackBar({
    type: "open",
    payload: {
      severity: "error",
      message: error.message,
    },
  });
};
