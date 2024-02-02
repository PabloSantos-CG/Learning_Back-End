const { DataTypes } = require("sequelize");
const instanceSequelize = require("../config/sequelize");

const Spaceship = instanceSequelize.define("spaceships", {
  name: DataTypes.STRING,
  serialNumber: DataTypes.STRING,
});

module.exports = Spaceship;