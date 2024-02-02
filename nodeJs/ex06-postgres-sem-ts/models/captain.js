const { DataTypes } = require("sequelize");
const instanceSequelize = require("../config/sequelize");

const Captain = instanceSequelize.define("captains", {
  name: DataTypes.STRING,
  fromPlanet: DataTypes.STRING,
});

module.exports = Captain;