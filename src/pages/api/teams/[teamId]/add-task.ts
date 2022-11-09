import type { NextApiRequest, NextApiResponse } from "next";
import { authenticateUserWithToken } from "../../../../backend/services/auth";
const { ObjectID } = require("mongodb");
import { connectDB, AppDataSource } from "../../../../backend/db";
import { Team } from "../../../../backend/db/team";
import { Task } from "../../../../backend/db/task";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { teamId } = req.query;
  try {
    await authenticateUserWithToken(req.headers.authorization);
    await connectDB();

    const task = new Task();

    const teamsRepository = AppDataSource.getMongoRepository(Team);

    task.assignee = req.body.assignee;
    task.description = req.body.description;
    task.dueDate = req.body.dueDate;
    task.name = req.body.name;
    task.properties = req.body.properties;
    task.status = req.body.status;

    const data = await teamsRepository.findOneAndUpdate(
      { _id: new ObjectID(teamId) },
      {
        $push: { tasks: task },
      },
      {
        returnOriginal: false,
      }
    );

    res.status(200).json(data.value);
  } catch (error: any) {
    console.error(error);
    res.status(404).send(error.message);
  }
};

export default handler;
