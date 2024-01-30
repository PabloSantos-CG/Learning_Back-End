const database = require("./config");
const Sequelize = require("sequelize");

const instanceSequelize = new Sequelize(database);
module.exports = instanceSequelize;