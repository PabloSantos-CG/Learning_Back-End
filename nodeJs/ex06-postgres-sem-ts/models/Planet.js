const { DataTypes } = require("sequelize");
const instanceSequelize = require("../config/sequelize");

const Planet = instanceSequelize.define("planets", {
  name: DataTypes.STRING,
  position: DataTypes.INTEGER,
});

module.exports = Planet;
