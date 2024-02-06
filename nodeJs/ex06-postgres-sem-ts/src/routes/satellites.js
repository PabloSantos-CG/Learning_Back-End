const express = require("express");
const satellitesController = require("../../controllers/satellitesController");

const routes = express.Router();

routes.post("/", satellitesController.create_Satellite);
routes.get("/", satellitesController.read_All_Satellites);

routes.get("/:id", satellitesController.read_One_Satellite);
routes.put("/:id", satellitesController.update_Satellite);
routes.delete("/:id", satellitesController.delete_Satellite);

module.exports = routes;