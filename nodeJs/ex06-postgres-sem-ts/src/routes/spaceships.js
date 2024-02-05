const express = require("express");
const spaceshipsController = require("../../controllers/spaceshipsController");
const routes = express.Router();

routes.post("/captains/:id/spaceships", spaceshipsController.create_Spaceship);
routes.get("/", spaceshipsController.read_All_Spaceships);

routes.get("/:id", spaceshipsController.read_One_Spaceship);
routes.put("/:id", spaceshipsController.update_Spaceship);
routes.delete("/:id", spaceshipsController.delete_Spaceship);

module.exports = routes;