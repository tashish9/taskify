import { Task } from "../backend/db/task";
import { User } from "./user";

export type Team = {
  _id: string;
  title: string;
  description: string;
  tasks: Task[];
  teamMembers: User[];
};
