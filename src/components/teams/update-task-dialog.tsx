import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { Task, TaskStatus } from "../../backend/db/task";
import { sendRequest } from "../../utils/send-request";
import { handleError } from "../../utils/shared";
import { SnackbarAction } from "../../utils/snackbar";
import PrimaryButton from "../shared/buttons/primary-button";

type Props = {
  teamId: string;
  task: Task;
  open: boolean;
  close: React.Dispatch<React.SetStateAction<boolean>>;
  dispatchSnackBar: React.Dispatch<SnackbarAction>;
};

const UpdateTaskDialog = ({
  open,
  close,
  dispatchSnackBar,
  task,
  teamId,
}: Props) => {
  const queryClient = useQueryClient();

  const updateTask = useMutation(
    (taskData: any) =>
      sendRequest({
        endpoint: `/api/teams/${teamId}/update-task`,
        body: {
          taskData,
        },
        method: "POST",
      }),
    {
      onSuccess: (data) => {
        dispatchSnackBar({
          type: "open",
          payload: {
            message: "Updated Task Successfully",
            severity: "success",
          },
        });
        queryClient.setQueryData(`team ${teamId}`, () => data);
      },
      onError: (err: Error) => {
        handleError(err, dispatchSnackBar);
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      name: task.name,
      properties: task.properties,
      status: task.status,
    },
    onSubmit: (values, { resetForm }) => {
      const taskData = Object.assign({}, task, values);
      updateTask.mutate(taskData);
      resetForm();
      close(false);
    },
  });
  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>Update Task</DialogTitle>
      <DialogContent>
        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          <TextField
            className="pointer-events-none"
            disabled
            fullWidth
            id="name"
            label="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            id="properties"
            label="Properties"
            name="properties"
            value={formik.values.properties}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.properties && Boolean(formik.errors.properties)
            }
            helperText={formik.touched.properties && formik.errors.properties}
          />
          <FormControl fullWidth>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              name="status"
              value={formik.values.status}
              label="status"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {Object.values(TaskStatus).map((el) => {
                return (
                  <MenuItem key={el} value={el}>
                    {el}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <div className="flex w-full justify-end gap-8 p-2 ">
            <Button
              type="button"
              onClick={() => {
                close(false);
              }}
            >
              Cancel
            </Button>
            <PrimaryButton
              additionalStyles="w-24"
              name="Update"
              type="submit"
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTaskDialog;
