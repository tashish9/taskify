import { Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useReducer, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import PrimaryButton from "../../components/shared/buttons/primary-button";
import CreateTaskDialog from "../../components/teams/create-task-dialog";
import TasksTable from "../../components/teams/tasks-table";
import { Team } from "../../backend/db/team";
import { sendRequest } from "../../utils/send-request";
import AlertSnackbar from "../../components/shared/alert-snackbar";
import { snackbarDataReducer, initialSnackBarData } from "../../utils/snackbar";

const TeamPage = () => {
  const queryClient = useQueryClient();
  const [snackbarData, dispatchSnackBar] = useReducer(
    snackbarDataReducer,
    initialSnackBarData
  );
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);
  const [team, setTeam] = useState<Team>({} as Team);
  const router = useRouter();
  const { teamId } = router.query;

  const { isLoading } = useQuery(
    `team ${teamId}`,
    () => {
      return sendRequest({
        endpoint: "/api/teams/" + teamId,
      });
    },
    {
      onSuccess: (data) => {
        setTeam(data);
      },
      enabled: !!teamId,
    }
  );

  const addTask = useMutation(
    (newTeam: any) =>
      sendRequest({
        endpoint: `/api/teams/${teamId}/add-task`,
        body: {
          ...newTeam,
          id: teamId,
        },
        method: "POST",
      }),
    {
      onSuccess: (data) => {
        dispatchSnackBar({
          type: "open",
          payload: {
            message: "Added Task Successfully",
            severity: "success",
          },
        });
        queryClient.setQueryData(`team ${teamId}`, () => data);
      },
    }
  );

  if (isLoading) {
    return <p className="flex items-center justify-center">Loading...</p>;
  }

  return (
    <main className="min-h-screen w-full">
      <div className="bg-gray-300 p-4">
        <h1 className="text-4xl">{team.title}</h1>
        <div className=" my-4 text-base line-clamp-3">
          <p>Team description : {team.description} </p>
        </div>
      </div>
      <div className="w-full p-4">
        <div className="flex items-center justify-between px-4">
          <h3 className="text-2xl font-medium capitalize tracking-wide ">
            Tasks
          </h3>
          <PrimaryButton
            name="Add new Task"
            onClick={() => {
              setIsAddTaskDialogOpen(true);
            }}
          />
        </div>
        <TasksTable
          teamId={teamId as string}
          tasks={team.tasks || []}
          dispatchSnackBar={dispatchSnackBar}
        />
      </div>

      <CreateTaskDialog
        addTask={addTask}
        teamMembers={team.teamMembers || []}
        isOpen={isAddTaskDialogOpen}
        setIsOpen={setIsAddTaskDialogOpen}
      />

      <AlertSnackbar
        snackbarData={snackbarData}
        dispatchSnackBar={dispatchSnackBar}
      />
    </main>
  );
};

export default TeamPage;
