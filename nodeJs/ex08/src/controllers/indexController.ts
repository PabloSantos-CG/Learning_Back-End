import { Request, Response } from "express";
import { User } from "../models/user";
import JWT from "jsonwebtoken";
import "dotenv/config";

export = {
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: {
          email,
          password,
        },
      });

      if (user === null) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }

      const token = JWT.sign(
        { id: user?.id, email: user?.email },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "2h" }
      );

      return res.status(200).json({ status: true, token });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
    }
  },
};
