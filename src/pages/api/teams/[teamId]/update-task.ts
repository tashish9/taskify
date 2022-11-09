import type { NextApiRequest, NextApiResponse } from "next";
import { authenticateUserWithToken } from "../../../../backend/services/auth";
const { ObjectID } = require("mongodb");
import { connectDB, AppDataSource } from "../../../../backend/db";
import { Team } from "../../../../backend/db/team";
import { Task } from "../../../../backend/db/task";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { taskData } = req.body;
  const { teamId } = req.query;
  try {
    await authenticateUserWithToken(req.headers.authorization);
    await connectDB();

    const teamsRepository = AppDataSource.getMongoRepository(Team);

    const team = await teamsRepository.findOneBy(teamId);

    if (!team) {
      throw new Error("Team Not found");
    }

    team.tasks = team.tasks.map((el) => {
      if (el.name === taskData.name) return taskData as Task;
      return el;
    });

    const data = await teamsRepository.findOneAndUpdate(
      { _id: new ObjectID(teamId) },
      {
        $set: team,
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
