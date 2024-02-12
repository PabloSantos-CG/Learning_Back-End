import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";

export = {
  private: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let success = false;
      let hash = req.headers.authorization?.substring(6);

      if (hash === undefined) {
        return res.status(404).send();
      }

      let decoded: string = Buffer.from(hash, "base64").toString();
      let data: string[] = decoded.split(":");

      if (data.length === 2) {
        const user = await User.findOne({
          where: {
            email: data[0],
            password: data[1],
          },
        });

        if (user !== null) success = true;
      }

      if (success) {
        next();
      } else {
        return res.status(403).json({ error: "Usuário não autorizado" });
      }
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
};
