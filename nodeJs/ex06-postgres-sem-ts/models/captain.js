const { DataTypes } = require("sequelize");
const instanceSequelize = require("../config/sequelize");

const Captain = instanceSequelize.define("captain", {
  name: DataTypes.STRING,
  fromPlanet: DataTypes.STRING,
});

module.exports = Captain;