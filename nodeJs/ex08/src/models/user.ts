import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

interface UserInstance extends Model {
  id: number;
  email: string;
  password: number;
}

export const User = sequelize.define<UserInstance>("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
