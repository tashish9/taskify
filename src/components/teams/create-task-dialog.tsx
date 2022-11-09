import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { UseMutationResult } from "react-query";
import { TaskStatus } from "../../backend/db/task";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  teamMembers: string[];
  addTask: UseMutationResult<any, unknown, any, unknown>;
};

const CreateTaskDialog = ({
  addTask,
  isOpen,
  setIsOpen,
  teamMembers,
}: Props) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      properties: "",
      description: "",
      dueDate: "",
      assignee: "",
      status: TaskStatus.ASSIGNED,
    },
    onSubmit: async (values, { resetForm }) => {
      await addTask.mutate(values);
      resetForm();
      setIsOpen(false);
    },
  });

  return (
    <Dialog
      fullWidth
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
    >
      <DialogTitle>Add new task</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            variant="standard"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            required
            fullWidth
            margin="dense"
            id="properties"
            label="Properties"
            name="properties"
            variant="standard"
            value={formik.values.properties}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.properties && Boolean(formik.errors.properties)
            }
            helperText={formik.touched.properties && formik.errors.properties}
          />
          <TextField
            required
            fullWidth
            margin="dense"
            id="description"
            label="Description"
            name="description"
            variant="standard"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
          <TextField
            required
            type="date"
            fullWidth
            margin="dense"
            id="dueDate"
            label="Due Date"
            name="dueDate"
            placeholder=""
            variant="standard"
            value={formik.values.dueDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.dueDate && Boolean(formik.errors.dueDate)}
            helperText={formik.touched.dueDate && formik.errors.dueDate}
          />

          <FormControl fullWidth variant="standard" margin="dense">
            <InputLabel id="assignee-select-label">Assignee</InputLabel>
            <Select
              labelId="assignee-select-label"
              id="assignee-select"
              value={formik.values.assignee}
              label="Assignee"
              name="assignee"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {teamMembers.map((el) => {
                return (
                  <MenuItem key={el} value={el}>
                    {el}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl fullWidth variant="standard" margin="dense">
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
        </DialogContent>
        <DialogActions sx={{ gap: "1rem" }}>
          <Button
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateTaskDialog;
