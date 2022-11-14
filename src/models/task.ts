export enum TaskStatus {
  ASSIGNED = "Assigned",
  IN_PROGRESS = "In Progress",
  REVIEW = "Ready for Review",
  COMPLETED = "Completed",
}

export type Task = {
  name: string;
  description: string;
  dueDate: Date;
  assignee: string;
  status: TaskStatus;
};
