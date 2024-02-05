const express = require("express");
const captainController = require("../../controllers/captainController");
const routes = express.Router();

routes.post("/", captainController.create_Captain);
routes.get("/", captainController.read_All_Captains);

routes.get("/spaceships/:id", captainController.read_One_Captain);
routes.put("/spaceships/:id", captainController.update_Captain);
routes.delete("/spaceships/:id", captainController.delete_Captain);

module.exports = routes;