import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";

export = {
  private: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let success = false;

      if (req.headers.authorization === undefined) {
        return res.status(400).json({ message: "Authorization não pode ser undefined"});
      }

      const [authType, token] = req.headers.authorization.split(" ");

      if(authType === 'Bearer') {
        JWT.verify(
          token,
          process.env.JWT_SECRET_KEY as string
        );

        success = true;
      }

      if (success) next();

    } catch (error) {
      return res.status(403).json({ error: "Usuário não autorizado" });
    }
  },
};
