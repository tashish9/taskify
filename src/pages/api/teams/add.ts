import type { NextApiRequest, NextApiResponse } from "next";
import { authenticateUserWithToken } from "../../../backend/services/auth";
import { connectDB, AppDataSource } from "../../../backend/db";
import { Team } from "../../../backend/db/team";
import { z } from "zod";

const AddTeamSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  teamMembers: z.string().array(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await authenticateUserWithToken(req.headers.authorization);
    await connectDB();
    AddTeamSchema.parse(req.body);

    const teamsRepository = AppDataSource.getMongoRepository(Team);
    const team = new Team();

    team.title = req.body.title;
    team.description = req.body.description;
    team.teamMembers = req.body.teamMembers;

    const data = await teamsRepository.save(team);
    res.status(200).json(data);
  } catch (error: any) {
    console.error(error);
    res.status(404).send(error.message);
  }
};

export default handler;
