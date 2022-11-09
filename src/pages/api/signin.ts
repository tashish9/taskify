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

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const token = localStorage.getItem("token");
//   const isAuthenticated = await authenticateUserWithToken(token);

//   if (!isAuthenticated) {
//     localStorage.removeItem("token");
//   }
//   const isConnected = await connectDB();

//   if (!isConnected) {
//     res.status(500).end("DB error");
//     return;
//   }

//   const userRepository = await AppDataSource.getRepository(User);

//   const user = new User();

//   user.firstName = "shub";
//   user.lastName = "shub";

//   const response = await userRepository.save(user);

//   res.status(200).json(response);
// }
