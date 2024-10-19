const { DataTypes } = require("sequelize");
const instanceSequelize = require("../config/sequelize");

const Teacher = instanceSequelize.define("teachers", {
  name: DataTypes.STRING(100),
  cpf: DataTypes.STRING(18),
  dateOfBirth: DataTypes.DATE,
  street: DataTypes.STRING(100),
  district: DataTypes.STRING(45),
  city: DataTypes.STRING(45),
  state: DataTypes.STRING(45),
  cep: DataTypes.STRING(45),
  email: DataTypes.STRING(250),
});
// "name", "cpf", "dateOfBirth", "street", "district", "city", "state", "cep", "email"
module.exports = Teacher;