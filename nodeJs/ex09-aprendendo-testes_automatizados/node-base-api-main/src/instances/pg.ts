import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import db_url from "./database";
dotenv.config();

export const sequelize = new Sequelize(db_url as string, {
  define: {
    timestamps: true,
    underscored: true
  }
});
