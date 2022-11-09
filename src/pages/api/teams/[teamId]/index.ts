import { NextApiRequest, NextApiResponse } from "next";
import { authenticateUserWithToken } from "../../../../backend/services/auth";
import { connectDB, AppDataSource } from "../../../../backend/db";
import { Team } from "../../../../backend/db/team";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { teamId } = req.query;
    await authenticateUserWithToken(req.headers.authorization);
    await connectDB();
    const teamsRepository = AppDataSource.getMongoRepository(Team);
    const data = await teamsRepository.findOneBy(teamId);
    res.status(200).json(data);
  } catch (error: any) {
    console.error(error);
    res.status(404).send(error.message);
  }
};

export default handler;
