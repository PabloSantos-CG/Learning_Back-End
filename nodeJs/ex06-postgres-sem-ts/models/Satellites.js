const { DataTypes } = require("sequelize");
const instanceSequelize = require("../config/sequelize");

const Satellites = instanceSequelize.define("satellites", {
  name: DataTypes.STRING,
  serialNumber: DataTypes.INTEGER,
  planetId: DataTypes.INTEGER,
});

module.exports = Satellites;