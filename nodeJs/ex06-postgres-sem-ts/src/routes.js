const express = require("express");
const planetsController = require("../controllers/planetsController");
const routes = express.Router();

routes.post("/planets", planetsController.create_Planet);

routes.get("/planets", planetsController.read_All_Planet);
routes.get("/planets/:id", planetsController.read_One_Planet);

routes.put("/planets/:id", planetsController.update_Planet);

routes.delete("/planets/:id", planetsController.delete_Planet);

module.exports = routes;