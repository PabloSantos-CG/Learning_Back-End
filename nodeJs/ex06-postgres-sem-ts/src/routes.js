const express = require("express");
const planetsController = require("../controllers/planetsController");
const satellitesController = require("../controllers/satellitesController");
const routes = express.Router();

// planets routes
routes.post("/", planetsController.create_Planet);
routes.get("/satellites", satellitesController.read_All_Satellites);

// satellites get all
routes.get("/", planetsController.read_All_Planet);

// planets routes with params.id
routes.get("/:id", planetsController.read_One_Planet);
routes.put("/:id", planetsController.update_Planet);
routes.delete("/:id", planetsController.delete_Planet);

// satellites routes with params.id
routes.post("/:id/satellites", satellitesController.create_Satellites);
routes.get("/satellites/:id",  satellitesController.read_One_Satellites);
routes.put("/satellites/:id", satellitesController.update_Satellites);
routes.delete("/satellites/:id", satellitesController.delete_Satellites);

module.exports = routes;