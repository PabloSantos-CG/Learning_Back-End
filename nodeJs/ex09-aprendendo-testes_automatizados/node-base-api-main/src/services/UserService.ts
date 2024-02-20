import { User } from "../models/User";
import bcrypt from "bcrypt";

export const createUser = async (email: string, password: string) => {
  let hasUser = await User.findOne({ where: { email } });
  if (!hasUser) {
    const hash = bcrypt.hashSync(password, 10);
    const user = await User.create({ email, password: hash });

    return user;
  } else {
    return new Error("Usuário já existe!");
  }
};

export const access = async (email: string, password: string) => {
  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    return new Error("E-mail não cadastrado");
  }

  return bcrypt.compareSync(password, user.password);
};

export const all = async () => {
  return await User.findAll();
};
