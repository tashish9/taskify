import type { NextApiRequest, NextApiResponse } from "next";
import { authenticateUserWithToken } from "../../../backend/services/auth";
import { connectDB, AppDataSource } from "../../../backend/db";
import { Team } from "../../../backend/db/team";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await authenticateUserWithToken(req.headers.authorization);
    await connectDB();

    const teamsRepository = AppDataSource.getRepository(Team);

    const data = await teamsRepository.find();

    res.status(200).json({ teams: data });
  } catch (error: any) {
    console.error(error);
    res.status(400).send(error.message);
  }
};

export default handler;
