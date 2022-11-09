import { Task } from "../../backend/db/task";
import { SnackbarAction } from "../../utils/snackbar";
import TasksTableRow from "./tasks-table-row";

const HeadRowData = ({ children }: React.PropsWithChildren) => {
  return (
    <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
      {children}
    </th>
  );
};

type Props = {
  tasks: Task[];
  teamId: string;
  dispatchSnackBar: React.Dispatch<SnackbarAction>;
};

const TasksTable = ({ tasks, teamId, dispatchSnackBar }: Props) => {
  return (
    <div className="mt-4 inline-block min-w-full ">
      <table className="w-full">
        <thead>
          <tr>
            <HeadRowData> Name</HeadRowData>
            <HeadRowData> Properties</HeadRowData>
            <HeadRowData> Due Date</HeadRowData>
            <HeadRowData> Assignee</HeadRowData>
            <HeadRowData> Status</HeadRowData>
            <HeadRowData></HeadRowData>
          </tr>
        </thead>
        <tbody className="w-full">
          {tasks.map((el) => {
            return (
              <TasksTableRow
                teamId={teamId}
                task={el}
                key={el.name}
                dispatchSnackBar={dispatchSnackBar}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TasksTable;
