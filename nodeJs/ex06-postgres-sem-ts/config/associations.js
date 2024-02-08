const Planet = require("../models/Planet");
const Satellites = require("../models/Satellites");
const Captain = require("../models/captain");
const Spaceship = require("../models/spaceship");

Planet.hasMany(Satellites);
Satellites.belongsTo(Planet);

Captain.belongsToMany(Spaceship, { through: "captains_spaceships" });
Spaceship.belongsToMany(Captain, { through: "captains_spaceships" });

module.exports = { Planet, Satellites, Captain, Spaceship };
