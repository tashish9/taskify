import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import { z } from "zod";
import Autocomplete from "@mui/material/Autocomplete";
import { sendRequest } from "../../utils/send-request";
import { useMutation, useQueryClient } from "react-query";
import PrimaryButton from "../shared/buttons/primary-button";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Team } from "../../backend/db/team";
import { SnackbarAction } from "../../utils/snackbar";
import { handleError } from "../../utils/shared";

type Props = {
  open: boolean;
  close: React.Dispatch<React.SetStateAction<boolean>>;
  dispatchSnackBar: React.Dispatch<SnackbarAction>;
};

const CreateTeamDialog = ({ open, close, dispatchSnackBar }: Props) => {
  const queryClient = useQueryClient();
  const addTeamValidationSchema = z.object({
    title: z.string().min(1, "This field is required"),
    description: z.string().min(1, "This field is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      teamMembers: [] as string[],
      description: "",
    },
    validate: (values) => {
      try {
        addTeamValidationSchema.parse(values);
      } catch (error: any) {
        return error.formErrors.fieldErrors;
      }
    },
    onSubmit: async (values) => {
      await addTeam.mutate(values);
    },
  });

  const addTeam = useMutation(
    (newTeam: any) =>
      sendRequest({
        endpoint: "/api/teams/add",
        body: newTeam,
        method: "POST",
      }),
    {
      onSuccess: (data) => {
        dispatchSnackBar({
          type: "open",
          payload: {
            message: "Added Team Successfully",
            severity: "success",
          },
        });

        queryClient.setQueryData(
          `teams`,
          (prevTeamsList: Team[] | undefined) => {
            if (prevTeamsList) {
              return [...prevTeamsList, data];
            }
            return [data];
          }
        );
        formik.resetForm();
      },
      onError: (err: Error) => {
        handleError(err, dispatchSnackBar);
      },
    }
  );

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>Add New Team</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <TextField
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            variant="outlined"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            required
            fullWidth
            id="description"
            label="Description"
            name="description"
            variant="outlined"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
          <Autocomplete
            freeSolo
            multiple
            autoSelect
            id="teamMembers"
            options={[]}
            value={formik.values.teamMembers}
            onChange={(_, v) => {
              formik.setFieldValue("teamMembers", v);
            }}
            onBlur={formik.handleBlur}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Team Members"
                placeholder="Type member name and press enter"
              />
            )}
          />
          <div className="flex w-full justify-end gap-8 p-2 ">
            <Button
              type="button"
              onClick={() => {
                close(false);
              }}
            >
              Cancel
            </Button>
            <PrimaryButton additionalStyles="w-24" name="Add" type="submit" />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTeamDialog;
