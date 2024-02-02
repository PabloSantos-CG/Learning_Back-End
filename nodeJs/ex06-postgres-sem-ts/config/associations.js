const Planet = require("../models/Planet");
const Satellites = require("../models/Satellites");
const Captain = require("../models/captain");
const Spaceship = require("../models/spaceship");

Planet.hasMany(Satellites, { onDelete: "CASCADE", onUpdate: "CASCADE" });
Satellites.belongsTo(Planet, { foreignKey: "planetId", as: "planet" });

Captain.belongsToMany(Spaceship, {
  foreignKey: "spaceshipId",
  through: "captains_spaceships",
  as: "spaceships",
});
Spaceship.belongsToMany(Captain, {
  foreignKey: "captainId",
  through: "captains_spaceships",
  as: "captains",
});

module.exports = { Planet, Satellites, Captain, Spaceship };
