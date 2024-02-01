const Planet = require("../models/Planet");
const Satellites = require("../models/Satellites");

Planet.hasMany(Satellites, { onDelete: "CASCADE", onUpdate: "CASCADE" });
Satellites.belongsTo(Planet, { foreignKey: "planetId", as: "planet" });

module.exports = { Planet, Satellites };