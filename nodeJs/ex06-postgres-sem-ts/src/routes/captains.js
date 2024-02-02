const express = require("express");
const captainController = require("../../controllers/captainController");
const routes = express.Router();

routes.post("/", captainController.create_Captain);
routes.get("/", captainController.read_All_Captains);

routes.get("/:id", captainController.read_One_Captain);
routes.put("/:id", captainController.update_Captain);
routes.delete("/:id", captainController.delete_Captain);

module.exports = routes;