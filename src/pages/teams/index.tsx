import Head from "next/head";
import { useRouter } from "next/router";
import { useReducer, useState } from "react";
import { useQuery } from "react-query";
import FAB from "../../components/shared/buttons/fab";
import TeamCard from "../../components/teams/team-card";
import { Team } from "../../backend/db/team";
import { sendRequest } from "../../utils/send-request";
import { useAuthStore } from "../../utils/store";
import AlertSnackbar from "../../components/shared/alert-snackbar";
import { snackbarDataReducer, initialSnackBarData } from "../../utils/snackbar";
import { handleError } from "../../utils/shared";
import CreateTeamDialog from "../../components/teams/create-team-dialog";

const TeamsPage = () => {
  const [isCreateTeamDialogOpen, setIsCreateTeamDialogOpen] = useState(false);
  const isUserLoggedIn = useAuthStore((state) => state.isUserLoggedIn);
  const [snackbarData, dispatchSnackBar] = useReducer(
    snackbarDataReducer,
    initialSnackBarData
  );
  const [teamsList, setTeamsList] = useState<Team[] | null>(null);

  const { isLoading } = useQuery(
    "teams",
    async () => {
      return sendRequest({
        endpoint: "/api/teams",
      });
    },
    {
      refetchInterval: 10000,
      onSuccess: (data) => {
        setTeamsList(data);
      },
      onError: (err: Error) => {
        handleError(err, dispatchSnackBar);
      },
    }
  );

  if (isLoading) {
    return "Loading...";
  }

  return (
    <div>
      <Head>
        <title>Teams</title>
        <meta name="description" content="List of teams on taskify.com" />
      </Head>

      {isUserLoggedIn && (
        <>
          <FAB
            onClick={() => {
              setIsCreateTeamDialogOpen(true);
            }}
          />

          <div className="">
            <h1>List of all the teams</h1>
            <div className="flex flex-wrap justify-center gap-12 p-4">
              {teamsList &&
                teamsList.length > 0 &&
                teamsList.map((el) => {
                  return <TeamCard team={el} key={el._id.toString()} />;
                })}
              {(!teamsList || teamsList.length === 0) && (
                <div> No Teams yet!</div>
              )}
            </div>
          </div>
        </>
      )}
      {!isUserLoggedIn && (
        <div className="my-40 h-full w-full text-center text-xl font-semibold text-red-600">
          Please SignIn first to start managing your teams!
        </div>
      )}

      <CreateTeamDialog
        open={isCreateTeamDialogOpen}
        close={setIsCreateTeamDialogOpen}
        dispatchSnackBar={dispatchSnackBar}
      />

      <AlertSnackbar
        snackbarData={snackbarData}
        dispatchSnackBar={dispatchSnackBar}
      />
    </div>
  );
};

export default TeamsPage;
