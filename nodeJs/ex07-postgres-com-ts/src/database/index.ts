import { Sequelize } from "sequelize";

const database_url = process.env.DATABASE_URL || "";

export const sequelize = new Sequelize(database_url, {
  define: {
    underscored: true
  }
});
