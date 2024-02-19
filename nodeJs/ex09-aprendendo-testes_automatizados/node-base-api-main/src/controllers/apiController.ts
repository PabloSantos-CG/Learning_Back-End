import { Request, Response } from "express";
import { access, all, createUser } from "../services/UserService";

export const ping = (req: Request, res: Response) => {
  res.json({ pong: true });
};

export const register = async (req: Request, res: Response) => {
  if (req.body.email && req.body.password) {
    let { email, password } = req.body;

    const result = await createUser(email, password);

    if (result) {
      return res.status(201).json({ status: "Success" });
    } else {
      return res.status(400).json({ status: "Usuário já existe!" });
    }
  }
  return res.status(400).send();
};

export const login = async (req: Request, res: Response) => {
  if (req.body.email && req.body.password) {
    let email: string = req.body.email;
    let password: string = req.body.password;

    const authorization = await access(email, password);
    return res.json({ authorization });
  }

  //     let user = await User.findOne({
  //         where: { email, password }
  //     });

  //     if(user) {
  //         res.json({ status: true });
  //         return;
  //     }
  // }

  // res.json({ status: false });
};

export const list = async (req: Request, res: Response) => {
  let users = await all();
  let list: string[] = [];

  for (let i in users) {
    list.push(users[i].email);
  }

  res.json({ list });
};
