import type { NextApiRequest, NextApiResponse } from "next";
import {
  authenticateUserWithToken,
  createToken,
} from "../../backend/services/auth";
import { connectDB, AppDataSource } from "../../backend/db";
import { User } from "../../backend/db/user.";

const signInHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await createToken();

  res.status(200).json({ token });
};

export default signInHandler;
