import { DataTypes } from "sequelize";
import { define } from "../config/sequelize";

const Spaceship = define("spaceships", {
  name: DataTypes.STRING,
  serialNumber: DataTypes.STRING,
});

export default Spaceship;