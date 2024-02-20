import { Request, Response } from "express";
import { access, all, createUser } from "../services/UserService";

export const ping = (req: Request, res: Response) => {
  return res.json({ pong: true });
};

export const register = async (req: Request, res: Response) => {
  if (req.body.email && req.body.password) {
    let { email, password } = req.body;

    const newUser = await createUser(email, password);

    if (newUser instanceof Error) {
      return res.status(400).json({ error: newUser.message });
    }

    return res.status(201).json({ id: newUser.id });
  }
  return res.status(400).send();
};

export const login = async (req: Request, res: Response) => {
  if (req.body.email && req.body.password) {
    let email: string = req.body.email;
    let password: string = req.body.password;

    const authorization = await access(email, password);

    if (authorization instanceof Error) {
      return res.status(404).json({ error: authorization.message });
    }

    return res.json({ authorization });
  }
};

export const list = async (req: Request, res: Response) => {
  let users = await all();
  let list: string[] = [];

  for (let i in users) {
    list.push(users[i].email);
  }

  return res.json({ list });
};
