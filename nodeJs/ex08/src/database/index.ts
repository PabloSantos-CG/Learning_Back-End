import { Sequelize } from "sequelize";
import "dotenv/config";

export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: "localhost",
    dialect: "postgres",
    port: parseInt(process.env.DB_PORT as string),
    define: { underscored: true, timestamps: true },
  }
);
