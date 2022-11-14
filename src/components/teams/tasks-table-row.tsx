import { formatDate } from "../../utils/shared";
import { BiEditAlt } from "react-icons/bi";
import { useState } from "react";
import UpdateTaskDialog from "./update-task-dialog";
import { SnackbarAction } from "../../utils/snackbar";
import { Task } from "../../models/task";

const TasksTableRow = ({
  task,
  teamId,
  dispatchSnackBar,
}: {
  task: Task;
  teamId: string;
  dispatchSnackBar: React.Dispatch<SnackbarAction>;
}) => {
  const [isUpdateTaskDialogOpen, setIsUpdateTaskDialogOpen] = useState(false);
  return (
    <>
      <tr className="w-full max-w-full overflow-hidden text-sm">
        <td className="border-b border-gray-200 bg-white p-5">
          <div className="">
            <p className="whitespace-no-wrap text-gray-900">{task.name}</p>
          </div>
        </td>
        <td className=" w-[30rem] text-ellipsis border-b border-gray-200 p-5">
          <p className="max-w-sm text-ellipsis break-all text-gray-900">
            {task.description}
          </p>
        </td>
        <td className=" border-b border-gray-200 bg-white p-5">
          <p className="whitespace-no-wrap text-gray-900">
            {formatDate(task.dueDate.toString())}
          </p>
        </td>
        <td className="border-b border-gray-200 bg-white p-5">
          {task.assignee}
        </td>
        <td className="border-b border-gray-200 bg-white p-5">{task.status}</td>
        <td className="border-b border-gray-200 bg-white py-5 pr-5 text-right">
          <button
            type="button"
            className="text-2xl font-semibold capitalize text-teal-700"
          >
            <BiEditAlt
              className="text-2xl"
              onClick={() => {
                setIsUpdateTaskDialogOpen(true);
              }}
            />
          </button>
        </td>
      </tr>

      <UpdateTaskDialog
        teamId={teamId}
        task={task}
        open={isUpdateTaskDialogOpen}
        close={setIsUpdateTaskDialogOpen}
        dispatchSnackBar={dispatchSnackBar}
      />
    </>
  );
};

export default TasksTableRow;
