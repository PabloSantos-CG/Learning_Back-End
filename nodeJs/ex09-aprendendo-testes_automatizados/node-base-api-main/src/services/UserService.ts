import { User } from "../models/User";
import bcrypt from "bcrypt";

export const createUser = async (email: string, password: string) => {
  let hasUser = await User.findOne({ where: { email } });
  if (!hasUser) {
    const hash = bcrypt.hashSync(password, 10);
    await User.create({ email, hash });

    return true;
  } else {
    
    return false;
  }
};

export const access = async (email: string, password: string) => {
  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    return false;
  }

  const match = bcrypt.compareSync(password, user.password);

  if (match) {
    return true;
  }

  return false;
};

export const all = async () => {
  return await User.findAll();
};
